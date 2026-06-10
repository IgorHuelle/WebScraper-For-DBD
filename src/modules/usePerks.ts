import type { Perk, PerksData } from "@appTypes/Perks.js";

import { useCloneNode } from "@utils/useCloneNode.js";
import { useURLsData } from "./useURLsData.js";
import { useDOM } from "./useDOM.js";

// ── Column helpers ────────────────────────────────────────────────────────────

/** Col 0: perk icon thumbnail → full-size URL */
const getIconData = (cell: Element): string => {
  const element = useCloneNode(cell);

  const image = element.querySelector("img");
  const imageSrc = image!.src;
  const imageUrl = imageSrc.substring(0, imageSrc.lastIndexOf("/")).replace("/thumb", "");

  return imageUrl
};

/** Col 1: perk name from the anchor's text content */
const getPerkName = (cell: Element): string => {
  return cell.querySelector("a")?.textContent?.trim() ?? "";
};

/** Col 2: plain-text description, stripping all inline HTML */
const getDescription = (cell: Element): string => {
  const urls = useURLsData();

  const element = useCloneNode(cell);

  const icons = element.querySelectorAll(".iconLink");
  icons.forEach((icon) => icon.remove());

  const links = element.querySelectorAll('a');
  links.forEach((link) => {
    link.classList.add('link');
    link.href = urls.other.baseLink + link.getAttribute('href');
    link.setAttribute("target", "_blank");
  });

  return element.innerHTML;
};

/** Col 3: character name (first anchor) */
const getCharacterData = (cell: Element): string => {
  const charName = cell.querySelector("a")?.textContent?.trim() ?? "";
  return charName
};

// ── Main function ─────────────────────────────────────────────────────────────

export const usePerks = async (): Promise<{ perks: PerksData }> => {
  const urls = useURLsData();

  const perksRawHTML = {
    killers: await useDOM(urls.killers.perks),
    survivors: await useDOM(urls.survivors.perks),
  };

  const perks: PerksData = {
    killers: [],
    survivors: [],
  };

  for (const [role, dom] of Object.entries(perksRawHTML)) {
    // Note: [...].slice(1) used to remove columns header row
    const rows = [...dom.querySelector("table.wikitable tbody")!.querySelectorAll("tr")].slice(1);

    for (const row of rows) {
      const cells = [...row.children];

      if (cells.length < 4) continue;

      const charName = getCharacterData(cells[3]!);
      const perkName = getPerkName(cells[1]!);
      const perkDesc = getDescription(cells[2]!);
      const perkUrl = getIconData(cells[0]!);

      if (!perkName) {
        console.warn("Skipping row — no perk name found.");
        continue;
      }

      const perk: Perk = {
        name: perkName,
        iconUrl: perkUrl ? urls.other.baseLink + perkUrl : "",
        description: perkDesc,
        obtainment: charName || "Bloodweb",
      };

      perks[role as keyof PerksData].push(perk);
    }
  }

  return { perks };
};