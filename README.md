# Mimic
![Mimic](./img/mimic.png)
## What is Mimic?
A web tool for visualizing web layouts with managed, reusable themes.

## Theme management

Mimic now treats palettes as themes:

- Start from built-in Hexware themes: `Astral Hexware`, `Ember Hexware`, `Frost Hexware`, and `Verdant Hexware`.
- Apply themes to the entire Mimic app shell, not only an isolated preview card.
- Edit semantic tokens: background, surface, text, accent, and border.
- Switch whole-app layouts to see how the same components behave in different interface structures.
- Save edits as custom themes or update existing custom themes.
- Duplicate and delete custom themes.
- Import/export custom themes as JSON for reuse in new projects.

Hexware follows the Jamal Arcana naming pattern: the base substrate is `Hexware`, and the leading word is the enchantment, mood, domain, or elemental attribute imbued into it.

Custom themes are stored in browser `localStorage` under `mimic.themes.v1`.
