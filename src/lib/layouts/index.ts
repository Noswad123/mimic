export type LayoutDefinition = {
  id: string;
  name: string;
  description: string;
};

export const layouts: LayoutDefinition[] = [
  {
    id: "sidebar-workbench",
    name: "Left Sidebar",
    description: "Theme tooling is embedded in the app's left sidebar beside the live specimen."
  },
  {
    id: "command-deck",
    name: "Command Deck",
    description: "Theme tooling becomes an integrated top command deck above the wide specimen."
  },
  {
    id: "inspector-right",
    name: "Left and Right Sidebars",
    description: "Navigation stays on the left while theme tooling is embedded in a right sidebar."
  },
  {
    id: "right-sidebar",
    name: "Right Sidebar",
    description: "The app content leads with theme tooling embedded only in a right sidebar."
  }
];
