<script lang="ts">
  import { layouts } from "./lib/layouts";
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
  const importPlaceholder = 'Paste { "version": 1, "themes": [...] }';

  let selectedLayoutId = layoutOptions[0].id;
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
  $: selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
  $: customThemeCount = themes.filter((theme) => !theme.builtIn).length;
</script>

<div
  class={`app-root layout-${selectedLayoutId}`}
  style={`
    --bg: ${tokens.bg};
    --bg-alt: ${tokens.bgAlt};
    --fg: ${tokens.fg};
    --accent: ${tokens.accent};
    --border: ${tokens.border};
  `}
>
  <header class="app-header panel">
    <div>
      <p class="eyebrow">Hexware laboratory</p>
      <h1>Mimic</h1>
      <p>Manage reusable Jamal Arcana themes against realistic app components and whole-app layouts.</p>
    </div>
    <div class="theme-count">
      <strong>{themes.length}</strong>
      <span>{customThemeCount} custom</span>
    </div>
  </header>

  <section class="control-panel panel" aria-label="Theme and layout controls">
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
      <h2>Theme</h2>
      <select bind:value={selectedThemeId} on:change={(e) =>
        selectTheme((e.currentTarget as HTMLSelectElement).value)
      }>
        {#each themes as theme}
          <option value={theme.id}>{theme.name}{theme.builtIn ? " · built-in" : ""}</option>
        {/each}
      </select>
    </div>

    <div class="theme-editor control-group">
      <label>
        Name
        <input bind:value={draftName} type="text" placeholder="Theme name" />
      </label>
      <label>
        Notes
        <textarea bind:value={draftDescription} rows="3" placeholder="Describe the vibe, intent, and best use cases."></textarea>
      </label>
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

  <main class="workspace panel">
    <div class="workspace-heading">
      <div>
        <p class="eyebrow">Live app specimen</p>
        <h2>{selectedTheme?.name}</h2>
        <p>{selectedTheme?.description}</p>
      </div>
      <span>{selectedLayout.name}</span>
    </div>

    <AppShowcase />
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
    --soft-border: color-mix(in srgb, var(--border) 52%, transparent);
    --panel-bg: color-mix(in srgb, var(--bg-alt) 82%, transparent);
    --panel-bg-strong: color-mix(in srgb, var(--bg-alt) 92%, var(--bg));
    --muted: color-mix(in srgb, var(--fg) 68%, var(--bg));
    --faint: color-mix(in srgb, var(--fg) 42%, transparent);
    --accent-soft: color-mix(in srgb, var(--accent) 18%, var(--bg-alt));

    box-sizing: border-box;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(18rem, 23rem) minmax(0, 1fr);
    grid-template-areas:
      "header header"
      "controls workspace";
    gap: 1rem;
    padding: 1rem;
    background:
      radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--border) 26%, transparent), transparent 30rem),
      radial-gradient(circle at 86% 6%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 28rem),
      linear-gradient(135deg, var(--bg), color-mix(in srgb, var(--bg) 86%, black));
    color: var(--fg);
  }

  .app-root *,
  .app-root *::before,
  .app-root *::after {
    box-sizing: border-box;
  }

  .panel {
    border: 1px solid var(--soft-border);
    border-radius: 1.25rem;
    background: var(--panel-bg);
    box-shadow: 0 20px 60px color-mix(in srgb, var(--bg) 80%, black 20%);
    backdrop-filter: blur(18px);
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
  }

  .workspace {
    grid-area: workspace;
    min-width: 0;
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }

  .layout-command-deck {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "header"
      "controls"
      "workspace";
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

  .layout-inspector-right {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 23rem);
    grid-template-areas:
      "header header"
      "workspace controls";
  }

  .eyebrow {
    margin: 0 0 0.25rem;
    color: var(--accent);
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
  }

  .workspace-heading h2 {
    font-size: clamp(1.5rem, 2.5vw, 2.35rem);
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
    border: 1px solid var(--soft-border);
    border-radius: 1rem;
    background: var(--accent-soft);
    text-align: right;
  }

  .theme-count strong,
  .theme-count span {
    display: block;
  }

  .theme-count strong {
    color: var(--accent);
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
    color: var(--muted);
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
    font-size: 0.82rem;
  }

  select,
  input[type="text"],
  textarea {
    width: 100%;
    border: 1px solid var(--soft-border);
    border-radius: 0.7rem;
    background: color-mix(in srgb, var(--bg) 74%, var(--bg-alt));
    color: var(--fg);
    font: inherit;
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
    border: 1px solid var(--soft-border);
    border-radius: 0.75rem;
    padding: 0.55rem 0.75rem;
    background: color-mix(in srgb, var(--bg-alt) 74%, var(--bg));
    color: var(--fg);
    cursor: pointer;
    font-weight: 750;
  }

  button:hover:not(:disabled) {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  button.primary {
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 52%, var(--border)));
    border-color: color-mix(in srgb, var(--accent) 80%, white 20%);
    color: color-mix(in srgb, var(--bg) 86%, black);
  }

  button.danger {
    color: color-mix(in srgb, #ff6b8a 72%, var(--fg));
  }

  .token-list {
    display: grid;
    gap: 0.45rem;
  }

  .token-row {
    display: grid;
    grid-template-columns: 84px 40px minmax(0, 1fr);
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
    border-top: 1px solid color-mix(in srgb, var(--border) 24%, transparent);
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
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.78rem;
    font-weight: 800;
    white-space: nowrap;
  }

  @media (max-width: 1100px) {
    .app-root,
    .layout-inspector-right,
    .layout-command-deck {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        "header"
        "controls"
        "workspace";
    }

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
