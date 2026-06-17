<script lang="ts">
  import type { Snippet } from "svelte";
  import type { DesignLanguageId } from "../designLanguages";
  import type { SiteTreatmentDefinition, SiteTreatmentId } from "../siteTreatments";
  import type { TypographyFontDefinition, TypographyFontId } from "../typography";

  let {
    layoutId = "sidebar-workbench",
    designLanguageId = "hexware",
    siteTreatmentOptions,
    selectedSiteTreatmentId = "clear",
    onSiteTreatmentChange,
    typographyFonts,
    selectedTypographyFontId = "inter",
    fontSearch = "",
    onFontSearchChange,
    onTypographyFontChange,
    onTypographyClear,
    themeControls
  }: {
    layoutId?: string;
    designLanguageId?: DesignLanguageId;
    siteTreatmentOptions: SiteTreatmentDefinition[];
    selectedSiteTreatmentId?: SiteTreatmentId;
    onSiteTreatmentChange: (id: SiteTreatmentId) => void;
    typographyFonts: TypographyFontDefinition[];
    selectedTypographyFontId?: TypographyFontId;
    fontSearch?: string;
    onFontSearchChange: (value: string) => void;
    onTypographyFontChange: (id: TypographyFontId) => void;
    onTypographyClear: () => void;
    themeControls?: Snippet;
  } = $props();

  const navItems = ["Dashboard", "Notes", "Automations", "Settings"];
  const metrics = [
    { label: "Active rituals", value: "24", detail: "+6 this week" },
    { label: "Synced notes", value: "1.8k", detail: "98% indexed" },
    { label: "Open tasks", value: "37", detail: "12 due soon" }
  ];
  const rows = [
    { tool: "Mind Weaver", domain: "Knowledge", status: "Ready" },
    { tool: "Waystone", domain: "Navigation", status: "Linked" },
    { tool: "Djinn", domain: "Aliases", status: "Watching" }
  ];
</script>

