export interface ProfilesData {
  killers: Profile[]
  survivors: Profile[]
}

export interface Profile {
  name: string
  profileUrl: string
}