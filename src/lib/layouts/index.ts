export type LayoutDefinition = {
  id: string;
  name: string;
  description: string;
};

export const layouts: LayoutDefinition[] = [
  {
    id: "sidebar-workbench",
    name: "Left Sidebar",
    description: "A layout form that tunes the mimic into a left-side control rail with the main display held to the right."
  },
  {
    id: "command-deck",
    name: "Command Deck",
    description: "A layout form that raises command and search behavior to the top before the mimic spreads into a wide display."
  },
  {
    id: "inspector-right",
    name: "Left and Right Sidebars",
    description: "A layout form that brackets the mimic between twin sidebars, leaving the main display stabilized in the center."
  },
  {
    id: "right-sidebar",
    name: "Right Sidebar",
    description: "A layout form that lets the main display lead while controls gather along the right edge."
  }
];
