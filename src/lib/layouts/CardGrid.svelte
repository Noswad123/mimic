<div class="layout-root">
  <header class="header">
    <div class="logo-circle"></div>
    <div class="title-block">
      <div class="title"></div>
      <div class="subtitle"></div>
    </div>
  </header>

  <main class="content">
    {#each Array(6) as _, i}
      <article class="card">
        <div class="card-header"></div>
        <div class="card-body"></div>
        <div class="card-footer"></div>
      </article>
    {/each}
  </main>
</div>

<style>
  .layout-root {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background:
      radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--action-primary) 12%, transparent), transparent 16rem),
      radial-gradient(circle at 20% 90%, color-mix(in srgb, var(--action-secondary) 10%, transparent), transparent 18rem),
      var(--background-canvas);
    color: var(--text-primary);
    border-radius: 0.75rem;
    padding: 1.5rem;
    border: 1px solid var(--soft-border);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-circle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    background:
      radial-gradient(circle at 70% 20%, var(--accent-signal), transparent 42%),
      linear-gradient(135deg, var(--action-secondary), var(--action-primary-hover));
    opacity: 0.9;
  }

  .title-block {
    flex: 1;
  }

  .title,
  .subtitle {
    height: 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-secondary) 20%, var(--background-canvas));
  }

  .title {
    width: 40%;
    margin-bottom: 0.4rem;
  }

  .subtitle {
    width: 25%;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .card {
    border-radius: 0.75rem;
    background: var(--panel-bg);
    border: 1px solid var(--soft-border);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-header,
  .card-body,
  .card-footer {
    border-radius: 0.5rem;
    background: color-mix(in srgb, var(--action-primary-hover) 34%, var(--background-canvas));
    opacity: 0.36;
  }

  .card-header {
    height: 0.75rem;
    width: 60%;
  }

  .card-body {
    height: 2rem;
    width: 100%;
  }

  .card-footer {
    height: 0.6rem;
    width: 40%;
  }

  @media (max-width: 768px) {
    .content {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
</style>
