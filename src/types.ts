export interface Review {
  categories: string[]
  date: string
  gender: string
  language: string
  reviewer: string
  score: number
  sentiment: string
  source: string
  text: string
}

export interface Filter {
  parameter: string
  text: string
  value: number
}
export interface RootState {
  loading: boolean
  error: any
  reviews: Review[]
  openedFilter: string
  filters: Filter[]
  pagination: {
    itemsPerPage: number
    page: number
  }
}
