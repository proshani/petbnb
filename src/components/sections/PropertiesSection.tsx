"use client"

import { useState, useRef, useCallback } from "react"
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

const tickerItems = [
  { tag: "Just Listed", address: "10 Bellair St", hood: "Yorkville", price: "$3.2M" },
  { tag: "New", address: "47 Roxborough Dr", hood: "Rosedale", price: "$4.7M" },
  { tag: "Featured", address: "200 Cumberland St", hood: "Midtown", price: "$2.1M" },
  { tag: "Sold", address: "1 Bridle Path Rd", hood: "Bridle Path", price: "$8.5M" },
  { tag: "New", address: "64 Forest Hill Rd", hood: "Forest Hill", price: "$5.4M" },
  { tag: "Just Listed", address: "88 King St W", hood: "King West", price: "$1.9M" },
]

export default function PropertiesSection({
  properties,
  totalCount,
  filters,
  onFiltersChange,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}: PropertiesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragScrollLeft, setDragScrollLeft] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  /* ── drag scroll ── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setHasInteracted(true)
    setDragStartX(e.pageX - trackRef.current.offsetLeft)
    setDragScrollLeft(trackRef.current.scrollLeft)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !trackRef.current) return
      e.preventDefault()
      const x = e.pageX - trackRef.current.offsetLeft
      trackRef.current.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.4
    },
    [isDragging, dragStartX, dragScrollLeft],
  )

  const onScroll = useCallback(() => {
    if (!trackRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
    const max = scrollWidth - clientWidth
    setProgress(max > 0 ? (scrollLeft / max) * 100 : 0)
  }, [])

  const nudge = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" })
    setHasInteracted(true)
  }

  /* ── filters ── */
  const setType = (t: PropertyType) => onFiltersChange({ ...filters, type: t })
  const setSort = (s: SortOption) => onFiltersChange({ ...filters, sort: s })

  const setPriceRange = (val: string) => {
    let min = 0
    let max = 15000000
    if (val === "under1m") max = 1000000
    else if (val === "1m-2m") {
      min = 1000000
      max = 2000000
    } else if (val === "2m-4m") {
      min = 2000000
      max = 4000000
    } else if (val === "4m-8m") {
      min = 4000000
      max = 8000000
    } else if (val === "over8m") min = 8000000
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
    "border border-light-gray text-charcoal px-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors bg-white appearance-none rounded-none"

  return (
    <section id="properties" className="bg-warm-white overflow-hidden">
      {/* ── Ticker ──────────────────────────────────── */}
      <div className="bg-charcoal overflow-hidden border-b border-white/5">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "tickerScroll 28s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-white/40 py-2.5 px-6"
              style={{ fontSize: "11px", letterSpacing: "0.08em" }}
            >
              <span
                className={`font-semibold uppercase tracking-wider ${
                  item.tag === "Sold"
                    ? "text-white/25 line-through"
                    : item.tag === "Just Listed"
                      ? "text-gold"
                      : "text-white/60"
                }`}
                style={{ fontSize: "10px", letterSpacing: "0.2em" }}
              >
                {item.tag}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-white/55">
                {item.address}, {item.hood}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-gold/70 font-medium">{item.price} CAD</span>
              <span className="text-white/10 ml-4">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="py-16">
        {/* ── Header ────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p
                className="text-gold mb-2"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Our Listings
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
                Featured Properties
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-mid-gray text-sm">
                <span className="text-charcoal font-semibold">{properties.length}</span> of{" "}
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
              {/* Arrow navigation */}
              <div className="flex gap-2">
                <button
                  onClick={() => nudge("left")}
                  className="w-10 h-10 border border-light-gray bg-white hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-200 flex items-center justify-center text-sm font-light"
                >
                  ←
                </button>
                <button
                  onClick={() => nudge("right")}
                  className="w-10 h-10 border border-light-gray bg-white hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-200 flex items-center justify-center text-sm font-light"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Type tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
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
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <select
                value={getPriceValue()}
                onChange={(e) => setPriceRange(e.target.value)}
                className={selectClass}
              >
                <option value="any">Any Price</option>
                <option value="under1m">Under $1M</option>
                <option value="1m-2m">$1M – $2M</option>
                <option value="2m-4m">$2M – $4M</option>
                <option value="4m-8m">$4M – $8M</option>
                <option value="over8m">Over $8M</option>
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
        </div>

        {/* ── Horizontal scroll track ────────────────── */}
        {properties.length > 0 ? (
          <div className="relative">
            {/* Drag hint */}
            {!hasInteracted && (
              <div
                className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
                style={{ animation: "introFadeUp 0.5s ease 0.5s both", opacity: 0 }}
              >
                <div className="flex items-center gap-3 bg-charcoal/80 backdrop-blur-sm px-6 py-3 border border-white/10">
                  <span className="text-white/50 text-xs tracking-[0.25em] uppercase">
                    Drag to explore
                  </span>
                  <span className="text-gold/60 text-base animate-[floatUp_1.5s_ease-in-out_infinite]">
                    →
                  </span>
                </div>
              </div>
            )}

            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-warm-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-warm-white to-transparent z-10 pointer-events-none" />

            {/* Track */}
            <div
              ref={trackRef}
              className={`flex gap-5 overflow-x-auto hide-scrollbar pb-2 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{ padding: "8px 80px 16px", scrollSnapType: "x mandatory" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onScroll={onScroll}
            >
              {properties.map((property, i) => (
                <div
                  key={property.id}
                  className="flex-shrink-0"
                  style={{ width: "320px", scrollSnapAlign: "start" }}
                >
                  {/* Card index */}
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span
                      className="text-gold/60 font-serif font-bold"
                      style={{ fontSize: "13px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 h-px bg-light-gray" />
                    <span className="text-mid-gray/40" style={{ fontSize: "11px" }}>
                      {String(properties.length).padStart(2, "0")}
                    </span>
                  </div>
                  <PropertyCard
                    property={property}
                    isFavorite={favorites.has(property.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelectProperty}
                  />
                </div>
              ))}

              {/* End spacer */}
              <div className="flex-shrink-0 w-10" />
            </div>

            {/* Progress bar */}
            <div className="max-w-7xl mx-auto px-6 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-light-gray relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gold transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span
                  className="text-mid-gray/50 flex-shrink-0"
                  style={{ fontSize: "11px", letterSpacing: "0.15em" }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 text-center py-20">
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
