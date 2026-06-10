export interface UrlsData {
  killers: RoleUrls;
  survivors: RoleUrls;
  other: OtherUrls;
}

export interface RoleUrls {
  characters: string;
  perks: string;
}

export interface OtherUrls {
  baseLink: string
}
