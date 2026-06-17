<script lang="ts">
  import { layouts } from "./lib/layouts";
  import { designLanguages, type DesignLanguageId } from "./lib/designLanguages";
  import AppShowcase from "./lib/components/AppShowcase.svelte";
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
  $: selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
  $: originalThemes = themes.filter((theme) => theme.builtIn && originalBuiltInThemeIds.has(theme.id));
  $: popularThemes = themes.filter((theme) => theme.builtIn && !originalBuiltInThemeIds.has(theme.id));
  $: customThemes = themes.filter((theme) => !theme.builtIn);
  $: customThemeCount = themes.filter((theme) => !theme.builtIn).length;
</script>

<div
  class={`app-root layout-${selectedLayoutId} design-${selectedDesignLanguageId}`}
  style={`
    --bg: ${tokens.backgroundCanvas};
    --bg-alt: ${tokens.backgroundBase};
    --bg-panel: ${tokens.surfacePanel};
    --bg-panel-2: ${tokens.surfaceRaised};
    --steel: ${tokens.surfaceNeutral};
    --steel-light: ${tokens.surfaceNeutralStrong};
    --steel-dark: ${tokens.surfaceInset};
    --fg: ${tokens.textPrimary};
    --fg-muted: ${tokens.textSecondary};
    --fg-dim: ${tokens.textTertiary};
    --accent: ${tokens.actionPrimary};
    --action-primary-text: ${tokens.textOnPrimaryAction};
    --accent-hot: ${tokens.actionPrimaryHover};
    --accent-deep: ${tokens.actionPrimaryPressed};
    --frost: ${tokens.actionSecondary};
    --frost-deep: ${tokens.actionSecondaryPressed};
    --pink-signal: ${tokens.accentSignal};
    --success: ${tokens.stateSuccess};
    --danger: ${tokens.stateDanger};
    --border: ${tokens.borderAccent};
    --border-cold-token: ${tokens.borderSubtle};
    --border-hot-token: ${tokens.borderFocus};
  `}
