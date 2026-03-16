export interface Property {
  id: string
  title: string
  address: string
  city: string
  neighborhood: string
  price: number
  type: "House" | "Condo" | "Townhouse" | "Penthouse"
  beds: number
  baths: number
  sqft: number
  yearBuilt: number
  lotSize: string
  garage: number
  images: string[]
  description: string
  amenities: string[]
  badge?: "Featured" | "New"
  listedDate: string
}

export interface Agent {
  id: string
  name: string
  title: string
  specialization: string
  phone: string
  email: string
  photo: string
  rating: number
  deals: number
  award?: string
  instagram?: string
  featured?: boolean
}

export interface Neighborhood {
  id: string
  name: string
  city: string
  image: string
  propertyCount: number
  avgPrice: number
}

export interface Testimonial {
  id: string
  name: string
  photo: string
  role: string
  quote: string
  rating: number
}

export type PropertyType = "All" | "House" | "Condo" | "Townhouse" | "Penthouse"
export type SortOption = "newest" | "oldest" | "price-asc" | "price-desc"

export interface Filters {
  location: string
  type: PropertyType
  minPrice: number
  maxPrice: number
  beds: number
  baths: number
  sort: SortOption
}
