import mammoth from "mammoth";
import AdmZip from "adm-zip";

// Polyfill DOMMatrix for Node.js / Next.js Server Actions environment
if (typeof globalThis.DOMMatrix === "undefined") {
  // @ts-ignore
  globalThis.DOMMatrix = class DOMMatrix {
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
    m11 = 1; m12 = 0; m21 = 0; m22 = 1; m41 = 0; m42 = 0;
    constructor(init?: any) {}
  };
}

export type IngestionResult = {
  toc: { title: string; file: string }[];
  chapters: { fileName: string; content: string }[];
  pages: number;
};

/**
 * Convert raw text into semantic HTML paragraphs.
 * Outputs bare <p> and <h2> tags — no Tailwind classes, no inline styles.
 * All visual styling is applied by the .reader-prose CSS class in the reader.
 */
function textToHtmlParagraphs(rawText: string): string {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let html = "";
  let currentParagraph: string[] = [];

  for (const line of lines) {
    // Skip page counter markers (e.g. "-- 1 of 41 --")
    if (/^--\s*\d+\s*of\s*\d+\s*--$/i.test(line) || /^page\s*\d+/i.test(line)) {
      if (currentParagraph.length > 0) {
        html += `<p>${currentParagraph.join(" ")}</p>\n`;
        currentParagraph = [];
      }
      continue;
    }

    if (
      line.length < 60 &&
      (line.toUpperCase() === line || /^(baabka|chapter|qeybta|qaybta)\b/i.test(line))
    ) {
      if (currentParagraph.length > 0) {
        html += `<p>${currentParagraph.join(" ")}</p>\n`;
        currentParagraph = [];
      }
      html += `<h2>${line}</h2>\n`;
    } else {
      currentParagraph.push(line);
      if (line.endsWith(".") || line.endsWith("!") || line.endsWith("?")) {
        if (currentParagraph.join(" ").length > 300) {
          html += `<p>${currentParagraph.join(" ")}</p>\n`;
          currentParagraph = [];
        }
      }
    }
  }

  if (currentParagraph.length > 0) {
    html += `<p>${currentParagraph.join(" ")}</p>\n`;
  }

  return html || `<p>${rawText}</p>`;
}

/**
 * Strip all presentation attributes (style, class, align, valign, bgcolor, color, face, border, etc.)
 * and deprecated presentational elements (<font>, <center>, <marquee>, <blink>) from an HTML string.
 * Mammoth may emit Word-theme classes/alignments; EPUBs ship their own styles/fonts.
 * Keeping only semantic structure so .reader-prose CSS controls all visuals.
 */
export function stripPresentationAttrs(html: string): string {
  if (!html) return "";

  return (
    html
      // Remove deprecated presentational wrapper tags (<font>, </font>, <center>, </center>, etc.)
      .replace(/<\/?font(?:\s+[^>]*)?>/gi, "")
      .replace(/<\/?center(?:\s+[^>]*)?>/gi, "")
      .replace(/<\/?marquee(?:\s+[^>]*)?>/gi, "")
      .replace(/<\/?blink(?:\s+[^>]*)?>/gi, "")
      // Remove presentational attributes (with double quotes, single quotes, or unquoted values)
      .replace(
        /\s+(?:class|style|align|valign|bgcolor|color|face|border|clear|cellpadding|cellspacing|hspace|vspace)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
        ""
      )
  );
}

/**
 * Parse Microsoft Word DOCX buffer into semantic HTML chapters.
 * Uses comprehensive style mapping and chapter keyword detection so that
 * Word Headings (Heading 1..6, Title, Subtitle) and Somali chapter titles
 * (Cutubka, Baabka, Chapter, Qeybta, Hordhac) are reliably segmented into chapters.
 */
