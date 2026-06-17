export type TypographyFontId =
  | "inter"
  | "space-grotesk"
  | "ibm-plex-sans"
  | "outfit"
  | "archivo"
  | "jetbrains-mono"
  | "fraunces"
  | "source-serif"
  | "playfair-display"
  | "cinzel"
  | "unbounded"
  | "rajdhani";

export type TypographyFontDefinition = {
  id: TypographyFontId;
  name: string;
  mood: string;
  description: string;
  stack: string;
};

export const typographyFonts: TypographyFontDefinition[] = [
  {
    id: "inter",
    name: "Inter",
    mood: "Neutral UI",
    description: "Clean, readable, and product-native.",
    stack: "Inter, ui-sans-serif, system-ui, sans-serif"
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    mood: "Soft technical",
    description: "A rounded technical voice with display weight.",
    stack: "'Space Grotesk', Inter, ui-sans-serif, system-ui, sans-serif"
  },
  {
    id: "ibm-plex-sans",
    name: "IBM Plex Sans",
    mood: "Research lab",
    description: "Structured, precise, and documentation-friendly.",
    stack: "'IBM Plex Sans', Inter, ui-sans-serif, system-ui, sans-serif"
  },
  {
    id: "outfit",
    name: "Outfit",
    mood: "Polished app",
    description: "Modern, geometric, and approachable.",
    stack: "Outfit, Inter, ui-sans-serif, system-ui, sans-serif"
  },
  {
    id: "archivo",
    name: "Archivo",
    mood: "Utility console",
    description: "Dense and practical without feeling generic.",
    stack: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    mood: "Terminal specimen",
    description: "Code-forward rhythm for technical interfaces.",
    stack: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
  },
  {
    id: "fraunces",
    name: "Fraunces",
    mood: "Strange editorial",
    description: "Organic display character with arcane warmth.",
    stack: "Fraunces, Georgia, ui-serif, serif"
  },
  {
    id: "source-serif",
    name: "Source Serif 4",
    mood: "Field notes",
    description: "Readable manuscript tone for lab records.",
    stack: "'Source Serif 4', Georgia, ui-serif, serif"
  },
  {
    id: "playfair-display",
    name: "Playfair Display",
    mood: "Ornate archive",
    description: "Elegant high-contrast forms for dramatic specimens.",
    stack: "'Playfair Display', Georgia, ui-serif, serif"
  },
  {
    id: "cinzel",
    name: "Cinzel",
    mood: "Ritual inscription",
    description: "Classical carved-letter presence with ceremonial weight.",
    stack: "Cinzel, Georgia, ui-serif, serif"
  },
  {
    id: "unbounded",
    name: "Unbounded",
    mood: "Anomaly tag",
    description: "Wide, futuristic, and aggressively shaped.",
    stack: "Unbounded, Inter, ui-sans-serif, system-ui, sans-serif"
  },
  {
    id: "rajdhani",
    name: "Rajdhani",
    mood: "Arcane console",
    description: "Condensed, signal-heavy, and already familiar to Mimic.",
    stack: "Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif"
  }
];
