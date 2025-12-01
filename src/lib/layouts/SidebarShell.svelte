<script lang="ts">
  export let name = "Sidebar Shell";
</script>

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
    background: var(--bg);
    color: var(--fg);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--border);
    display: grid;
    grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
    gap: 1rem;
    min-height: 260px;
  }

  .sidebar {
    border-radius: 0.75rem;
    background: var(--bg-alt);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: 1px dashed var(--border);
  }

  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    background: var(--accent);
    margin-bottom: 0.5rem;
  }

  .nav-item {
    height: 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bg) 70%, var(--accent) 30%);
    opacity: 0.25;
  }

  .main {
    border-radius: 0.75rem;
    background: var(--bg-alt);
    border: 1px dashed var(--border);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hero .title {
    height: 1rem;
    width: 40%;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bg) 60%, var(--accent) 40%);
    opacity: 0.3;
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
    background: color-mix(in srgb, var(--bg) 70%, var(--accent) 30%);
    opacity: 0.25;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .line {
    height: 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bg) 80%, var(--accent) 20%);
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    .layout-root {
      grid-template-columns: 1fr;
    }
  }
</style>