>
  <header class="app-header panel">
    <div>
      <p class="eyebrow">Design system laboratory</p>
      <h1>Mimic</h1>
      <p>Combine original design languages, reusable color themes, realistic components, and whole-app layouts.</p>
    </div>
    <div class="theme-count">
      <strong>{themes.length}</strong>
      <span>{customThemeCount} custom</span>
    </div>
  </header>

  <main class="workspace panel">
    <div class="workspace-heading">
      <div>
        <p class="eyebrow">Live app specimen</p>
        <h2>{selectedTheme?.name} {selectedDesignLanguage.name}</h2>
      </div>
      <span>{selectedLayout.name}</span>
    </div>

    {#snippet themeControls()}
      <section class="control-panel" aria-label="Theme and layout controls">
        <div class="control-group">
          <h2>Layout</h2>
          <select bind:value={selectedLayoutId}>
            {#each layoutOptions as layout}
              <option value={layout.id}>{layout.name}</option>
            {/each}
          </select>
          <p>{selectedLayout.description}</p>
        </div>

        <div class="control-group">
          <h2>Design language</h2>
          <select bind:value={selectedDesignLanguageId}>
            {#each designLanguageOptions as language}
              <option value={language.id}>{language.name}</option>
            {/each}
          </select>
          <p>{selectedDesignLanguage.description}</p>
        </div>

        <div class="control-group">
          <h2>Color theme</h2>
          <select bind:value={selectedThemeId} on:change={(e) =>
            selectTheme((e.currentTarget as HTMLSelectElement).value)
          }>
            <optgroup label="Mimic originals">
              {#each originalThemes as theme}
                <option value={theme.id}>{theme.name}</option>
              {/each}
            </optgroup>
            <optgroup label="Popular palettes">
              {#each popularThemes as theme}
                <option value={theme.id}>{theme.name}</option>
              {/each}
            </optgroup>
            {#if customThemes.length}
              <optgroup label="Custom themes">
                {#each customThemes as theme}
                  <option value={theme.id}>{theme.name}</option>
                {/each}
              </optgroup>
            {/if}
          </select>
        </div>

        <div class="token-group control-group">
          <h2>Tokens</h2>
          <div class="token-list">
            {#each tokenList as key}
              <div class="token-row">
                <label for={`token-${key}`}>{tokenLabels[key]}</label>
                <input
                  id={`token-${key}`}
                  type="color"
                  bind:value={tokens[key]}
                  on:input={(e) =>
                    handleTokenChange(
                      key,
                      (e.currentTarget as HTMLInputElement).value
                    )
                  }
                />
                <input
                  class="hex-input"
                  type="text"
                  aria-label={`${tokenLabels[key]} hex value`}
                  bind:value={tokens[key]}
                  on:input={(e) =>
                    handleTokenChange(
                      key,
                      (e.currentTarget as HTMLInputElement).value
                    )
                  }
                />
              </div>
            {/each}
          </div>
        </div>

        <div class="theme-actions control-group">
          <div class="action-grid">
            <button type="button" class="primary" on:click={saveCurrentTheme}>
              {selectedTheme?.builtIn ? "Save as new" : "Save changes"}
            </button>
            <button type="button" on:click={duplicateTheme}>Duplicate</button>
            <button type="button" on:click={resetDraft}>Reset draft</button>
            <button type="button" class="danger" on:click={deleteTheme} disabled={selectedTheme?.builtIn}>Delete</button>
          </div>
          <p class="status">{statusMessage}</p>
        </div>

        <details class="theme-io control-group">
          <summary>Import / export custom themes</summary>
          <label>
            Export JSON
            <textarea readonly rows="6" bind:value={exportPayload}></textarea>
          </label>
          <label>
            Import JSON
            <textarea rows="6" bind:value={importPayload} placeholder={importPlaceholder}></textarea>
          </label>
          <button type="button" on:click={importThemes}>Import themes</button>
        </details>
      </section>
    {/snippet}

    <AppShowcase layoutId={selectedLayoutId} designLanguageId={selectedDesignLanguageId} {themeControls} />
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #020617;
    color: #e5e7eb;
  }

  .app-root {
    --border-cold: color-mix(in srgb, var(--border-cold-token) 28%, transparent);
    --border-hot: color-mix(in srgb, var(--border-hot-token) 72%, transparent);
    --ember-glow: color-mix(in srgb, var(--accent) 52%, transparent);
    --frost-glow: color-mix(in srgb, var(--frost) 36%, transparent);
    --soft-border: var(--border-cold);
    --panel-bg: linear-gradient(
      180deg,
      color-mix(in srgb, var(--bg-panel-2) 94%, transparent),
      color-mix(in srgb, var(--bg) 96%, transparent)
    ),
    repeating-linear-gradient(135deg, color-mix(in srgb, white 2.5%, transparent) 0 1px, transparent 1px 8px);
    --panel-bg-strong: linear-gradient(180deg, var(--bg-panel-2), var(--bg));
    --selected-fill: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 32%, var(--bg)),
      color-mix(in srgb, var(--bg) 92%, transparent)
    );
    --cold-fill: linear-gradient(
      135deg,
      color-mix(in srgb, var(--frost) 16%, var(--bg-panel)),
      color-mix(in srgb, var(--bg-panel) 96%, var(--bg))
    );
    --muted: var(--fg-muted);
    --dim: var(--fg-dim);
    --faint: color-mix(in srgb, var(--fg) 36%, transparent);
    --accent-soft: color-mix(in srgb, var(--accent) 22%, transparent);
    --frost-soft: color-mix(in srgb, var(--border) 18%, transparent);
    --cut-corners: polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px);

    box-sizing: border-box;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "header"
      "workspace";
    gap: 1rem;
    padding: 1rem;
    background:
      radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--pink-signal) 11%, transparent), transparent 23rem),
      radial-gradient(circle at 88% 12%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 28rem),
      radial-gradient(circle at 70% 90%, color-mix(in srgb, var(--frost) 12%, transparent), transparent 31rem),
      repeating-linear-gradient(90deg, color-mix(in srgb, white 1.8%, transparent) 0 1px, transparent 1px 80px),
      linear-gradient(135deg, color-mix(in srgb, white 3.5%, var(--bg)), var(--bg) 46%, color-mix(in srgb, var(--bg) 84%, black));
    color: var(--fg);
  }

  .design-cloud-spire {
    --cut-corners: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    --panel-bg:
      linear-gradient(180deg, color-mix(in srgb, var(--fg) 8%, var(--bg-panel)), color-mix(in srgb, var(--bg-panel-2) 94%, transparent)),
      linear-gradient(180deg, color-mix(in srgb, var(--fg) 3%, transparent), transparent);
    --selected-fill: linear-gradient(180deg, color-mix(in srgb, var(--fg) 6%, var(--accent)), color-mix(in srgb, var(--accent) 28%, var(--bg-panel)));
    --cold-fill: linear-gradient(180deg, color-mix(in srgb, var(--fg) 5%, var(--frost)), color-mix(in srgb, var(--frost) 20%, var(--bg-panel)));
    background:
      radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--fg) 4%, transparent), transparent 24rem),
      radial-gradient(circle at 82% 10%, color-mix(in srgb, var(--frost) 14%, transparent), transparent 30rem),
      linear-gradient(180deg, color-mix(in srgb, var(--fg) 3%, var(--bg)), var(--bg));
  }

  .design-aquacore {
    --cut-corners: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    --panel-bg:
      radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--frost) 20%, transparent), transparent 22rem),
      radial-gradient(ellipse at 85% 100%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 24rem),
      linear-gradient(180deg, color-mix(in srgb, var(--bg-panel-2) 82%, transparent), color-mix(in srgb, var(--bg) 90%, transparent));
    --selected-fill:
      radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 60%),
      linear-gradient(180deg, color-mix(in srgb, var(--frost) 16%, var(--bg-panel)), color-mix(in srgb, var(--bg) 82%, transparent));
    --cold-fill:
      radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--frost) 20%, transparent), transparent 62%),
      linear-gradient(180deg, color-mix(in srgb, var(--bg-panel-2) 88%, transparent), color-mix(in srgb, var(--bg) 92%, transparent));
  }

  .app-root *,
  .app-root *::before,
  .app-root *::after {
    box-sizing: border-box;
  }

  .panel {
    border: 1px solid var(--border-cold);
    border-radius: 0.45rem;
    background: var(--panel-bg);
    clip-path: var(--cut-corners);
    box-shadow:
      0 24px 64px color-mix(in srgb, black 45%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 3.5%, transparent),
      inset 0 0 22px color-mix(in srgb, var(--frost) 4.5%, transparent);
    backdrop-filter: blur(18px);
  }

  .design-cloud-spire .panel {
    border-radius: 1.35rem;
    clip-path: none;
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--border) 34%, transparent);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--fg) 10%, transparent),
      0 18px 0 -14px color-mix(in srgb, var(--frost) 24%, transparent),
      0 34px 80px color-mix(in srgb, var(--frost) 16%, transparent),
      0 18px 42px color-mix(in srgb, var(--bg) 42%, transparent),
      0 2px 0 color-mix(in srgb, var(--fg) 7%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--fg) 9%, transparent),
      inset 0 -1px 0 color-mix(in srgb, var(--border) 10%, transparent);
  }

  .design-aquacore .panel {
    border-radius: 1.75rem;
    clip-path: none;
    box-shadow:
      0 28px 80px color-mix(in srgb, var(--frost) 20%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--fg) 12%, transparent),
      inset 0 -22px 46px color-mix(in srgb, var(--frost) 9%, transparent),
      inset 0 0 34px color-mix(in srgb, var(--accent) 5%, transparent);
  }

  .app-header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-end;
    padding: 1rem 1.2rem;
  }

  .control-panel {
    grid-area: controls;
    align-self: start;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--soft-border);
    border-radius: 0.45rem;
    background:
      radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--frost) 12%, transparent), transparent 16rem),
      var(--panel-bg);
    clip-path: var(--cut-corners);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, white 3.5%, transparent),
      inset 0 0 18px color-mix(in srgb, var(--frost) 5%, transparent);
  }

  .design-cloud-spire .control-panel {
    background: var(--panel-bg);
    border-color: color-mix(in srgb, var(--border) 34%, transparent);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--fg) 10%, transparent),
      0 16px 0 -13px color-mix(in srgb, var(--frost) 22%, transparent),
      0 22px 48px color-mix(in srgb, var(--bg) 34%, transparent),
      0 1px 0 color-mix(in srgb, var(--fg) 7%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--fg) 9%, transparent),
      inset 0 -1px 0 color-mix(in srgb, var(--border) 10%, transparent);
  }

  .design-aquacore .control-panel {
    background: var(--panel-bg);
    border-color: color-mix(in srgb, var(--border) 30%, transparent);
    box-shadow:
      inset 0 18px 38px color-mix(in srgb, var(--fg) 4%, transparent),
      inset 0 -18px 42px color-mix(in srgb, var(--frost) 7%, transparent);
  }

  .workspace {
    grid-area: workspace;
    min-width: 0;
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }

  .layout-command-deck .control-panel {
    grid-template-columns: repeat(4, minmax(13rem, 1fr));
    align-items: start;
  }

  .layout-command-deck .token-group,
  .layout-command-deck .theme-actions,
  .layout-command-deck .theme-io {
    grid-column: span 2;
  }

  .eyebrow {
    margin: 0 0 0.25rem;
    color: var(--frost);
    font-family: Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .app-header h1,
  .workspace-heading h2 {
    margin: 0;
    letter-spacing: -0.06em;
  }

  .app-header h1 {
    font-size: clamp(2rem, 4vw, 3.4rem);
    background: linear-gradient(90deg, var(--pink-signal), var(--accent-hot) 54%, var(--border));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 22px color-mix(in srgb, var(--accent) 25%, transparent);
  }

  .workspace-heading h2 {
    font-size: clamp(1.5rem, 2.5vw, 2.35rem);
    color: var(--action-primary-text);
    text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 28%, transparent);
  }

  .app-header p,
  .workspace-heading p,
  .control-group p,
  .status {
    margin: 0.25rem 0 0;
    color: var(--muted);
  }

  .theme-count {
    min-width: 7rem;
    padding: 0.8rem 1rem;
    border: 1px solid var(--border-hot);
    border-radius: 0.4rem;
    background: var(--selected-fill);
    clip-path: var(--cut-corners);
    text-align: right;
  }

  .theme-count strong,
  .theme-count span {
    display: block;
  }

  .theme-count strong {
    color: var(--action-primary-text);
    font-size: 1.5rem;
  }

  .theme-count span,
  .status {
    font-size: 0.82rem;
  }

  .control-group {
    min-width: 0;
  }

  .control-panel h2 {
    margin: 0 0 0.45rem;
    color: var(--accent-hot);
    font-family: Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 0.84rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .theme-editor,
  .theme-io {
    display: grid;
    gap: 0.65rem;
  }

  .theme-editor label,
  .theme-io label {
    display: grid;
    gap: 0.3rem;
    color: var(--muted);
    font-family: Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  select,
  input[type="text"],
  textarea {
    width: 100%;
    border: 1px solid color-mix(in srgb, var(--border-cold-token) 24%, transparent);
    border-radius: 0.35rem;
    background: linear-gradient(180deg, color-mix(in srgb, var(--steel-dark) 96%, transparent), color-mix(in srgb, var(--bg-panel) 96%, transparent));
    color: var(--fg);
    font: inherit;
    box-shadow:
      inset 0 0 18px color-mix(in srgb, black 38%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 2%, transparent);
  }

  select:focus,
  input[type="text"]:focus,
  textarea:focus {
    border-color: var(--border-hot);
    outline: none;
    box-shadow:
      inset 0 0 18px color-mix(in srgb, black 45%, transparent),
      0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent),
      0 0 24px color-mix(in srgb, var(--accent) 10%, transparent);
  }

  select {
    padding: 0.45rem 0.55rem;
  }

  input[type="text"],
  textarea {
    padding: 0.5rem 0.6rem;
  }

  textarea {
    resize: vertical;
  }

  button {
    border: 1px solid color-mix(in srgb, var(--border-cold-token) 30%, transparent);
    border-radius: 0.35rem;
    padding: 0.65rem 0.8rem;
    background:
      radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--frost) 18%, transparent), transparent 58%),
      linear-gradient(180deg, color-mix(in srgb, var(--steel) 72%, transparent), color-mix(in srgb, var(--steel-dark) 96%, transparent));
    color: var(--border);
    cursor: pointer;
    font-family: Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    box-shadow:
      inset 0 0 16px color-mix(in srgb, var(--frost) 6%, transparent),
      inset 0 -1px 0 color-mix(in srgb, white 5%, transparent);
  }

  .design-cloud-spire button {
    border-radius: 999px;
    clip-path: none;
    text-transform: none;
    letter-spacing: 0.03em;
  }

  .design-aquacore button {
    border-radius: 999px;
    clip-path: none;
    text-transform: none;
  }

  button:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--border) 55%, transparent);
    box-shadow:
      inset 0 0 24px color-mix(in srgb, var(--frost) 12%, transparent),
      0 0 18px color-mix(in srgb, var(--frost) 8%, transparent);
    transform: translateY(-1px);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  button.primary {
    background: var(--selected-fill);
    border-color: var(--border-hot);
    color: var(--action-primary-text);
    box-shadow:
      inset 4px 0 0 color-mix(in srgb, var(--accent-hot) 85%, transparent),
      inset 0 0 18px color-mix(in srgb, var(--accent) 18%, transparent),
      0 0 28px color-mix(in srgb, var(--accent) 16%, transparent);
  }

  button.danger {
    border-color: color-mix(in srgb, var(--danger) 45%, transparent);
    color: color-mix(in srgb, var(--danger) 68%, white);
    background: linear-gradient(180deg, color-mix(in srgb, var(--danger) 18%, var(--steel-dark)), color-mix(in srgb, var(--steel-dark) 98%, transparent));
  }

  .token-list {
    display: grid;
    gap: 0.45rem;
  }

  .token-row {
    display: grid;
    grid-template-columns: minmax(7.5rem, 0.9fr) 40px minmax(0, 1fr);
    gap: 0.45rem;
    align-items: center;
    font-size: 0.85rem;
  }

  .token-row label {
    color: var(--muted);
  }

  .token-row input[type="color"] {
    width: 40px;
    height: 30px;
    padding: 0;
    border: 1px solid var(--soft-border);
    border-radius: 0.5rem;
    background: transparent;
  }

  .hex-input {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.8rem;
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .theme-io {
    border-top: 1px solid var(--soft-border);
    padding-top: 0.85rem;
  }

  .theme-io summary {
    cursor: pointer;
    color: var(--accent);
    font-size: 0.86rem;
    font-weight: 800;
  }

  .workspace-heading {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
  }

  .workspace-heading span {
    border: 1px solid var(--soft-border);
    border-radius: 999px;
    padding: 0.35rem 0.65rem;
    background: color-mix(in srgb, var(--frost) 14%, transparent);
    color: var(--border);
    font-size: 0.78rem;
    font-weight: 800;
    white-space: nowrap;
  }

  @media (max-width: 1100px) {
    .layout-command-deck .control-panel {
      grid-template-columns: repeat(2, minmax(13rem, 1fr));
    }
  }

  @media (max-width: 760px) {
    .app-root {
      padding: 0.6rem;
    }

    .app-header,
    .workspace-heading {
      align-items: stretch;
      flex-direction: column;
    }

    .theme-count {
      text-align: left;
    }

    .layout-command-deck .control-panel,
    .control-panel {
      grid-template-columns: 1fr;
    }

    .layout-command-deck .token-group,
    .layout-command-deck .theme-actions,
    .layout-command-deck .theme-io {
      grid-column: auto;
    }
  }
</style>
