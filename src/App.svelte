<script lang="ts">
  import "./lib/styles/appShell.css";

  import { layouts } from "./lib/layouts";
  import { designLanguages, type DesignLanguageId } from "./lib/designLanguages";
  import { siteTreatments, type SiteTreatmentId } from "./lib/siteTreatments";
  import { typographyFonts, type TypographyFontId } from "./lib/typography";
  import AppShowcase from "./lib/components/AppShowcase.svelte";
  import ThemeControls from "./lib/components/ThemeControls.svelte";
  import { cloneTokens, tokenLabels, tokenList, type ColorTokens, type ThemeDefinition } from "./lib/colorTokens";
  import {
    createThemeId,
    loadThemes,
    parseImportedThemes,
    saveCustomThemes,
    serializeThemes,
    uniqueCustomTheme
  } from "./lib/themeManager";

  const layoutOptions = layouts;
  const designLanguageOptions = designLanguages;
  const siteTreatmentOptions = siteTreatments;
  const typographyFontOptions = typographyFonts;
  const importPlaceholder = 'Paste { "version": 1, "themes": [...] }';
  const originalBuiltInThemeIds = new Set([
    "astral",
    "obsidian",
    "ember",
    "tidal",
    "frost",
    "verdant",
    "heavenly"
  ]);

  let selectedLayoutId = layoutOptions[0].id;
  let selectedDesignLanguageId: DesignLanguageId = "hexware";
  let selectedSiteTreatmentId: SiteTreatmentId = "clear";
  let selectedTypographyFontId: TypographyFontId = "inter";
  let fontSearch = "";
  let themes: ThemeDefinition[] = loadThemes();
  let selectedThemeId = themes[0].id;

  let tokens: ColorTokens = cloneTokens(themes[0].tokens);
  let draftName = themes[0].name;
  let draftDescription = themes[0].description;
  let exportPayload = serializeThemes(themes);
  let importPayload = "";
  let statusMessage = "Theme changes are previewed across the whole app shell. Save to keep custom themes.";

  function selectTheme(id: string) {
    const theme = themes.find((item) => item.id === id) ?? themes[0];

    selectedThemeId = theme.id;
    tokens = cloneTokens(theme.tokens);
    draftName = theme.name;
    draftDescription = theme.description;
    statusMessage = theme.builtIn
      ? "Built-in theme loaded. Edit colors, then save as a custom theme."
      : "Custom theme loaded. Edits are live until you save changes.";
  }

  function handleTokenChange(key: keyof ColorTokens, value: string) {
    tokens = { ...tokens, [key]: value };
  }

  function refreshExport() {
    exportPayload = serializeThemes(themes);
  }

  function persist(nextThemes: ThemeDefinition[], message: string) {
    themes = nextThemes;
    saveCustomThemes(themes);
    refreshExport();
    statusMessage = message;
  }

  function saveAsNewTheme() {
    const name = draftName.trim() || "Untitled Theme";
    const theme: ThemeDefinition = {
      id: createThemeId(name),
      name,
      description: draftDescription.trim(),
      tokens: cloneTokens(tokens),
      builtIn: false,
      updatedAt: new Date().toISOString()
    };

    persist([...themes, theme], `Saved “${theme.name}” as a custom theme.`);
    selectTheme(theme.id);
  }

  function saveCurrentTheme() {
    if (!selectedTheme || selectedTheme.builtIn) {
      saveAsNewTheme();
      return;
    }

    const name = draftName.trim() || selectedTheme.name;
    const nextTheme: ThemeDefinition = {
      ...selectedTheme,
      name,
      description: draftDescription.trim(),
      tokens: cloneTokens(tokens),
      updatedAt: new Date().toISOString()
    };

    persist(
      themes.map((theme) => theme.id === selectedThemeId ? nextTheme : theme),
      `Saved changes to “${nextTheme.name}”.`
    );
    selectTheme(nextTheme.id);
  }

  function duplicateTheme() {
    const source = selectedTheme;
    if (!source) return;

    const copyName = `${draftName.trim() || source.name} Copy`;
    const copy: ThemeDefinition = {
      id: createThemeId(copyName),
      name: copyName,
      description: draftDescription.trim() || source.description,
      tokens: cloneTokens(tokens),
      builtIn: false,
      updatedAt: new Date().toISOString()
    };

    persist([...themes, copy], `Duplicated “${source.name}”.`);
    selectTheme(copy.id);
  }

  function deleteTheme() {
    if (!selectedTheme || selectedTheme.builtIn) return;

    const deletedName = selectedTheme.name;
    const nextThemes = themes.filter((theme) => theme.id !== selectedThemeId);
    persist(nextThemes, `Deleted custom theme “${deletedName}”.`);
    selectTheme(nextThemes[0].id);
  }

  function resetDraft() {
    selectTheme(selectedThemeId);
  }

  function importThemes() {
    try {
      const imported = parseImportedThemes(importPayload).map((theme) =>
        uniqueCustomTheme(theme, themes)
      );

      if (!imported.length) {
        statusMessage = "No themes found in the import payload.";
        return;
      }

      persist([...themes, ...imported], `Imported ${imported.length} theme${imported.length === 1 ? "" : "s"}.`);
      selectTheme(imported[0].id);
      importPayload = "";
    } catch {
      statusMessage = "Import failed. Paste a valid Mimic theme JSON export.";
    }
  }

  $: selectedLayout = layoutOptions.find((layout) => layout.id === selectedLayoutId) ?? layoutOptions[0];
  $: selectedDesignLanguage = designLanguageOptions.find((language) => language.id === selectedDesignLanguageId) ?? designLanguageOptions[0];
  $: selectedTypographyFont = typographyFontOptions.find((font) => font.id === selectedTypographyFontId) ?? typographyFontOptions[0];
  $: normalizedFontSearch = fontSearch.trim().toLowerCase();
  $: filteredTypographyFonts = normalizedFontSearch
    ? typographyFontOptions.filter((font) =>
        `${font.name} ${font.mood} ${font.description}`.toLowerCase().includes(normalizedFontSearch)
      )
    : typographyFontOptions;
  $: selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
  $: originalThemes = themes.filter((theme) => theme.builtIn && originalBuiltInThemeIds.has(theme.id));
  $: popularThemes = themes.filter((theme) => theme.builtIn && !originalBuiltInThemeIds.has(theme.id));
  $: customThemes = themes.filter((theme) => !theme.builtIn);
