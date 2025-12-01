export type ColorTokens = {
  bg: string;
  bgAlt: string;
  fg: string;
  accent: string;
  border: string;
};

export const defaultPalettes: Record<string, ColorTokens> = {
  "Warm Sand": {
    bg: "#fdf6e3",
    bgAlt: "#eee8d5",
    fg: "#333333",
    accent: "#d97757",
    border: "#c8b28a"
  },
  "Night Drive": {
    bg: "#0f172a",
    bgAlt: "#1e293b",
    fg: "#e5e7eb",
    accent: "#38bdf8",
    border: "#4b5563"
  },
  "Mint Soda": {
    bg: "#ecfeff",
    bgAlt: "#ccfbf1",
    fg: "#064e3b",
    accent: "#22c55e",
    border: "#6ee7b7"
  }
};

export const tokenList: Array<keyof ColorTokens> = [
  "bg",
  "bgAlt",
  "fg",
  "accent",
  "border"
];
