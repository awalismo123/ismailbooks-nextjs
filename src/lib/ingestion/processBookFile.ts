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
 * Clean raw text into clean HTML paragraphs
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
        html += `<p class="mb-4 leading-relaxed text-[#201B16]">${currentParagraph.join(" ")}</p>\n`;
        currentParagraph = [];
      }
      continue;
    }

    if (
      line.length < 60 &&
      (line.toUpperCase() === line || /^(baabka|chapter|qeybta|qaybta)\b/i.test(line))
    ) {
      if (currentParagraph.length > 0) {
        html += `<p class="mb-4 leading-relaxed text-[#201B16]">${currentParagraph.join(" ")}</p>\n`;
        currentParagraph = [];
      }
      html += `<h2 class="font-display text-2xl font-bold mt-8 mb-4 text-[#7A1F2B]">${line}</h2>\n`;
    } else {
      currentParagraph.push(line);
      if (line.endsWith(".") || line.endsWith("!") || line.endsWith("?")) {
        if (currentParagraph.join(" ").length > 300) {
          html += `<p class="mb-4 leading-relaxed text-[#201B16]">${currentParagraph.join(" ")}</p>\n`;
          currentParagraph = [];
        }
      }
    }
  }

  if (currentParagraph.length > 0) {
    html += `<p class="mb-4 leading-relaxed text-[#201B16]">${currentParagraph.join(" ")}</p>\n`;
  }

  return html || `<p class="mb-4 leading-relaxed text-[#201B16]">${rawText}</p>`;
}

/**
 * Parse Microsoft Word DOCX buffer into HTML chapters
 */
async function parseDocx(buffer: Buffer): Promise<IngestionResult> {
  const result = await mammoth.convertToHtml({ buffer });
  const rawHtml = result.value || "";

  if (!rawHtml.trim()) {
    throw new Error("Wax nuxur ah lagama helin faylka Word-ka (DOCX).");
  }

  // Split HTML by <h1> or <h2> headings if present
  const headingRegex = /(?=<h[12][^>]*>)/i;
  const sections = rawHtml.split(headingRegex).filter((s) => s.trim().length > 30);

  const chapters: { fileName: string; content: string }[] = [];
  const toc: { title: string; file: string }[] = [];

  if (sections.length > 1) {
    sections.forEach((sec, idx) => {
      const numStr = String(idx + 1).padStart(3, "0");
      const fileName = `ch_${numStr}.html`;
      const titleMatch = sec.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : `Cutubka ${idx + 1}`;

      const content = `<div class="chapter-content font-reader leading-relaxed">\n${sec}\n</div>`;
      chapters.push({ fileName, content });
      toc.push({ title, file: fileName });
    });
  } else {
    // If no headings, split into chunks of ~10 sections
    const pRegex = /(?=<p[^>]*>)/i;
    const paragraphs = rawHtml.split(pRegex).filter((p) => p.trim().length > 0);
    const chunkSize = Math.max(1, Math.ceil(paragraphs.length / 10));

    for (let i = 0; i < paragraphs.length; i += chunkSize) {
      const chunk = paragraphs.slice(i, i + chunkSize).join("\n");
      const chapNum = Math.floor(i / chunkSize) + 1;
      const numStr = String(chapNum).padStart(3, "0");
      const fileName = `ch_${numStr}.html`;
      const title = `Qeybta ${chapNum}`;

      const content = `<div class="chapter-content font-reader leading-relaxed">\n${chunk}\n</div>`;
      chapters.push({ fileName, content });
      toc.push({ title, file: fileName });
    }
  }

  const wordCount = rawHtml.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const estPages = Math.max(1, Math.ceil(wordCount / 300));

  return {
    toc: toc.length > 0 ? toc : [{ title: "Hordhac / Buugga Oo Dhammaystiran", file: "ch_001.html" }],
    chapters: chapters.length > 0 ? chapters : [{ fileName: "ch_001.html", content: `<div class="chapter-content font-reader leading-relaxed">${rawHtml}</div>` }],
    pages: estPages,
  };
}

/**
 * Parse EPUB file buffer into clean HTML chapters
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

    // Remove script and style tags
    bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");

    // Extract chapter title
    const titleMatch = bodyContent.match(/<h[123][^>]*>(.*?)<\/h[123]>/i) || rawText.match(/<title[^>]*>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : `Cutubka ${idx + 1}`;

    // Clean up title if it contains paths or generic terms
    if (title.includes('/') || title.includes('.pdf') || title.length > 80) {
      title = `Cutubka ${idx + 1}`;
    }

    const numStr = String(chapters.length + 1).padStart(3, "0");
    const fileName = `ch_${numStr}.html`;
    const wrappedContent = `<div class="chapter-content font-reader leading-relaxed">\n${bodyContent}\n</div>`;

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
 * Parse PDF file buffer into clean HTML chapters
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
      const title = lines[0]?.substring(0, 80).trim() || `Chapter ${index + 1}`;

      const htmlContent = `
<div class="chapter-content font-reader leading-relaxed">
  <h1 class="font-display text-3xl font-extrabold text-[#7A1F2B] mb-6">${title}</h1>
  ${textToHtmlParagraphs(chapText)}
</div>`;

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

      const htmlContent = `
<div class="chapter-content font-reader leading-relaxed">
  <h1 class="font-display text-3xl font-extrabold text-[#7A1F2B] mb-6">${title}</h1>
  ${textToHtmlParagraphs(chunk)}
</div>`;

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
    const htmlContent = `<div class="chapter-content font-reader leading-relaxed">${textToHtmlParagraphs(textContent)}</div>`;
    return {
      toc: [{ title: "Hordhac / Buugga Oo Dhammaystiran", file: "ch_001.html" }],
      chapters: [{ fileName: "ch_001.html", content: htmlContent }],
      pages: Math.ceil(textContent.length / 2500) || 1,
    };
  }

  // Binary Guard: Prevent dumping raw binary zip/pdf bytes as utf-8 string!
  throw new Error("Nooca faylka la soo raray maaha mid la ogolyahay (Fadlan soo rar PDF, EPUB, ama DOCX).");
}
