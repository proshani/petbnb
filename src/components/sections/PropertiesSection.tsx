"use client"

import { useState } from "react"
import type { Property, Filters, PropertyType, SortOption } from "@/types/realestate"
import PropertyCard from "@/components/PropertyCard"

interface PropertiesSectionProps {
  properties: Property[]
  totalCount: number
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onSelectProperty: (p: Property) => void
}

const typeTabs: PropertyType[] = ["All", "House", "Condo", "Townhouse", "Penthouse"]

export default function PropertiesSection({
  properties,
  totalCount,
  filters,
  onFiltersChange,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}: PropertiesSectionProps) {
  const [showMore, setShowMore] = useState(false)
  const displayCount = showMore ? properties.length : 9
  const displayed = properties.slice(0, displayCount)

  const setType = (t: PropertyType) => onFiltersChange({ ...filters, type: t })

  const setSort = (s: SortOption) => onFiltersChange({ ...filters, sort: s })

  const setPriceRange = (val: string) => {
    let min = 0
    let max = 15000000
    if (val === "under1m") {
      max = 1000000
    } else if (val === "1m-2m") {
      min = 1000000
      max = 2000000
    } else if (val === "2m-4m") {
      min = 2000000
      max = 4000000
    } else if (val === "4m-8m") {
      min = 4000000
      max = 8000000
    } else if (val === "over8m") {
      min = 8000000
    }
    onFiltersChange({ ...filters, minPrice: min, maxPrice: max })
  }

  const getPriceValue = () => {
    if (filters.maxPrice <= 1000000) return "under1m"
    if (filters.minPrice === 1000000 && filters.maxPrice === 2000000) return "1m-2m"
    if (filters.minPrice === 2000000 && filters.maxPrice === 4000000) return "2m-4m"
    if (filters.minPrice === 4000000 && filters.maxPrice === 8000000) return "4m-8m"
    if (filters.minPrice === 8000000) return "over8m"
    return "any"
  }

  const setBeds = (val: string) => onFiltersChange({ ...filters, beds: parseInt(val) || 0 })

  const clearFilters = () =>
    onFiltersChange({
      location: "",
      type: "All",
      minPrice: 0,
      maxPrice: 15000000,
      beds: 0,
      baths: 0,
      sort: "newest",
    })

  const hasActiveFilters =
    filters.type !== "All" ||
    filters.location !== "" ||
    filters.beds > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 15000000

  const selectClass =
    "border border-light-gray text-charcoal px-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors bg-white appearance-none pr-8 rounded-none"

  return (
    <section id="properties" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-2">
              Our Listings
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
              Featured Properties
            </h2>
          </div>
          <p className="text-mid-gray text-sm">
            Showing <span className="text-charcoal font-semibold">{properties.length}</span> of{" "}
            <span className="text-charcoal font-semibold">{totalCount}</span> properties
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-3 text-gold hover:text-gold-light text-xs underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {typeTabs.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-5 py-2 text-sm tracking-[0.1em] uppercase font-medium transition-all duration-200 ${
                filters.type === t
                  ? "bg-charcoal text-white"
                  : "bg-white text-mid-gray hover:text-charcoal border border-light-gray"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-3 mb-10 items-center">
          <div className="relative">
            <select
              value={getPriceValue()}
              onChange={(e) => setPriceRange(e.target.value)}
              className={selectClass}
            >
              <option value="any">Any Price</option>
              <option value="under500k">Under $500K</option>
              <option value="500k-1m">$500K – $1M</option>
              <option value="1m-2m">$1M – $2M</option>
              <option value="over2m">Over $2M</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={filters.beds > 0 ? filters.beds.toString() : "0"}
              onChange={(e) => setBeds(e.target.value)}
              className={selectClass}
            >
              <option value="0">Any Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={selectClass}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {filters.location && (
            <div className="flex items-center gap-2 border border-gold px-4 py-2 text-sm text-charcoal">
              <span>📍 {filters.location}</span>
              <button
                onClick={() => onFiltersChange({ ...filters, location: "" })}
                className="text-mid-gray hover:text-charcoal ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayed.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.has(property.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>

            {properties.length > 9 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="border border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-10 py-3.5 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-200"
                >
                  {showMore ? "Show Less" : `View All ${properties.length} Properties`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🏠</p>
            <h3 className="font-serif text-2xl font-semibold text-charcoal mb-2">
              No Properties Found
            </h3>
            <p className="text-mid-gray mb-6">
              Try adjusting your search filters to see more results.
            </p>
            <button
              onClick={clearFilters}
              className="bg-gold text-charcoal font-semibold tracking-wider uppercase px-8 py-3 text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