async function parseDocx(buffer: Buffer): Promise<IngestionResult> {
  const mammothOptions = {
    styleMap: [
      "p[style-name^='Heading'] => h1:fresh",
      "p[style-name^='heading'] => h1:fresh",
      "p[style-name^='Title'] => h1:fresh",
      "p[style-name^='title'] => h1:fresh",
      "p[style-name^='Subtitle'] => h2:fresh",
      "p[style-name^='subtitle'] => h2:fresh",
      "p[style-name^='Header'] => h1:fresh",
      "p[style-name^='header'] => h1:fresh",
      "p[style-name^='Titre'] => h1:fresh",
      "p[style-name^='Encabezado'] => h1:fresh",
      "p[style-name^='Überschrift'] => h1:fresh",
    ],
  };

  const result = await mammoth.convertToHtml({ buffer }, mammothOptions);
  // Strip any class=/style=/align= attrs mammoth may have carried over from Word
  let rawHtml = stripPresentationAttrs(result.value || "");

  if (!rawHtml.trim()) {
    throw new Error("Wax nuxur ah lagama helin faylka Word-ka (DOCX).");
  }

  // Somali and English chapter keywords
  const CHAPTER_KEYWORDS = "(?:baabka|cutubka|chapter|qeybta|qaybta|hordhac|horudhac|gunaanad|gebogebo|gaba-gabo|xogta)";

  // Promote <p> tags with <strong>/<b> chapter keywords to <h2>
  // e.g. <p><strong>Cutubka 1: Bilowga</strong></p> -> <h2>Cutubka 1: Bilowga</h2>
  const boldChapterPattern = new RegExp(
    `<p>(?:<strong>|<b>)\\s*(${CHAPTER_KEYWORDS}\\b[^<]{1,120})\\s*(?:<\\/strong>|<\\/b>)<\\/p>`,
    "gi"
  );
  rawHtml = rawHtml.replace(boldChapterPattern, "<h2>$1</h2>");

  // Promote standalone <p> tags starting with chapter keyword + number/name
  // e.g. <p>Cutubka 1: Bilowga</p> -> <h2>Cutubka 1: Bilowga</h2>
  const pChapterPattern = new RegExp(
    `<p>\\s*(${CHAPTER_KEYWORDS}\\s+(?:\\d+|[a-zà-öø-ÿ]+)[^<]{0,100})\\s*<\\/p>`,
    "gi"
  );
  rawHtml = rawHtml.replace(pChapterPattern, "<h2>$1</h2>");

  // Promote standalone <p> tags with single keyword (e.g. <p>Hordhac</p>, <p>HORUDHAC</p>)
  const pSingleKeywordPattern = new RegExp(
    `<p>\\s*(${CHAPTER_KEYWORDS})\\s*<\\/p>`,
    "gi"
  );
  rawHtml = rawHtml.replace(pSingleKeywordPattern, "<h2>$1</h2>");

  // Split HTML by any heading tag <h1> through <h6>
  const headingRegex = /(?=<h[1-6][^>]*>)/i;
  const sections = rawHtml.split(headingRegex).filter((s) => s.trim().length > 20);

  const chapters: { fileName: string; content: string }[] = [];
  const toc: { title: string; file: string }[] = [];

  if (sections.length > 1) {
    sections.forEach((sec, idx) => {
      const numStr = String(idx + 1).padStart(3, "0");
      const fileName = `ch_${numStr}.html`;
      const titleMatch = sec.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
      let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

      if (!title) {
        title = idx === 0 ? "Hordhac" : `Cutubka ${idx + 1}`;
      }

      // Bare semantic wrapper — no Tailwind classes; .reader-prose handles spacing/color
      const content = `<div class="chapter">\n${sec}\n</div>`;
      chapters.push({ fileName, content });
      toc.push({ title, file: fileName });
    });
  } else {
    // No headings detected — split into ~10 equal chunks
    const pRegex = /(?=<p[^>]*>)/i;
    const paragraphs = rawHtml.split(pRegex).filter((p) => p.trim().length > 0);
    const chunkSize = Math.max(1, Math.ceil(paragraphs.length / 10));

    for (let i = 0; i < paragraphs.length; i += chunkSize) {
      const chunk = paragraphs.slice(i, i + chunkSize).join("\n");
      const chapNum = Math.floor(i / chunkSize) + 1;
      const numStr = String(chapNum).padStart(3, "0");
      const fileName = `ch_${numStr}.html`;
      const title = `Qeybta ${chapNum}`;

      const content = `<div class="chapter">\n${chunk}\n</div>`;
      chapters.push({ fileName, content });
      toc.push({ title, file: fileName });
    }
  }

  const wordCount = rawHtml.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const estPages = Math.max(1, Math.ceil(wordCount / 300));

  return {
    toc: toc.length > 0 ? toc : [{ title: "Hordhac / Buugga Oo Dhammaystiran", file: "ch_001.html" }],
    chapters: chapters.length > 0 ? chapters : [{ fileName: "ch_001.html", content: `<div class="chapter">${rawHtml}</div>` }],
    pages: estPages,
  };
}

/**
 * Parse EPUB file buffer into semantic HTML chapters.
 * Each XHTML/HTML file in the EPUB zip becomes one chapter.
 * We strip <style> blocks, <script> blocks, and all inline style=/class=
 * attributes from the EPUB's own HTML so its colors/fonts don't fight the
 * .reader-prose theme variables.
 */
