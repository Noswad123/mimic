export type SiteTreatmentId = "clear" | "capture-film" | "resonance";

export type SiteTreatmentDefinition = {
  id: SiteTreatmentId;
  name: string;
  description: string;
};

export const siteTreatments: SiteTreatmentDefinition[] = [
  {
    id: "clear",
    name: "Clear",
    description: "No additional lab field. The current scheme and substrate show through directly."
  },
  {
    id: "capture-film",
    name: "Capture Film",
    description: "A theme-tinted observation film settles over the whole specimen."
  },
  {
    id: "resonance",
    name: "Resonance",
    description: "The active imbuement pushes harder through borders, shadows, and surface glows."
  }
];
