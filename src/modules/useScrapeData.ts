import type { PatchNotesData } from "@appTypes/PatchNotes.js";
import type { CharactersData } from "@appTypes/Characters.js";
import type { PerksData } from "@appTypes/Perks.js";

import { usePatchNotes } from "./usePatchNotes.js";
import { useCharacters } from "./useCharacters.js";
import { usePerks } from "./usePerks.js";

export interface ScrapeResult {
  characters: CharactersData;
  perks: PerksData;
  patchNotes: PatchNotesData
}

export const useScrapeData = async (): Promise<ScrapeResult> => {
  const [{ characters }, { perks }, { patchNotes }] = await Promise.all([
    useCharacters(),
    usePerks(),
    usePatchNotes(),
  ]);

  return { characters, perks, patchNotes };
};