async function parseEpub(buffer: Buffer): Promise<IngestionResult> {
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();

  // Find all XHTML/HTML files in zip
  const htmlEntries = entries.filter((e) => {
    const name = e.entryName.toLowerCase();
    return (
      (name.endsWith(".html") || name.endsWith(".xhtml") || name.endsWith(".htm")) &&
      !name.includes("toc.") &&
      !name.includes("nav.") &&
      !name.includes("cover.") &&
      !name.includes("title_page")
    );
  });

  if (htmlEntries.length === 0) {
    throw new Error("Wax cutubyo HTML ah lagama helin faylka EPUB.");
  }

  // Sort files logically
  htmlEntries.sort((a, b) => a.entryName.localeCompare(b.entryName, undefined, { numeric: true, sensitivity: "base" }));

  const chapters: { fileName: string; content: string }[] = [];
  const toc: { title: string; file: string }[] = [];
  let totalWords = 0;

  htmlEntries.forEach((entry, idx) => {
    const rawText = zip.readAsText(entry);
    if (!rawText || rawText.trim().length < 50) return;

    // Extract body content only
    const bodyMatch = rawText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : rawText;

    // Remove <script> and <style> blocks (EPUB may ship its own colors/fonts)
    bodyContent = bodyContent
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "");

    // Strip all inline style= and class= attributes so EPUB presentation
    // cannot override the reader's .reader-prose theme variables
    bodyContent = stripPresentationAttrs(bodyContent);

    // Extract chapter title (look in cleaned body first, then raw <title>)
    const titleMatch =
      bodyContent.match(/<h[123][^>]*>(.*?)<\/h[123]>/i) ||
      rawText.match(/<title[^>]*>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : `Cutubka ${idx + 1}`;

    // Discard titles that look like file paths or are unreasonably long
    if (title.includes("/") || title.includes(".pdf") || title.length > 80) {
      title = `Cutubka ${idx + 1}`;
    }

    const numStr = String(chapters.length + 1).padStart(3, "0");
    const fileName = `ch_${numStr}.html`;
    // Bare semantic wrapper — .reader-prose provides all visual styling
    const wrappedContent = `<div class="chapter">\n${bodyContent}\n</div>`;

    chapters.push({ fileName, content: wrappedContent });
    toc.push({ title: title || `Cutubka ${idx + 1}`, file: fileName });

    totalWords += bodyContent.replace(/<[^>]+>/g, "").split(/\s+/).length;
  });

  const estPages = Math.max(1, Math.ceil(totalWords / 300));

  return {
    toc: toc.length > 0 ? toc : [{ title: "Hordhac / Buugga Oo Dhammaystiran", file: "ch_001.html" }],
    chapters: chapters.length > 0 ? chapters : [{ fileName: "ch_001.html", content: "<p>Nuxurka buugga</p>" }],
    pages: estPages,
  };
}

/**
 * Parse PDF file buffer into semantic HTML chapters.
 * Uses pdf-parse for text extraction. Chapter boundaries are detected by
 * matching Somali/English chapter keywords ("Baabka", "Qeybta", etc.).
 * Falls back to equal-size chunks when no keywords are found.
 * NOTE: Phase 3b will add font-size-based heading detection (sign-off needed).
 */
