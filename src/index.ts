import { useConstructScrapeJSON } from "@modules/useConstructScrapeJSON.js";

console.log("[🔁] Dowloading...");
const scrapePath = await useConstructScrapeJSON();
console.log(`
  [✅] Scrape is ready!\n
    ╰-> Data saved under: ${scrapePath}
`);