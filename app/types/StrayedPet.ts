export type StrayedPetKind = 'dog' | 'cat'

export interface StrayedPetPost {
  kind: StrayedPetKind
  title: string
  image: string
  description: string
  createdAt: Date
  tags: string[]
  phone: string
  location: {
    type: 'Point'
    coordinates: [longitude: number, latitude: number]
  }
  reuniteDate: Date | null
}