async function parsePdf(buffer: Buffer): Promise<IngestionResult> {
  const pdfParseMod = require("pdf-parse");
  const uint8 = new Uint8Array(buffer);

  let totalPages = 1;
  let rawText = "";

  if (typeof pdfParseMod === "function") {
    const parsed = await pdfParseMod(buffer);
    totalPages = parsed.numpages || 1;
    rawText = parsed.text || "";
  } else if (pdfParseMod.PDFParse) {
    const parser = new pdfParseMod.PDFParse(uint8);
    const textData = await parser.getText();
    const info = await parser.getInfo().catch(() => ({}));
    totalPages = textData.total || textData.pages || info.pages || 1;
    rawText = typeof textData === "string" ? textData : (textData.text || String(textData));
  } else if (typeof pdfParseMod.default === "function") {
    const parsed = await pdfParseMod.default(buffer);
    totalPages = parsed.numpages || 1;
    rawText = parsed.text || "";
  } else {
    throw new Error("Formaalka pdf-parse lagama helin nidaamka");
  }

  // Rejoin soft-hyphenated line breaks from PDF extraction (e.g. "aqoon-\nyahan" -> "aqoonyahan")
  rawText = rawText.replace(/-\r?\n([a-zà-öø-ÿ])/gi, "$1");

  // Look for chapter splits (e.g. "Baabka 1", "Chapter 1", "Qeybta 1")
  const chapterRegex = /(?=(?:baabka|chapter|qeybta|qaybta)\s+\d+)/i;
  const rawChapters = rawText.split(chapterRegex).filter((c: string) => c.trim().length > 50);

  const chapters: { fileName: string; content: string }[] = [];
  const toc: { title: string; file: string }[] = [];

  if (rawChapters.length > 1) {
    rawChapters.forEach((chapText: string, index: number) => {
      const numStr = String(index + 1).padStart(3, "0");
      const fileName = `ch_${numStr}.html`;
      const lines = chapText.trim().split(/\r?\n/);
      const title = lines[0]?.substring(0, 80).trim() || `Cutubka ${index + 1}`;

      // Bare semantic HTML — no Tailwind classes; .reader-prose handles all styling
      const htmlContent = `<div class="chapter">\n<h1>${title}</h1>\n${textToHtmlParagraphs(chapText)}\n</div>`;

      chapters.push({ fileName, content: htmlContent });
      toc.push({ title, file: fileName });
    });
  } else {
    const pageSplitRegex = /--\s*\d+\s*of\s*\d+\s*--|\f|\n\s*\n\s*\n/;
    const textPages = rawText.split(pageSplitRegex).filter((p: string) => p.trim().length > 30);
    const chunkSize = Math.max(1, Math.ceil(textPages.length / 10));

    for (let i = 0; i < textPages.length; i += chunkSize) {
      const chunk = textPages.slice(i, i + chunkSize).join("\n\n");
      const chapNum = Math.floor(i / chunkSize) + 1;
      const numStr = String(chapNum).padStart(3, "0");
      const fileName = `ch_${numStr}.html`;
      const title = `Qeybta ${chapNum}`;

      // Bare semantic HTML — no Tailwind classes
      const htmlContent = `<div class="chapter">\n<h1>${title}</h1>\n${textToHtmlParagraphs(chunk)}\n</div>`;

      chapters.push({ fileName, content: htmlContent });
      toc.push({ title, file: fileName });
    }
  }

  return {
    toc: toc.length > 0 ? toc : [{ title: "Hordhac / Buugga Oo Dhammaystiran", file: "ch_001.html" }],
    chapters: chapters.length > 0 ? chapters : [{ fileName: "ch_001.html", content: textToHtmlParagraphs(rawText) }],
    pages: totalPages,
  };
}

/**
 * Main ingestion entry point for DOCX, EPUB, PDF, TXT, HTML
 */
export async function processBookFileBuffer(
  buffer: Buffer,
  fileName: string
): Promise<IngestionResult> {
  const ext = fileName.toLowerCase().split(".").pop() || "";
  const isZip = buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
  const isPdfHeader = buffer.length >= 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;

  // 1. DOCX (Word Document)
  if (ext === "docx" || (isZip && ext !== "epub")) {
    try {
      return await parseDocx(buffer);
    } catch (err: any) {
      if (ext === "epub" || isZip) {
        return await parseEpub(buffer);
      }
      throw err;
    }
  }

  // 2. EPUB (E-Book format)
  if (ext === "epub" || isZip) {
    return await parseEpub(buffer);
  }

  // 3. PDF Document
  if (ext === "pdf" || isPdfHeader) {
    return await parsePdf(buffer);
  }

  // 4. Plain Text or HTML
  if (ext === "txt" || ext === "html" || ext === "htm") {
    const textContent = buffer.toString("utf-8");
    let cleanHtml: string;
    if (ext === "txt") {
      cleanHtml = textToHtmlParagraphs(textContent);
    } else {
      let body = textContent;
      const bodyMatch = textContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) body = bodyMatch[1];
      body = body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
      cleanHtml = stripPresentationAttrs(body);
    }
    // Bare semantic wrapper — .reader-prose provides all visual styling
    const htmlContent = `<div class="chapter">${cleanHtml}</div>`;
    return {
      toc: [{ title: "Hordhac / Buugga Oo Dhammaystiran", file: "ch_001.html" }],
      chapters: [{ fileName: "ch_001.html", content: htmlContent }],
      pages: Math.ceil(textContent.length / 2500) || 1,
    };
  }

  // Binary Guard: Prevent dumping raw binary zip/pdf bytes as utf-8 string!
  throw new Error("Nooca faylka la soo raray maaha mid la ogolyahay (Fadlan soo rar PDF, EPUB, ama DOCX).");
}
