<script lang="ts">
  import { layouts } from "./lib/layouts";
  import { defaultPalettes, tokenList, type ColorTokens } from "./lib/colorTokens";

  const layoutOptions = layouts;
  const paletteOptions = Object.keys(defaultPalettes);

  let selectedLayoutId = layoutOptions[0].id;
  let selectedPaletteName = paletteOptions[0];

  let tokens: ColorTokens = structuredClone(
    defaultPalettes[selectedPaletteName]
  );

  // When user switches palette, copy its colors into the live tokens
  function handlePaletteChange(name: string) {
    selectedPaletteName = name;
    tokens = structuredClone(defaultPalettes[name]);
  }

  function handleTokenChange(key: keyof ColorTokens, value: string) {
    tokens = { ...tokens, [key]: value };
  }

  $: selectedLayout = layoutOptions.find((l) => l.id === selectedLayoutId);
</script>

<div class="app-root">
  <header class="app-header">
    <h1>Mimic</h1>
    <p>Pick a wireframe layout and play with color palettes in real time.</p>
  </header>

  <div class="app-body">
    <section class="control-panel">
      <h2>Layout</h2>
      <select bind:value={selectedLayoutId}>
        {#each layoutOptions as layout}
          <option value={layout.id}>{layout.name}</option>
        {/each}
      </select>

      <h2 class="mt">Base Palette</h2>
      <select bind:value={selectedPaletteName} on:change={(e) =>
        handlePaletteChange((e.currentTarget as HTMLSelectElement).value)
      }>
        {#each paletteOptions as name}
          <option value={name}>{name}</option>
        {/each}
      </select>

      <h2 class="mt">Tokens</h2>
      <div class="token-list">
        {#each tokenList as key}
          <div class="token-row">
            <label>{key}</label>
            <input
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
    </section>

    <section class="preview-panel">
      <h2>Preview</h2>

      <!-- Apply CSS variables here so layouts can just use var(--bg), etc. -->
      <div
        class="preview-frame"
        style={`
          --bg: ${tokens.bg};
          --bg-alt: ${tokens.bgAlt};
          --fg: ${tokens.fg};
          --accent: ${tokens.accent};
          --border: ${tokens.border};
        `}
      >
        {#if selectedLayout}
          <svelte:component this={selectedLayout.component} />
        {:else}
          <p>No layout selected.</p>
        {/if}
      </div>
    </section>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background: #020617;
    color: #e5e7eb;
  }

  .app-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .app-header h1 {
    font-size: 1.8rem;
    margin: 0;
  }

  .app-header p {
    margin: 0.25rem 0 0;
    opacity: 0.8;
  }

  .app-body {
    display: grid;
    grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
    gap: 1.5rem;
  }

  .control-panel,
  .preview-panel {
    background: #020617;
    border-radius: 1rem;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(148, 163, 184, 0.45);
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.75);
  }

  .control-panel h2,
  .preview-panel h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    margin: 0 0 0.4rem;
  }

  .control-panel .mt {
    margin-top: 0.9rem;
  }

  select {
    width: 100%;
    padding: 0.4rem 0.5rem;
    border-radius: 0.6rem;
    border: 1px solid rgba(148, 163, 184, 0.6);
    background: #020617;
    color: #e5e7eb;
    font-size: 0.9rem;
  }

  .token-list {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .token-row {
    display: grid;
    grid-template-columns: 70px 40px minmax(0, 1fr);
    gap: 0.4rem;
    align-items: center;
    font-size: 0.85rem;
  }

  .token-row label {
    opacity: 0.9;
  }

  .token-row input[type="color"] {
    padding: 0;
    border-radius: 0.4rem;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: transparent;
    width: 40px;
    height: 28px;
  }

  .hex-input {
    padding: 0.3rem 0.4rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: #020617;
    color: #e5e7eb;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 0.8rem;
  }

  .preview-frame {
    margin-top: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    background: radial-gradient(circle at top, #0f172a, #020617);
  }

  @media (max-width: 800px) {
    .app-body {
      grid-template-columns: 1fr;
    }
  }
</style>
