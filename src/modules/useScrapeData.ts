import type { CharactersData } from "@appTypes/Characters.js";
import type { PerksData } from "@appTypes/Perks.js";

import { useCharacters } from "./useCharacters.js";
import { usePerks } from "./usePerks.js";

export interface ScrapeResult {
  characters: CharactersData;
  perks: PerksData;
}

export const useScrapeData = async (): Promise<ScrapeResult> => {
  const [{ characters }, { perks }] = await Promise.all([
    useCharacters(),
    usePerks(),
  ]);

  return { characters, perks };
};
