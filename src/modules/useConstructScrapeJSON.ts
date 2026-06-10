import path from "node:path";
import fs from "node:fs";
import { useProfilesData } from "./useProfilesData.js";
import { useScrapeData } from "./useScrapeData.js";

export const useConstructScrapeJSON = async () => {
  const { characters, perks } = await useScrapeData();
  const profiles = useProfilesData();

  const json = {
    killers: {
      perks: perks.killers,
      characters: characters.killers,
      profiles: [
        ...profiles.killers.map((profile) => ({ ...profile })),
        ...characters.killers.map((killer) => ({
          ...killer,
          name: `The ${killer.name}`
        }))
      ]
    },
    survivors: {
      perks: perks.survivors,
      characters: characters.survivors,
      profiles: [
        ...profiles.survivors.map((profile) => ({ ...profile }))
      ]
    },
    other: {
      scrapeRequestUNIX: Math.floor(Date.now() / 1000)
    }
  }

  const output = JSON.stringify(json, null, 2);
  const outPath = path.resolve(process.cwd(), "scrape.json");

  fs.writeFileSync(outPath, output, "utf-8");

  return outPath
}