export interface Reward {
  description: string
  id: string
  image: string
  name: string
}

export interface Rewards {
  count: number
  next: URL | null
  previous: string | null
  results: Reward[]
}