</script>

<div
  class={`app-root layout-${selectedLayoutId} design-${selectedDesignLanguageId} treatment-${selectedSiteTreatmentId}`}
  style={`
    --font-body: ${selectedTypographyFont.stack};
    --font-display: ${selectedTypographyFont.stack};
    --font-accent: ${selectedTypographyFont.stack};
    --background-canvas: ${tokens.backgroundCanvas};
    --background-base: ${tokens.backgroundBase};
    --surface-panel: ${tokens.surfacePanel};
    --surface-raised: ${tokens.surfaceRaised};
    --surface-neutral: ${tokens.surfaceNeutral};
    --surface-neutral-strong: ${tokens.surfaceNeutralStrong};
    --surface-inset: ${tokens.surfaceInset};
    --text-primary: ${tokens.textPrimary};
    --text-secondary: ${tokens.textSecondary};
    --text-tertiary: ${tokens.textTertiary};
    --action-primary: ${tokens.actionPrimary};
    --text-on-primary-action: ${tokens.textOnPrimaryAction};
    --action-primary-hover: ${tokens.actionPrimaryHover};
    --action-primary-pressed: ${tokens.actionPrimaryPressed};
    --action-secondary: ${tokens.actionSecondary};
    --action-secondary-pressed: ${tokens.actionSecondaryPressed};
    --accent-signal: ${tokens.accentSignal};
    --state-success: ${tokens.stateSuccess};
    --state-danger: ${tokens.stateDanger};
    --border-accent: ${tokens.borderAccent};
    --border-subtle: ${tokens.borderSubtle};
    --border-focus: ${tokens.borderFocus};
  `}
>
  <main class="workspace panel">
    <div class="workspace-heading">
      <div>
        <p class="eyebrow">Lab notes</p>
        <h2>{selectedTheme?.name} {selectedDesignLanguage.name} in {selectedLayout.name}</h2>
      </div>
      <span class="app-mark-capsule">
        <img class="app-mark" src="/mimic.png" alt="Mimic" />
      </span>
      <span>{selectedLayout.name}</span>
    </div>

    {#snippet themeControls()}
      <ThemeControls
        {layoutOptions}
        {selectedLayoutId}
        onLayoutChange={(id) => selectedLayoutId = id}
        selectedLayoutDescription={selectedLayout.description}
        {designLanguageOptions}
        {selectedDesignLanguageId}
        onDesignLanguageChange={(id) => selectedDesignLanguageId = id}
        selectedDesignLanguageDescription={selectedDesignLanguage.description}
        {selectedThemeId}
        onThemeChange={selectTheme}
        {originalThemes}
        {popularThemes}
        {customThemes}
        {tokenList}
        {tokenLabels}
        {tokens}
        onTokenChange={handleTokenChange}
        {selectedTheme}
        {saveCurrentTheme}
        {duplicateTheme}
        {resetDraft}
        {deleteTheme}
        {statusMessage}
        {exportPayload}
        {importPayload}
        onImportPayloadChange={(value) => importPayload = value}
        {importPlaceholder}
        {importThemes}
      />
    {/snippet}

    <AppShowcase
      layoutId={selectedLayoutId}
      designLanguageId={selectedDesignLanguageId}
      siteTreatmentOptions={siteTreatmentOptions}
      selectedSiteTreatmentId={selectedSiteTreatmentId}
      onSiteTreatmentChange={(id) => selectedSiteTreatmentId = id}
      typographyFonts={filteredTypographyFonts}
      selectedTypographyFontId={selectedTypographyFontId}
      fontSearch={fontSearch}
      onFontSearchChange={(value) => fontSearch = value}
      onTypographyFontChange={(id) => selectedTypographyFontId = id}
      onTypographyClear={() => {
        selectedTypographyFontId = "inter";
        fontSearch = "";
      }}
      {themeControls}
    />
  </main>
</div>
