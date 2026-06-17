export type DesignLanguageId = "hexware" | "cloud-spire" | "aquacore";

export type DesignLanguageDefinition = {
  id: DesignLanguageId;
  name: string;
  description: string;
};

export const designLanguages: DesignLanguageDefinition[] = [
  {
    id: "hexware",
    name: "Hexware",
    description: "Angular arcane-tech: clipped panels, hot/cold borders, luminous controls, and ritual geometry."
  },
  {
    id: "cloud-spire",
    name: "Cloud Spire",
    description: "Elevated cloud architecture: airy spacing, tall soft panels, pearl highlights, and floating structure."
  },
  {
    id: "aquacore",
    name: "Aquacore",
    description: "Liquid interface core: smooth rounded surfaces, reflective layers, ripple glows, and fluid depth."
  }
];
