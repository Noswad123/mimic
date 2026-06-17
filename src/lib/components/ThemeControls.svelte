<script lang="ts">
  import type { ColorTokens, ThemeDefinition } from "../colorTokens";
  import type { DesignLanguageDefinition, DesignLanguageId } from "../designLanguages";
  import type { LayoutDefinition } from "../layouts";

  let {
    layoutOptions,
    selectedLayoutId,
    onLayoutChange,
    selectedLayoutDescription,
    designLanguageOptions,
    selectedDesignLanguageId,
    onDesignLanguageChange,
    selectedDesignLanguageDescription,
    selectedThemeId,
    onThemeChange,
    originalThemes,
    popularThemes,
    customThemes,
    tokenList,
    tokenLabels,
    tokens,
    onTokenChange,
    selectedTheme,
    saveCurrentTheme,
    duplicateTheme,
    resetDraft,
    deleteTheme,
    statusMessage,
    exportPayload,
    importPayload,
    onImportPayloadChange,
    importPlaceholder,
    importThemes
  }: {
    layoutOptions: LayoutDefinition[];
    selectedLayoutId: string;
    onLayoutChange: (id: string) => void;
    selectedLayoutDescription: string;
    designLanguageOptions: DesignLanguageDefinition[];
    selectedDesignLanguageId: DesignLanguageId;
    onDesignLanguageChange: (id: DesignLanguageId) => void;
    selectedDesignLanguageDescription: string;
    selectedThemeId: string;
    onThemeChange: (id: string) => void;
    originalThemes: ThemeDefinition[];
    popularThemes: ThemeDefinition[];
    customThemes: ThemeDefinition[];
    tokenList: Array<keyof ColorTokens>;
    tokenLabels: Record<keyof ColorTokens, string>;
    tokens: ColorTokens;
    onTokenChange: (key: keyof ColorTokens, value: string) => void;
    selectedTheme?: ThemeDefinition;
    saveCurrentTheme: () => void;
    duplicateTheme: () => void;
    resetDraft: () => void;
    deleteTheme: () => void;
    statusMessage: string;
    exportPayload: string;
    importPayload: string;
    onImportPayloadChange: (value: string) => void;
    importPlaceholder: string;
    importThemes: () => void;
  } = $props();
</script>

<section class="control-panel" aria-label="Theme and layout controls">
  <div class="control-group">
    <h2>Layout</h2>
    <select value={selectedLayoutId} onchange={(e) => onLayoutChange((e.currentTarget as HTMLSelectElement).value)}>
      {#each layoutOptions as layout}
        <option value={layout.id}>{layout.name}</option>
      {/each}
    </select>
    <p>{selectedLayoutDescription}</p>
  </div>

  <div class="control-group">
    <h2>Design language</h2>
    <select
      value={selectedDesignLanguageId}
      onchange={(e) => onDesignLanguageChange((e.currentTarget as HTMLSelectElement).value as DesignLanguageId)}
    >
      {#each designLanguageOptions as language}
        <option value={language.id}>{language.name}</option>
      {/each}
    </select>
    <p>{selectedDesignLanguageDescription}</p>
  </div>

  <div class="control-group">
    <h2>Color theme</h2>
    <select value={selectedThemeId} onchange={(e) => onThemeChange((e.currentTarget as HTMLSelectElement).value)}>
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
            value={tokens[key]}
            oninput={(e) => onTokenChange(key, (e.currentTarget as HTMLInputElement).value)}
          />
          <input
            class="hex-input"
            type="text"
            aria-label={`${tokenLabels[key]} hex value`}
            value={tokens[key]}
            oninput={(e) => onTokenChange(key, (e.currentTarget as HTMLInputElement).value)}
          />
        </div>
      {/each}
    </div>
  </div>

  <div class="theme-actions control-group">
    <div class="action-grid">
      <button type="button" class="primary" onclick={saveCurrentTheme}>
        {selectedTheme?.builtIn ? "Save as new" : "Save changes"}
      </button>
      <button type="button" onclick={duplicateTheme}>Duplicate</button>
      <button type="button" onclick={resetDraft}>Reset draft</button>
      <button type="button" class="danger" onclick={deleteTheme} disabled={selectedTheme?.builtIn}>Delete</button>
    </div>
    <p class="status">{statusMessage}</p>
  </div>

  <details class="theme-io control-group">
    <summary>Import / export custom themes</summary>
    <label>
      Export JSON
      <textarea readonly rows="6" value={exportPayload}></textarea>
    </label>
    <label>
      Import JSON
      <textarea
        rows="6"
        value={importPayload}
        placeholder={importPlaceholder}
        oninput={(e) => onImportPayloadChange((e.currentTarget as HTMLTextAreaElement).value)}
      ></textarea>
    </label>
    <button type="button" onclick={importThemes}>Import themes</button>
  </details>
</section>
