import type { UrlsData } from "@appTypes/URLs.js";

import { useJSON } from "@utils/useJSON.js";

export const useURLsData = (): UrlsData => {
  return useJSON<UrlsData>("src/data/urls.json");
};