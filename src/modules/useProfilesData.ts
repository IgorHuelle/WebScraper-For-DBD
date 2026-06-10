import type { ProfilesData } from "@appTypes/Profiles.js";

import { useJSON } from "@utils/useJSON.js"

export const useProfilesData = (): ProfilesData => {
  return useJSON<ProfilesData>("src/data/profiles.json");
}