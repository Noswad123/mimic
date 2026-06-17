<div class="layout-root">
  <aside class="sidebar">
    <div class="avatar"></div>
    {#each Array(6) as _, i}
      <div class="nav-item"></div>
    {/each}
  </aside>
  <section class="main">
    <div class="hero">
      <div class="title"></div>
      <div class="meta-row">
        <div class="meta"></div>
        <div class="meta"></div>
      </div>
    </div>
    <div class="body">
      {#each Array(4) as _, i}
        <div class="line"></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .layout-root {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background:
      radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--pink-signal) 10%, transparent), transparent 14rem),
      var(--bg);
    color: var(--fg);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--soft-border);
    display: grid;
    grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
    gap: 1rem;
    min-height: 260px;
  }

  .sidebar {
    border-radius: 0.75rem;
    background: var(--panel-bg);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: 1px solid var(--soft-border);
  }

  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    background:
      radial-gradient(circle at 70% 20%, var(--pink-signal), transparent 42%),
      linear-gradient(135deg, var(--frost), var(--accent-hot));
    margin-bottom: 0.5rem;
  }

  .nav-item {
    height: 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--frost) 42%, var(--bg));
    opacity: 0.38;
  }

  .main {
    border-radius: 0.75rem;
    background: var(--panel-bg);
    border: 1px solid var(--soft-border);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hero .title {
    height: 1rem;
    width: 40%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--accent), var(--accent-hot));
    opacity: 0.48;
  }

  .meta-row {
    margin-top: 0.6rem;
    display: flex;
    gap: 0.5rem;
  }

  .meta {
    height: 0.6rem;
    width: 20%;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border) 36%, var(--bg));
    opacity: 0.4;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .line {
    height: 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--fg-muted) 22%, var(--bg));
    opacity: 0.55;
  }

  @media (max-width: 768px) {
    .layout-root {
      grid-template-columns: 1fr;
    }
  }
</style>
