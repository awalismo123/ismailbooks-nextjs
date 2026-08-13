export type CategoryTheme = {
  bg: string;      // Used for hero background, active chip bg
  text: string;    // Used for active chip text (always white if deep)
  tint: string;    // Used for inactive chip hover, card chip tint (e.g. 10% opacity version or just the text color)
  border: string;  // Border color if needed
  hex: string;     // The raw hex code for inline styles if needed (like ghost numbers)
};

const THEMES: Record<string, CategoryTheme> = {
  navy: {
    bg: "bg-[#1F3A54]",
    text: "text-white",
    tint: "text-[#1F3A54] bg-[#1F3A54]/10",
    border: "border-[#1F3A54]",
    hex: "#1F3A54",
  },
  oxblood: {
    bg: "bg-[#7A1F2B]",
    text: "text-white",
    tint: "text-[#7A1F2B] bg-[#7A1F2B]/10",
    border: "border-[#7A1F2B]",
    hex: "#7A1F2B",
  },
  green: {
    bg: "bg-[#2E7D5B]",
    text: "text-white",
    tint: "text-[#2E7D5B] bg-[#2E7D5B]/10",
    border: "border-[#2E7D5B]",
    hex: "#2E7D5B",
  },
  amberBrown: {
    bg: "bg-[#8A5A00]",
    text: "text-white",
    tint: "text-[#8A5A00] bg-[#8A5A00]/10",
    border: "border-[#8A5A00]",
    hex: "#8A5A00",
  },
  earthBrown: {
    bg: "bg-[#6B4423]",
    text: "text-white",
    tint: "text-[#6B4423] bg-[#6B4423]/10",
    border: "border-[#6B4423]",
    hex: "#6B4423",
  },
  oliveBrown: {
    bg: "bg-[#5D4A2A]",
    text: "text-white",
    tint: "text-[#5D4A2A] bg-[#5D4A2A]/10",
    border: "border-[#5D4A2A]",
    hex: "#5D4A2A",
  },
  deepTeal: {
    bg: "bg-[#3E5C50]",
    text: "text-white",
    tint: "text-[#3E5C50] bg-[#3E5C50]/10",
    border: "border-[#3E5C50]",
    hex: "#3E5C50",
  },
};

const ALL_PALETTES = Object.values(THEMES);

export function getCategoryTheme(categoryName: string | null | undefined): CategoryTheme {
  if (!categoryName) return THEMES.navy;

  const str = categoryName.toLowerCase().trim();

  // 1. Psychology / Cilmi-Nafsiga -> Navy
  if (str.includes("psychology") || str.includes("cilmi-nafsi") || str.includes("maskax")) {
    return THEMES.navy;
  }

  // 2. Philosophy / Falsafadda -> Oxblood
  if (str.includes("philosophy") || str.includes("falsafad")) {
    return THEMES.oxblood;
  }

  // 3. Self-Improvement / Horumar -> Green
  if (str.includes("self-improvement") || str.includes("horumar") || str.includes("guul")) {
    return THEMES.green;
  }

  // 4. Diinta -> Amber-Brown
  if (str.includes("diin") || str.includes("islam") || str.includes("religion")) {
    return THEMES.amberBrown;
  }

  // 5. Taariikhda -> Earth Brown
  if (str.includes("taariikh") || str.includes("history")) {
    return THEMES.earthBrown;
  }

  // 6. Dhaqanka -> Olive Brown
  if (str.includes("dhaqan") || str.includes("culture")) {
    return THEMES.oliveBrown;
  }

  // Deterministic hash for any other category
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return ALL_PALETTES[Math.abs(hash) % ALL_PALETTES.length];
}
