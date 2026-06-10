import type { CharactersData } from "@appTypes/Characters.js";

import { useDOM } from "./useDOM.js";
import { useURLsData } from "./useURLsData.js";

export const useCharacters = async (): Promise<{ characters: CharactersData }> => {
  const urls = useURLsData();

  const charactersRawHTML = {
    killers: await useDOM(urls.killers.characters),
    survivors: await useDOM(urls.survivors.characters),
  };

  const characters: CharactersData = {
    killers: [],
    survivors: [],
  };

  for (const [role, dom] of Object.entries(charactersRawHTML)) {
    const container = dom.querySelector('div[style*="color: #fff;"]');
    if (!container) {
      console.warn(`No portrait container found for role: ${role}`);
      continue;
    }

    const portraits = [...container.children];

    for (const portrait of portraits) {
      const charImgUrl = portrait.querySelector<HTMLImageElement>(".charPortraitImage img")?.src;
      const fullName = portrait.querySelector<HTMLAnchorElement>(".charPortraitImage a")?.title;
      const charName = role === "killers" ? fullName?.replace(/^The\s+/, "") : fullName;

      if (!charName) {
        console.warn("Portrait skipped — no character name found.");
        continue;
      }

      characters[role as keyof CharactersData].push({
        name: charName,
        portraitUrl: urls.other.baseLink + (charImgUrl ?? ""),
      });
    }
  }

  return { characters };
};