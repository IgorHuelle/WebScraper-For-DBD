type URL = string

export interface UrlsData {
  killers: RoleUrls;
  survivors: RoleUrls;
  other: OtherUrls;
}

export interface RoleUrls {
  characters: URL;
  perks: URL;
}

export interface OtherUrls {
  baseLink: URL
  patchNotes: URL
}
