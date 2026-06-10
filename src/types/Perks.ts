export interface PerksData {
  killers: Perk[];
  survivors: Perk[];
}

export interface Perk {
  name: string;
  iconUrl: string;
  description: string;
  obtainment: string;
}
