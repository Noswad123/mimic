export type LayoutDefinition = {
  id: string;
  name: string;
  description: string;
};

export const layouts: LayoutDefinition[] = [
  {
    id: "sidebar-workbench",
    name: "Sidebar Workbench",
    description: "Controls live on the left while the app specimen fills the main workbench."
  },
  {
    id: "command-deck",
    name: "Command Deck",
    description: "Controls become a top command deck and the specimen turns into a wide dashboard."
  },
  {
    id: "inspector-right",
    name: "Inspector Right",
    description: "The specimen leads, with theme controls acting like a right-side inspector."
  }
];
