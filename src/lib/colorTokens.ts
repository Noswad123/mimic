export type ColorTokens = {
  bg: string;
  bgAlt: string;
  fg: string;
  accent: string;
  border: string;
};

export type ThemeDefinition = {
  id: string;
  name: string;
  description: string;
  tokens: ColorTokens;
  builtIn?: boolean;
  updatedAt?: string;
};

export const tokenList: Array<keyof ColorTokens> = [
  "bg",
  "bgAlt",
  "fg",
  "accent",
  "border"
];

export const tokenLabels: Record<keyof ColorTokens, string> = {
  bg: "Background",
  bgAlt: "Surface",
  fg: "Text",
  accent: "Accent",
  border: "Border"
};

export const builtInThemes: ThemeDefinition[] = [
  {
    id: "astral-hexware",
    name: "Astral Hexware",
    description: "The current Jamal Arcana baseline: cosmic darks, soft text, pink-orange signal, and teal wardlines.",
    builtIn: true,
    tokens: {
      bg: "#050b1f",
      bgAlt: "#111827",
      fg: "#e6edf7",
      accent: "#ff8a5c",
      border: "#5eead4"
    }
  },
  {
    id: "ember-hexware",
    name: "Ember Hexware",
    description: "Fire-lit workspaces for decisive actions, alerts, crafting, and forge-like tooling.",
    builtIn: true,
    tokens: {
      bg: "#140908",
      bgAlt: "#26110d",
      fg: "#feece2",
      accent: "#fb923c",
      border: "#f97316"
    }
  },
  {
    id: "frost-hexware",
    name: "Frost Hexware",
    description: "Cool crystalline panels for calm focus, analysis, systems, and navigation.",
    builtIn: true,
    tokens: {
      bg: "#06111f",
      bgAlt: "#0f1d2e",
      fg: "#e0f2fe",
      accent: "#38bdf8",
      border: "#67e8f9"
    }
  },
  {
    id: "verdant-hexware",
    name: "Verdant Hexware",
    description: "Living green surfaces for knowledge growth, gardens, recipes, notes, and renewal.",
    builtIn: true,
    tokens: {
      bg: "#07130d",
      bgAlt: "#102016",
      fg: "#dcfce7",
      accent: "#22c55e",
      border: "#86efac"
    }
  }
];

export const defaultPalettes: Record<string, ColorTokens> = Object.fromEntries(
  builtInThemes.map((theme) => [theme.name, theme.tokens])
);

export function cloneTokens(tokens: ColorTokens): ColorTokens {
  return { ...tokens };
}
