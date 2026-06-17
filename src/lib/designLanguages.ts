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
    description: "An arcane-tech substrate that hardens the mimic into clipped panels, luminous controls, and ritual geometry."
  },
  {
    id: "cloud-spire",
    name: "Cloud Spire",
    description: "An atmospheric substrate that lifts the mimic into airy spacing, tall soft panels, and floating structure."
  },
  {
    id: "aquacore",
    name: "Aquacore",
    description: "A liquid-memory substrate that softens the mimic into rounded surfaces, reflective layers, and fluid depth."
  }
];
