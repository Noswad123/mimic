import CardGrid from "./CardGrid.svelte";
import SidebarShell from "./SidebarShell.svelte";

export type LayoutDefinition = {
  id: string;
  name: string;
  component: typeof CardGrid;
};

export const layouts: LayoutDefinition[] = [
  { id: "card-grid", name: "Card Grid", component: CardGrid },
  { id: "sidebar-shell", name: "Sidebar Shell", component: SidebarShell }
];
