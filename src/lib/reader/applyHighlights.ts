export type HighlightMarkInput = {
  id: string;
  text: string;
  color: string;
};

const ALLOWED_COLORS = new Set(["gold", "navy", "oxblood", "green"]);

function normalizeColor(color: string): string {
  return ALLOWED_COLORS.has(color) ? color : "gold";
}

/**
 * Wrap the first exact text match in a <mark> for each highlight.
 * Uses the DOM so we never break tags. Skips highlights that span
 * multiple block elements (still saved in the panel).
 */
export function applyHighlightsToHtml(
  html: string,
  highlights: HighlightMarkInput[],
): string {
  if (!html || highlights.length === 0 || typeof window === "undefined") {
    return html;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const ordered = [...highlights]
    .filter((h) => h.text.trim().length >= 2)
    .sort((a, b) => b.text.length - a.text.length);

  for (const highlight of ordered) {
    wrapFirstMatch(wrapper, highlight.id, highlight.text.trim(), normalizeColor(highlight.color));
  }

  return wrapper.innerHTML;
}

function wrapFirstMatch(
  root: HTMLElement,
  id: string,
  needle: string,
  color: string,
): boolean {
  if (root.querySelector(`mark[data-hl-id="${cssEscape(id)}"]`)) {
    return true;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Text | null = walker.nextNode() as Text | null;

  while (node) {
    if (isInsideMark(node)) {
      node = walker.nextNode() as Text | null;
      continue;
    }

    const value = node.nodeValue ?? "";
    const index = value.indexOf(needle);
    if (index === -1) {
      node = walker.nextNode() as Text | null;
      continue;
    }

    const range = document.createRange();
    range.setStart(node, index);
    range.setEnd(node, index + needle.length);

    const mark = document.createElement("mark");
    mark.className = `ib-hl ib-hl--${color}`;
    mark.dataset.hlId = id;
    mark.dataset.hlColor = color;

    try {
      range.surroundContents(mark);
    } catch {
      // Selection spans element boundaries — skip in-text wrap
      return false;
    }

    return true;
  }

  return false;
}

function isInsideMark(node: Node): boolean {
  let current: Node | null = node.parentNode;
  while (current) {
    if (current instanceof HTMLElement && current.tagName === "MARK") {
      return true;
    }
    current = current.parentNode;
  }
  return false;
}

function cssEscape(value: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  return value.replace(/["\\]/g, "\\$&");
}
