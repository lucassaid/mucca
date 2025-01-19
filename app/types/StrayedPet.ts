export type StrayedPetKind = 'dog' | 'cat'

export interface StrayedPetPost {
  kind: StrayedPetKind
  title: string
  image: string
  description: string
  date: Date
  tags: string[]
  contact: string
  location: [number, number]
  postedByOwner: boolean
  reuniteDate: Date | null
}
