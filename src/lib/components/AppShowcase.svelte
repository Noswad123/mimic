<script lang="ts">
  const navItems = ["Dashboard", "Notes", "Automations", "Settings"];
  const metrics = [
    { label: "Active rituals", value: "24", detail: "+6 this week" },
    { label: "Synced notes", value: "1.8k", detail: "98% indexed" },
    { label: "Open tasks", value: "37", detail: "12 due soon" }
  ];
  const tasks = [
    { label: "Review Hexware tokens", state: "Next" },
    { label: "Draft Mind Weaver dashboard", state: "Doing" },
    { label: "Export theme bundle", state: "Done" }
  ];
  const commands = ["Open command palette", "Sync local notes", "Launch floating terminal"];
  const rows = [
    { tool: "Mind Weaver", domain: "Knowledge", status: "Ready" },
    { tool: "Waystone", domain: "Navigation", status: "Linked" },
    { tool: "Djinn", domain: "Aliases", status: "Watching" }
  ];
</script>

<div class="product-shell">
  <aside class="sample-sidebar" aria-label="Sample app navigation">
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
  </aside>

  <section class="sample-main" aria-label="Sample app components">
    <header class="sample-topbar">
      <label class="search-field" for="sample-search">
        <span>Search</span>
        <input id="sample-search" type="search" value="ritual dashboard" />
      </label>
      <div class="topbar-actions">
        <button type="button">Secondary</button>
        <button type="button" class="primary">Summon</button>
      </div>
    </header>

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
      <article class="component-card tasks-card">
        <div class="card-heading">
          <h3>Task list</h3>
          <button type="button">Add</button>
        </div>
        <div class="task-list">
          {#each tasks as task, index}
            <label class="task-item" for={`task-${index}`}>
              <input id={`task-${index}`} type="checkbox" checked={task.state === "Done"} />
              <span>{task.label}</span>
              <em>{task.state}</em>
            </label>
          {/each}
        </div>
      </article>

      <article class="component-card command-card">
        <div class="card-heading">
          <h3>Command palette</h3>
          <kbd>⌘K</kbd>
        </div>
        <div class="command-input">Type a command or true name...</div>
        {#each commands as command}
          <button type="button" class="command-row">{command}</button>
        {/each}
      </article>

      <article class="component-card form-card">
        <div class="card-heading">
          <h3>Settings form</h3>
          <span class="badge">Draft</span>
        </div>
        <label for="sample-name">
          Theme name
          <input id="sample-name" type="text" value="Astral Hexware" />
        </label>
        <label for="sample-domain">
          Domain
          <select id="sample-domain" value="knowledge">
            <option value="knowledge">Knowledge</option>
            <option value="automation">Automation</option>
            <option value="navigation">Navigation</option>
          </select>
        </label>
        <label class="toggle-row" for="sample-toggle">
          <span>Enable glow states</span>
          <input id="sample-toggle" type="checkbox" checked />
        </label>
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
</div>

<style>
  .product-shell {
    min-height: 40rem;
    display: grid;
    grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
    gap: 1rem;
    border: 1px solid var(--soft-border);
    border-radius: 1.1rem;
    background: color-mix(in srgb, var(--bg) 82%, var(--bg-alt));
    overflow: hidden;
  }

  .sample-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: color-mix(in srgb, var(--bg-alt) 72%, var(--bg));
    border-right: 1px solid var(--soft-border);
  }

  .brand-mark {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    border-radius: 1rem;
    background: linear-gradient(135deg, var(--accent), var(--border));
    color: color-mix(in srgb, var(--bg) 88%, black);
    font-weight: 900;
    letter-spacing: -0.08em;
  }

  nav {
    display: grid;
    gap: 0.45rem;
  }

  a {
    border: 1px solid transparent;
    border-radius: 0.8rem;
    padding: 0.62rem 0.7rem;
    color: var(--muted);
    text-decoration: none;
    font-weight: 700;
  }

  a.active,
  a:hover {
    border-color: var(--soft-border);
    background: var(--accent-soft);
    color: var(--fg);
  }

  .sidebar-callout {
    margin-top: auto;
    display: grid;
    gap: 0.2rem;
    border: 1px solid var(--soft-border);
    border-radius: 1rem;
    padding: 0.8rem;
    background: color-mix(in srgb, var(--bg) 54%, transparent);
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

  .sample-topbar,
  .card-heading,
  .topbar-actions,
  .hero-pills {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .sample-topbar,
  .card-heading {
    justify-content: space-between;
  }

  .search-field {
    flex: 1;
    display: grid;
    gap: 0.25rem;
    color: var(--muted);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  input,
  select {
    border: 1px solid var(--soft-border);
    border-radius: 0.75rem;
    background: color-mix(in srgb, var(--bg) 74%, var(--bg-alt));
    color: var(--fg);
    font: inherit;
    padding: 0.58rem 0.7rem;
  }

  button {
    border: 1px solid var(--soft-border);
    border-radius: 0.75rem;
    background: color-mix(in srgb, var(--bg-alt) 78%, var(--bg));
    color: var(--fg);
    cursor: pointer;
    font: inherit;
    font-weight: 800;
    padding: 0.58rem 0.8rem;
  }

  button.primary {
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 56%, var(--border)));
    border-color: color-mix(in srgb, var(--accent) 78%, white 22%);
    color: color-mix(in srgb, var(--bg) 88%, black);
  }

  .hero-card,
  .metric-card,
  .component-card {
    border: 1px solid var(--soft-border);
    border-radius: 1rem;
    background: color-mix(in srgb, var(--bg-alt) 74%, transparent);
  }

  .hero-card {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.1rem;
    background:
      radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 28%, transparent), transparent 18rem),
      color-mix(in srgb, var(--bg-alt) 80%, var(--bg));
  }

  .hero-card p,
  .hero-card h3,
  .card-heading h3 {
    margin: 0;
  }

  .hero-card p {
    color: var(--accent);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .hero-card h3 {
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    letter-spacing: -0.06em;
  }

  .hero-pills {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .hero-pills span,
  .badge,
  .status-pill {
    border: 1px solid var(--soft-border);
    border-radius: 999px;
    padding: 0.25rem 0.55rem;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.75rem;
    font-weight: 800;
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
    color: var(--accent);
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

  .task-list,
  .form-card {
    display: grid;
    gap: 0.65rem;
  }

  .task-item,
  .toggle-row,
  .form-card label {
    display: grid;
    gap: 0.3rem;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .task-item,
  .toggle-row {
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    border: 1px solid color-mix(in srgb, var(--border) 22%, transparent);
    border-radius: 0.8rem;
    padding: 0.55rem;
    background: color-mix(in srgb, var(--bg) 42%, transparent);
  }

  .task-item span {
    color: var(--fg);
  }

  .task-item em {
    color: var(--accent);
    font-size: 0.72rem;
    font-style: normal;
    font-weight: 900;
    text-transform: uppercase;
  }

  .command-input {
    border: 1px solid var(--soft-border);
    border-radius: 0.85rem;
    padding: 0.75rem;
    color: var(--muted);
    background: color-mix(in srgb, var(--bg) 62%, var(--bg-alt));
  }

  .command-row {
    width: 100%;
    text-align: left;
  }

  kbd {
    border: 1px solid var(--soft-border);
    border-radius: 0.45rem;
    padding: 0.2rem 0.42rem;
    background: color-mix(in srgb, var(--bg) 62%, transparent);
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
    border-bottom: 1px solid color-mix(in srgb, var(--border) 22%, transparent);
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
    border-left: 4px solid var(--accent);
    border-radius: 0.85rem;
    padding: 0.8rem;
    background: color-mix(in srgb, var(--bg) 46%, transparent);
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

  :global(.layout-inspector-right) .component-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  :global(.layout-inspector-right) .table-card {
    grid-column: span 2;
  }

  :global(.layout-inspector-right) .notification-card {
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

    nav,
    :global(.layout-command-deck) nav {
      grid-auto-flow: column;
      grid-auto-columns: max-content;
    }

    .metric-grid,
    .component-grid,
    :global(.layout-inspector-right) .component-grid {
      grid-template-columns: 1fr;
    }

    .table-card,
    .notification-card,
    :global(.layout-inspector-right) .table-card,
    :global(.layout-inspector-right) .notification-card {
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

    .topbar-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