<div class={`product-shell product-layout-${layoutId} product-design-${designLanguageId}`}>
  {#if layoutId !== "right-sidebar"}
    <aside class="sample-sidebar" aria-label="Sample app navigation">
      {#if layoutId === "sidebar-workbench" && themeControls}
        {@render themeControls()}
      {:else}
        <div class="brand-mark">JA</div>
        <nav>
          {#each navItems as item, index}
            <a class:active={index === 0} href={`#${item.toLowerCase()}`}>{item}</a>
          {/each}
        </nav>
        <div class="sidebar-callout">
          <strong>Hexware</strong>
          <span>Theme substrate online</span>
        </div>
      {/if}
    </aside>
  {/if}

  <section class="sample-main" aria-label="Sample app components">
    <header class="sample-topbar">
      <div class="topbar-note">
        <span>Specimen console</span>
        <strong>Live preview field</strong>
      </div>
      <div class="hero-pills topbar-pills">
        <span>Theme reactive</span>
        <span>Local draft</span>
      </div>
    </header>

    {#if layoutId === "command-deck" && themeControls}
      <div class="command-tooling">
        {@render themeControls()}
      </div>
    {/if}

    <section class="hero-card">
      <div>
        <p>Current workspace</p>
        <h3>Arcana Operations</h3>
        <span>Real components, live colors, whole-shell theming.</span>
      </div>
      <div class="hero-pills">
        <span>Synced</span>
        <span>Local-first</span>
        <span>Encrypted</span>
      </div>
    </section>

    <section class="metric-grid" aria-label="Sample metrics">
      {#each metrics as metric}
        <article class="metric-card">
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <small>{metric.detail}</small>
        </article>
      {/each}
    </section>

    <section class="component-grid">
      <article class="component-card command-card">
        <div class="card-heading">
          <h3>Site treatment</h3>
          <span class="badge">Lab field</span>
        </div>
        <div class="treatment-options" aria-label="Site treatment controls">
          {#each siteTreatmentOptions as treatment}
            <button
              type="button"
              class:active={selectedSiteTreatmentId === treatment.id}
              class="treatment-option"
              onclick={() => onSiteTreatmentChange(treatment.id)}
            >
              <strong>{treatment.name}</strong>
              <span>{treatment.description}</span>
            </button>
          {/each}
        </div>
      </article>

      <article class="component-card font-card">
        <div class="card-heading">
          <h3>Typography</h3>
          <span class="badge">Voice</span>
        </div>
        <div class="font-search-row">
          <label class="search-field font-search" for="font-search">
            <span>Search curated fonts</span>
            <input
              id="font-search"
              type="search"
              value={fontSearch}
              placeholder="Try terminal, ritual, serif, lab..."
              oninput={(e) => onFontSearchChange((e.currentTarget as HTMLInputElement).value)}
            />
          </label>
          <button type="button" class="clear-button" onclick={onTypographyClear}>Clear</button>
        </div>
        <div class="font-list" aria-label="Curated typography options">
          {#each typographyFonts as font}
            <button
              type="button"
              class:active={selectedTypographyFontId === font.id}
              class="font-option"
              style={`--font-preview: ${font.stack};`}
              onclick={() => onTypographyFontChange(font.id)}
            >
              <span class="font-specimen">Aa</span>
              <span>
                <strong>{font.name}</strong>
                <em>{font.mood}</em>
                <small>{font.description}</small>
              </span>
            </button>
          {:else}
            <p class="empty-state">No curated fonts match that search.</p>
          {/each}
        </div>
      </article>

      <article class="component-card table-card">
        <div class="card-heading">
          <h3>Tool registry</h3>
          <span class="badge">Live</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Domain</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as row}
              <tr>
                <td>{row.tool}</td>
                <td>{row.domain}</td>
                <td><span class="status-pill">{row.status}</span></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </article>

      <article class="component-card notification-card">
        <div class="toast success">
          <strong>Theme saved</strong>
          <span>Custom Hexware stored locally.</span>
        </div>
        <div class="toast warning">
          <strong>Review contrast</strong>
          <span>Accent-heavy controls may need restraint.</span>
        </div>
      </article>
    </section>
  </section>

  {#if (layoutId === "inspector-right" || layoutId === "right-sidebar") && themeControls}
    <aside class="sample-inspector" aria-label="Theme inspector">
      {@render themeControls()}
    </aside>
  {/if}
</div>

<style>
  .product-shell {
    min-height: 40rem;
    display: grid;
    grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
    gap: 1rem;
    border: 1px solid var(--border-subtle-alpha);
    border-radius: 0.45rem;
    background:
      radial-gradient(circle at 86% 8%, color-mix(in srgb, var(--accent-signal) 10%, transparent), transparent 17rem),
      repeating-linear-gradient(90deg, color-mix(in srgb, white 1.8%, transparent) 0 1px, transparent 1px 80px),
      color-mix(in srgb, var(--background-canvas) 88%, var(--surface-panel));
    clip-path: var(--cut-corners);
    overflow: hidden;
  }

  .product-design-cloud-spire {
    border-radius: 1.35rem;
    background:
      radial-gradient(circle at 25% 0%, color-mix(in srgb, var(--text-primary) 6%, transparent), transparent 18rem),
      radial-gradient(circle at 88% 8%, color-mix(in srgb, var(--action-secondary) 16%, transparent), transparent 22rem),
      linear-gradient(180deg, color-mix(in srgb, var(--text-primary) 3%, var(--background-canvas)), var(--background-canvas));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--text-primary) 10%, transparent),
      0 18px 0 -14px color-mix(in srgb, var(--action-secondary) 24%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--text-primary) 9%, transparent),
      0 28px 80px color-mix(in srgb, var(--background-canvas) 36%, transparent);
  }

  .product-design-aquacore {
    border-radius: 1.75rem;
    background:
      radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--action-secondary) 22%, transparent), transparent 20rem),
      radial-gradient(ellipse at 80% 100%, color-mix(in srgb, var(--action-primary) 16%, transparent), transparent 24rem),
      repeating-radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--action-secondary) 5%, transparent) 0 1px, transparent 1px 24px),
      linear-gradient(180deg, color-mix(in srgb, var(--surface-panel) 82%, transparent), var(--background-canvas));
  }

  .product-layout-sidebar-workbench {
    grid-template-columns: minmax(21rem, 27rem) minmax(0, 1fr);
  }

  .product-layout-inspector-right {
    grid-template-columns: minmax(10rem, 13rem) minmax(0, 1fr) minmax(20rem, 25rem);
  }

  .product-layout-right-sidebar {
    grid-template-columns: minmax(0, 1fr) minmax(20rem, 25rem);
  }

  .sample-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--surface-raised) 94%, transparent), var(--background-canvas)),
      repeating-linear-gradient(135deg, color-mix(in srgb, white 2.5%, transparent) 0 1px, transparent 1px 8px);
    border-right: 1px solid var(--soft-border);
    min-width: 0;
    overflow: auto;
  }

  .product-layout-sidebar-workbench .sample-sidebar {
    gap: 0;
  }

  .product-layout-sidebar-workbench .sample-sidebar :global(.control-panel) {
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    clip-path: none;
    padding: 0;
  }

  .brand-mark {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    border-radius: 0.45rem;
    background:
      radial-gradient(circle at 72% 12%, var(--accent-signal), transparent 42%),
      linear-gradient(135deg, var(--action-secondary), var(--action-primary-hover));
    color: color-mix(in srgb, var(--background-canvas) 88%, black);
    font-weight: 900;
    letter-spacing: -0.08em;
    box-shadow: 0 0 26px color-mix(in srgb, var(--action-secondary) 28%, transparent);
  }

  nav {
    display: grid;
    gap: 0.45rem;
  }

  a {
    border: 1px solid transparent;
    border-radius: 0.35rem;
    padding: 0.62rem 0.7rem;
    color: var(--muted);
    text-decoration: none;
    font-family: var(--font-accent, Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  }

  a.active,
  a:hover {
    border-color: var(--border-focus-alpha);
    background: var(--selected-fill);
    color: var(--text-on-primary-action);
    box-shadow: inset 4px 0 0 color-mix(in srgb, var(--action-primary-hover) 85%, transparent), inset 0 0 24px color-mix(in srgb, var(--action-primary) 12%, transparent);
  }

  .sidebar-callout {
    margin-top: auto;
    display: grid;
    gap: 0.2rem;
    border: 1px solid var(--soft-border);
    border-radius: 0.45rem;
    padding: 0.8rem;
    background: color-mix(in srgb, var(--action-secondary) 10%, var(--background-canvas));
    box-shadow: inset 0 1px 0 color-mix(in srgb, white 4%, transparent);
  }

  .sidebar-callout span,
  .hero-card span,
  .metric-card span,
  .metric-card small {
    color: var(--muted);
  }

  .sample-main {
    min-width: 0;
    display: grid;
    gap: 1rem;
    align-content: start;
    padding: 1rem;
  }

  .command-tooling {
    min-width: 0;
  }

  .product-layout-command-deck .sample-topbar {
    position: sticky;
    top: 0;
    z-index: 2;
    border: 1px solid var(--border-subtle-alpha);
    border-radius: 0.45rem;
    padding: 0.75rem;
    background:
      radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--action-secondary) 14%, transparent), transparent 16rem),
      color-mix(in srgb, var(--background-canvas) 88%, var(--surface-panel));
    clip-path: var(--cut-corners);
    box-shadow:
      0 14px 30px color-mix(in srgb, black 28%, transparent),
      inset 0 1px 0 color-mix(in srgb, white 3.5%, transparent);
  }

  .product-layout-command-deck .search-field input {
    font-size: 1rem;
    padding-block: 0.72rem;
  }

  .product-layout-command-deck .command-tooling :global(.control-panel) {
    grid-template-columns: repeat(4, minmax(13rem, 1fr));
  }

  .product-layout-command-deck .command-tooling :global(.token-group),
  .product-layout-command-deck .command-tooling :global(.theme-actions),
  .product-layout-command-deck .command-tooling :global(.theme-io) {
    grid-column: span 2;
  }

  .sample-inspector {
    min-width: 0;
    padding: 1rem;
    border-left: 1px solid var(--soft-border);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--surface-raised) 94%, transparent), var(--background-canvas)),
      repeating-linear-gradient(135deg, color-mix(in srgb, white 2.5%, transparent) 0 1px, transparent 1px 8px);
    overflow: auto;
  }

  .sample-inspector :global(.control-panel) {
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    clip-path: none;
    padding: 0;
  }

  .sample-topbar,
  .card-heading,
  .hero-pills {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .sample-topbar,
  .card-heading {
    justify-content: space-between;
  }

  .font-search-row {
    display: flex;
    align-items: end;
    gap: 0.45rem;
  }

  .clear-button {
    flex: 0 0 auto;
    padding: 0.58rem 0.7rem;
    font-size: 0.75rem;
  }

  .topbar-note {
    display: grid;
    gap: 0.1rem;
  }

  .topbar-note span {
    color: var(--action-primary-hover);
    font-family: var(--font-accent, Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .topbar-note strong {
    color: var(--text-primary);
    font-family: var(--font-display, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 1rem;
  }

  .search-field {
    flex: 1;
    display: grid;
    gap: 0.25rem;
    color: var(--border-accent);
    font-family: var(--font-accent, Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  input {
    border: 1px solid color-mix(in srgb, var(--border-subtle) 24%, transparent);
    border-radius: 0.35rem;
    background: linear-gradient(180deg, color-mix(in srgb, var(--surface-inset) 96%, transparent), color-mix(in srgb, var(--surface-panel) 96%, transparent));
    color: var(--text-primary);
    font: inherit;
    padding: 0.58rem 0.7rem;
    box-shadow:
      inset 0 0 18px color-mix(in srgb, black 38%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 2%, transparent);
  }

  button {
    border: 1px solid color-mix(in srgb, var(--border-subtle) 30%, transparent);
    border-radius: 0.35rem;
    background:
      radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--action-secondary) 18%, transparent), transparent 58%),
      linear-gradient(180deg, color-mix(in srgb, var(--surface-neutral) 72%, transparent), color-mix(in srgb, var(--surface-inset) 96%, transparent));
    color: var(--border-accent);
    cursor: pointer;
    font-family: var(--font-accent, Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    padding: 0.58rem 0.8rem;
    box-shadow:
      inset 0 0 16px color-mix(in srgb, var(--action-secondary) 6%, transparent),
      inset 0 -1px 0 color-mix(in srgb, white 5%, transparent);
    transition:
      border-color var(--transition-speed) ease,
      box-shadow var(--transition-speed) ease,
      transform var(--transition-speed) ease,
      filter var(--transition-speed) ease;
  }

  button:hover {
    border-color: var(--border-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--action-secondary) 16%, transparent);
  }

  .hero-card,
  .metric-card,
  .component-card {
    border: 1px solid var(--border-subtle-alpha);
    border-radius: 0.45rem;
    background: var(--panel-bg);
    clip-path: var(--cut-corners);
    box-shadow:
      0 18px 38px color-mix(in srgb, black 28%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 3.5%, transparent),
      inset 0 0 20px color-mix(in srgb, var(--action-secondary) 5%, transparent);
  }

  .product-design-cloud-spire .hero-card,
  .product-design-cloud-spire .metric-card,
  .product-design-cloud-spire .component-card,
  .product-design-cloud-spire .sidebar-callout,
  .product-design-cloud-spire .sample-topbar,
  .product-design-cloud-spire .sample-sidebar,
  .product-design-cloud-spire .sample-inspector {
    border-radius: 1.2rem;
    clip-path: none;
    background: linear-gradient(180deg, color-mix(in srgb, var(--text-primary) 7%, var(--surface-panel)), color-mix(in srgb, var(--surface-raised) 94%, transparent));
    border-color: color-mix(in srgb, var(--border-accent) 34%, transparent);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--text-primary) 10%, transparent),
      0 18px 0 -14px color-mix(in srgb, var(--action-secondary) 24%, transparent),
      0 26px 54px color-mix(in srgb, var(--background-canvas) 38%, transparent),
      0 3px 0 color-mix(in srgb, var(--text-primary) 8%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--text-primary) 10%, transparent),
      inset 0 -1px 0 color-mix(in srgb, var(--border-accent) 10%, transparent);
    transform: translateY(-4px);
  }

  .product-design-cloud-spire .metric-card:nth-child(2),
  .product-design-cloud-spire .component-card:nth-child(even) {
    transform: translateY(-8px);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--text-primary) 12%, transparent),
      0 22px 0 -16px color-mix(in srgb, var(--action-secondary) 28%, transparent),
      0 34px 68px color-mix(in srgb, var(--background-canvas) 44%, transparent),
      0 4px 0 color-mix(in srgb, var(--text-primary) 9%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--text-primary) 12%, transparent),
      inset 0 -1px 0 color-mix(in srgb, var(--border-accent) 12%, transparent);
  }

  .product-design-aquacore .hero-card,
  .product-design-aquacore .metric-card,
  .product-design-aquacore .component-card,
  .product-design-aquacore .sidebar-callout,
  .product-design-aquacore .sample-topbar,
  .product-design-aquacore .sample-sidebar,
  .product-design-aquacore .sample-inspector {
    border-radius: 1.5rem;
    clip-path: none;
    background:
      radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--action-secondary) 14%, transparent), transparent 70%),
      radial-gradient(ellipse at 80% 100%, color-mix(in srgb, var(--action-primary) 10%, transparent), transparent 70%),
      linear-gradient(180deg, color-mix(in srgb, var(--surface-raised) 84%, transparent), color-mix(in srgb, var(--background-canvas) 90%, transparent));
    box-shadow:
      0 22px 60px color-mix(in srgb, var(--action-secondary) 14%, transparent),
      inset 0 16px 34px color-mix(in srgb, var(--text-primary) 4%, transparent),
      inset 0 -22px 42px color-mix(in srgb, var(--action-secondary) 8%, transparent);
  }

  .product-design-cloud-spire button,
  .product-design-aquacore button {
    border-radius: 999px;
    clip-path: none;
    text-transform: none;
  }

  .product-design-cloud-spire button {
    box-shadow:
      0 12px 26px color-mix(in srgb, var(--background-canvas) 30%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--text-primary) 10%, transparent);
  }

  .product-design-aquacore button {
    background:
      radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--action-secondary) 22%, transparent), transparent 64%),
      linear-gradient(180deg, color-mix(in srgb, var(--surface-raised) 82%, transparent), color-mix(in srgb, var(--background-canvas) 90%, transparent));
    box-shadow:
      inset 0 12px 24px color-mix(in srgb, var(--text-primary) 4%, transparent),
      inset 0 -14px 30px color-mix(in srgb, var(--action-secondary) 8%, transparent);
  }

  .hero-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.1rem;
    background:
      radial-gradient(circle at top right, color-mix(in srgb, var(--accent-signal) 17%, transparent), transparent 16rem),
      radial-gradient(circle at bottom left, color-mix(in srgb, var(--action-secondary) 13%, transparent), transparent 18rem),
      linear-gradient(135deg, color-mix(in srgb, var(--surface-raised) 92%, transparent), color-mix(in srgb, var(--background-canvas) 98%, transparent));
  }

  .hero-card::before {
    content: "";
    position: absolute;
    inset: auto 0 -42% 0;
    z-index: -1;
    height: 78%;
    background:
      linear-gradient(color-mix(in srgb, var(--action-secondary) 11%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--action-secondary) 9%, transparent) 1px, transparent 1px),
      repeating-linear-gradient(0deg, color-mix(in srgb, white 3.5%, transparent) 0 1px, transparent 1px 5px);
    background-size: 44px 44px, 44px 44px, 100% 5px;
    opacity: 0.65;
    transform: perspective(520px) rotateX(58deg) scale(1.45);
    transform-origin: center bottom;
  }

  .hero-card p,
  .hero-card h3,
  .card-heading h3 {
    margin: 0;
  }

  .hero-card p {
    color: var(--action-primary-hover);
    font-family: var(--font-accent, Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .hero-card h3 {
    font-family: var(--font-display, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    letter-spacing: -0.06em;
    color: var(--text-primary);
    text-shadow: 0 0 18px color-mix(in srgb, var(--action-secondary) 18%, transparent);
  }

  .card-heading h3 {
    font-family: var(--font-display, Inter, ui-sans-serif, system-ui, sans-serif);
  }

  .hero-pills {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .hero-pills span,
  .badge,
  .status-pill {
    border: 1px solid var(--soft-border);
    border-radius: 0.25rem;
    padding: 0.25rem 0.55rem;
    background: color-mix(in srgb, var(--action-secondary) 14%, transparent);
    color: var(--border-accent);
    font-family: var(--font-accent, Rajdhani, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .metric-card {
    display: grid;
    gap: 0.2rem;
    padding: 0.9rem;
  }

  .metric-card strong {
    color: var(--action-primary-hover);
    font-size: 1.7rem;
    letter-spacing: -0.05em;
  }

  .component-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .component-card {
    min-width: 0;
    display: grid;
    gap: 0.8rem;
    align-content: start;
    padding: 0.95rem;
  }

  .table-card {
    grid-column: span 2;
  }

  .notification-card {
    grid-column: span 2;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .treatment-options {
    display: grid;
    gap: 0.55rem;
  }

  .treatment-option {
    display: grid;
    gap: 0.2rem;
    width: 100%;
    text-align: left;
  }

  .treatment-option strong {
    color: inherit;
  }

  .treatment-option span {
    color: var(--muted);
    font-family: var(--font-body, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.35;
    text-transform: none;
  }

  .treatment-option.active {
    background: var(--selected-fill);
    border-color: var(--border-focus-alpha);
    color: var(--text-on-primary-action);
    box-shadow:
      inset 4px 0 0 color-mix(in srgb, var(--action-primary-hover) 85%, transparent),
      inset 0 0 18px color-mix(in srgb, var(--action-primary) 18%, transparent),
      0 0 28px color-mix(in srgb, var(--action-primary) 16%, transparent);
  }

  .treatment-option.active span {
    color: color-mix(in srgb, var(--text-on-primary-action) 82%, var(--text-primary));
  }

  .font-list {
    display: grid;
    gap: 0.55rem;
    max-height: 22rem;
    overflow: auto;
    padding-right: 0.15rem;
  }

  .font-option {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.65rem;
    align-items: center;
    width: 100%;
    text-align: left;
    letter-spacing: 0;
    text-transform: none;
  }

  .font-option > span:last-child {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .font-specimen {
    display: grid;
    place-items: center;
    width: 2.7rem;
    aspect-ratio: 1;
    border: 1px solid var(--soft-border);
    border-radius: 0.45rem;
    background: color-mix(in srgb, var(--action-secondary) 12%, var(--surface-inset));
    color: var(--action-primary-hover);
    font-family: var(--font-preview, var(--font-body));
    font-size: 1.15rem;
    font-weight: 800;
  }

  .font-option strong {
    color: inherit;
    font-family: var(--font-preview, var(--font-body));
    font-size: 0.95rem;
  }

  .font-option em,
  .font-option small {
    color: var(--muted);
    font-family: var(--font-body, Inter, ui-sans-serif, system-ui, sans-serif);
    font-size: 0.75rem;
    font-style: normal;
    line-height: 1.3;
  }

  .font-option.active {
    background: var(--selected-fill);
    border-color: var(--border-focus-alpha);
    color: var(--text-on-primary-action);
  }

  .font-option.active .font-specimen {
    border-color: color-mix(in srgb, var(--text-on-primary-action) 46%, transparent);
    background: color-mix(in srgb, var(--action-primary) 24%, transparent);
    color: var(--text-on-primary-action);
  }

  .font-option.active em,
  .font-option.active small {
    color: color-mix(in srgb, var(--text-on-primary-action) 78%, var(--text-primary));
  }

  .empty-state {
    margin: 0;
    border: 1px dashed var(--soft-border);
    border-radius: 0.45rem;
    padding: 0.85rem;
    color: var(--muted);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 0.8rem;
  }

  th,
  td {
    border-bottom: 1px solid var(--soft-border);
    padding: 0.65rem;
    text-align: left;
  }

  th {
    color: var(--muted);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .toast {
    display: grid;
    gap: 0.15rem;
    border: 1px solid var(--soft-border);
    border-left: 4px solid var(--action-secondary);
    border-radius: 0.35rem;
    padding: 0.8rem;
    background: linear-gradient(180deg, color-mix(in srgb, var(--surface-panel) 82%, transparent), color-mix(in srgb, var(--background-canvas) 92%, transparent));
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  }

  .toast.success {
    border-left-color: var(--state-success);
  }

  .toast.warning {
    border-left-color: var(--action-primary-hover);
  }

  .toast span {
    color: var(--muted);
    font-size: 0.85rem;
  }

  :global(.layout-command-deck) .product-shell {
    grid-template-columns: 1fr;
  }

  :global(.layout-command-deck) .sample-sidebar {
    flex-direction: row;
    align-items: center;
    border-right: 0;
    border-bottom: 1px solid var(--soft-border);
  }

  :global(.layout-command-deck) nav {
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    overflow-x: auto;
  }

  :global(.layout-inspector-right) .component-grid,
  :global(.layout-right-sidebar) .component-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  :global(.layout-inspector-right) .table-card,
  :global(.layout-right-sidebar) .table-card {
    grid-column: span 2;
  }

  :global(.layout-inspector-right) .notification-card,
  :global(.layout-right-sidebar) .notification-card {
    grid-column: span 1;
    grid-template-columns: 1fr;
  }

  @media (max-width: 900px) {
    .product-shell,
    :global(.layout-command-deck) .product-shell {
      grid-template-columns: 1fr;
    }

    .sample-sidebar,
    :global(.layout-command-deck) .sample-sidebar {
      flex-direction: row;
      align-items: center;
      border-right: 0;
      border-bottom: 1px solid var(--soft-border);
      overflow-x: auto;
    }

    .product-layout-sidebar-workbench .sample-sidebar {
      flex-direction: column;
      align-items: stretch;
      overflow-x: visible;
    }

    .product-layout-inspector-right .sample-inspector,
    .product-layout-right-sidebar .sample-inspector {
      border-left: 0;
      border-top: 1px solid var(--soft-border);
    }

    .product-layout-command-deck .command-tooling :global(.control-panel) {
      grid-template-columns: repeat(2, minmax(13rem, 1fr));
    }

    nav,
    :global(.layout-command-deck) nav {
      grid-auto-flow: column;
      grid-auto-columns: max-content;
    }

    .metric-grid,
    .component-grid,
    :global(.layout-inspector-right) .component-grid,
    :global(.layout-right-sidebar) .component-grid {
      grid-template-columns: 1fr;
    }

    .table-card,
    .notification-card,
    :global(.layout-inspector-right) .table-card,
    :global(.layout-inspector-right) .notification-card,
    :global(.layout-right-sidebar) .table-card,
    :global(.layout-right-sidebar) .notification-card {
      grid-column: auto;
    }

    .notification-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .sample-topbar,
    .hero-card {
      align-items: stretch;
      flex-direction: column;
    }

    .product-layout-command-deck .command-tooling :global(.control-panel) {
      grid-template-columns: 1fr;
    }

    .product-layout-command-deck .command-tooling :global(.token-group),
    .product-layout-command-deck .command-tooling :global(.theme-actions),
    .product-layout-command-deck .command-tooling :global(.theme-io) {
      grid-column: auto;
    }
  }
</style>
