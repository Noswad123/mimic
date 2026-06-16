import {
  builtInThemes,
  cloneTokens,
  tokenList,
  type ColorTokens,
  type ThemeDefinition
} from "./colorTokens";

const STORAGE_KEY = "mimic.themes.v1";

type PersistedTheme = Omit<ThemeDefinition, "builtIn">;

type PersistedThemeState = {
  version: 1;
  themes: PersistedTheme[];
};

const fallbackTokens: ColorTokens = builtInThemes[0].tokens;

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isHexColor(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value.trim());
}

function normalizeTokens(value: unknown): ColorTokens {
  const input = isObject(value) ? value : {};

  return tokenList.reduce((tokens, key) => {
    const candidate = input[key];
    tokens[key] = isHexColor(candidate) ? candidate.trim() : fallbackTokens[key];
    return tokens;
  }, {} as ColorTokens);
}

export function createThemeId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${slug || "theme"}-${Date.now().toString(36)}`;
}

function normalizeTheme(value: unknown): ThemeDefinition | null {
  if (!isObject(value)) return null;

  const name = typeof value.name === "string" && value.name.trim()
    ? value.name.trim()
    : "Untitled Theme";

  const id = typeof value.id === "string" && value.id.trim()
    ? value.id.trim()
    : createThemeId(name);

  return {
    id,
    name,
    description: typeof value.description === "string" ? value.description : "",
    tokens: normalizeTokens(value.tokens),
    builtIn: false,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString()
  };
}

function toPersistedTheme(theme: ThemeDefinition): PersistedTheme {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    tokens: cloneTokens(theme.tokens),
    updatedAt: theme.updatedAt ?? new Date().toISOString()
  };
}

export function loadThemes(): ThemeDefinition[] {
  if (!canUseStorage()) return builtInThemes;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return builtInThemes;

    const parsed = JSON.parse(raw) as unknown;
    const themesValue = isObject(parsed) ? parsed.themes : null;
    const customThemes = Array.isArray(themesValue)
      ? themesValue.map(normalizeTheme).filter((theme): theme is ThemeDefinition => Boolean(theme))
      : [];

    return [...builtInThemes, ...customThemes];
  } catch {
    return builtInThemes;
  }
}

export function saveCustomThemes(themes: ThemeDefinition[]) {
  if (!canUseStorage()) return;

  const customThemes = themes
    .filter((theme) => !theme.builtIn)
    .map(toPersistedTheme);

  const state: PersistedThemeState = {
    version: 1,
    themes: customThemes
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function serializeThemes(themes: ThemeDefinition[]) {
  const customThemes = themes
    .filter((theme) => !theme.builtIn)
    .map(toPersistedTheme);

  return JSON.stringify({ version: 1, themes: customThemes }, null, 2);
}

export function parseImportedThemes(raw: string): ThemeDefinition[] {
  const parsed = JSON.parse(raw) as unknown;
  const candidates = Array.isArray(parsed)
    ? parsed
    : isObject(parsed) && Array.isArray(parsed.themes)
      ? parsed.themes
      : [];

  return candidates
    .map(normalizeTheme)
    .filter((theme): theme is ThemeDefinition => Boolean(theme));
}

export function uniqueCustomTheme(theme: ThemeDefinition, existingThemes: ThemeDefinition[]) {
  const builtInIds = new Set(builtInThemes.map((item) => item.id));
  const existingIds = new Set(existingThemes.map((item) => item.id));
  const conflictsWithBuiltIn = builtInIds.has(theme.id);

  if (!existingIds.has(theme.id) && !conflictsWithBuiltIn) return theme;

  return {
    ...theme,
    id: createThemeId(theme.name),
    name: conflictsWithBuiltIn ? `${theme.name} Copy` : theme.name
  };
}
