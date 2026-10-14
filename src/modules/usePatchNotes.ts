import type { PatchNotesData } from "@appTypes/PatchNotes.js";

import { useURLsData } from "./useURLsData.js";
import { useDOM } from "./useDOM.js";

// ── Patch Notes helpers ────────────────────────────────────────────────────────

const getNewestPatchNumber = (tabber: Element): string => {
  // :scope > section.tabber__section > article.tabber__panel:first-of-type header.tabber__header nav.tabber__tabs a.tabber__tab:first-of-type
  const anchor = tabber.querySelector<HTMLAnchorElement>(
    ":scope > section.tabber__section > article.tabber__panel:first-of-type header.tabber__header nav.tabber__tabs a.tabber__tab:first-of-type"
  ) ?? tabber.querySelector<HTMLAnchorElement>(
    "section.tabber__section > article.tabber__panel:first-of-type header.tabber__header nav.tabber__tabs a:first-of-type"
  );

  return anchor?.textContent?.trim() ?? "";
};

// ── Main function ─────────────────────────────────────────────────────────────

export const usePatchNotes = async (): Promise<{ patchNotes: PatchNotesData }> => {
  const urls = useURLsData();

  const patchNotesRawHTML = {
    patchNotes: await useDOM(urls.other.patchNotes),
  };

  const patchNotes: PatchNotesData = {
    patchNumber: "",
  };

  for (const [key, dom] of Object.entries(patchNotesRawHTML)) {
    const tabber = dom.querySelector(".mw-content-ltr > div.tabber") ?? dom.querySelector(".tabber");
    if (!tabber) {
      console.warn(`No patch notes tabber found for: ${key}`);
      continue;
    }

    const patchNumber = getNewestPatchNumber(tabber);
    if (!patchNumber) {
      console.warn("Failed to extract newest patch number from tabber.");
      continue;
    }

    patchNotes.patchNumber = patchNumber;
  }

  return { patchNotes };
};