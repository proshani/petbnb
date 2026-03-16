"use client"

import { useState, useEffect } from "react"
import type { Filters, PropertyType } from "@/types/realestate"

interface HeroSectionProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function HeroSection({ filters, onFiltersChange }: HeroSectionProps) {
  const [localLocation, setLocalLocation] = useState(filters.location)
  const [localType, setLocalType] = useState<PropertyType>(filters.type)
  const [localPrice, setLocalPrice] = useState("any")
  const [localBeds, setLocalBeds] = useState(filters.beds > 0 ? filters.beds.toString() : "0")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 1.2) {
        setScrollY(window.scrollY)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = () => {
    let minPrice = 0
    let maxPrice = 15000000
    if (localPrice === "under1m") {
      maxPrice = 1000000
    } else if (localPrice === "1m-2m") {
      minPrice = 1000000
      maxPrice = 2000000
    } else if (localPrice === "2m-4m") {
      minPrice = 2000000
      maxPrice = 4000000
    } else if (localPrice === "4m-8m") {
      minPrice = 4000000
      maxPrice = 8000000
    } else if (localPrice === "over8m") {
      minPrice = 8000000
    }

    onFiltersChange({
      ...filters,
      location: localLocation,
      type: localType,
      minPrice,
      maxPrice,
      beds: parseInt(localBeds) || 0,
    })
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
  }

  const selectClass =
    "w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-all duration-200 appearance-none"

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85')`,
          transform: `scale(1.12) translateY(${scrollY * 0.28}px)`,
          willChange: "transform",
        }}
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

      {/* Decorative grain texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-7 opacity-0 animate-fade-in">
          <div className="w-10 h-px bg-gold/70" />
          <span className="text-gold text-[11px] font-medium tracking-[0.45em] uppercase">
            Toronto&apos;s Premier Real Estate
          </span>
          <div className="w-10 h-px bg-gold/70" />
        </div>

        {/* Heading — staggered lines */}
        <div className="mb-6">
          <h1 className="font-serif font-bold text-white leading-none">
            <span className="block text-5xl sm:text-6xl lg:text-8xl opacity-0 animate-fade-in-up animation-delay-200">
              Toronto&apos;s Most
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-8xl opacity-0 animate-fade-in-up animation-delay-400">
              <span className="text-gradient-gold italic">Exceptional</span>
              <span className="text-white"> Homes</span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-600">
          Discover luxury properties across Yorkville, Rosedale, Forest Hill, King West and
          Toronto&apos;s most coveted neighbourhoods. Curated for those who expect the exceptional.
        </p>

        {/* Search Bar */}
        <div className="glass rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto opacity-0 animate-fade-in-up animation-delay-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Location */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-white/45 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                Neighbourhood
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                  📍
                </span>
                <input
                  type="text"
                  placeholder="Yorkville, Rosedale, Forest Hill..."
                  value={localLocation}
                  onChange={(e) => setLocalLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full bg-white/10 text-white placeholder-white/30 border border-white/20 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-all duration-200"
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-white/45 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                Property Type
              </label>
              <select
                value={localType}
                onChange={(e) => setLocalType(e.target.value as PropertyType)}
                className={selectClass}
              >
                <option value="All" className="bg-charcoal text-white">
                  Any Type
                </option>
                <option value="House" className="bg-charcoal text-white">
                  House / Estate
                </option>
                <option value="Condo" className="bg-charcoal text-white">
                  Condo
                </option>
                <option value="Townhouse" className="bg-charcoal text-white">
                  Townhouse
                </option>
                <option value="Penthouse" className="bg-charcoal text-white">
                  Penthouse
                </option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-white/45 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                Budget (CAD)
              </label>
              <select
                value={localPrice}
                onChange={(e) => setLocalPrice(e.target.value)}
                className={selectClass}
              >
                <option value="any" className="bg-charcoal text-white">
                  Any Price
                </option>
                <option value="under1m" className="bg-charcoal text-white">
                  Under $1M
                </option>
                <option value="1m-2m" className="bg-charcoal text-white">
                  $1M – $2M
                </option>
                <option value="2m-4m" className="bg-charcoal text-white">
                  $2M – $4M
                </option>
                <option value="4m-8m" className="bg-charcoal text-white">
                  $4M – $8M
                </option>
                <option value="over8m" className="bg-charcoal text-white">
                  $8M +
                </option>
              </select>
            </div>

            {/* Beds */}
            <div>
              <label className="block text-white/45 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                Bedrooms
              </label>
              <select
                value={localBeds}
                onChange={(e) => setLocalBeds(e.target.value)}
                className={selectClass}
              >
                <option value="0" className="bg-charcoal text-white">
                  Any Beds
                </option>
                <option value="2" className="bg-charcoal text-white">
                  2+ Beds
                </option>
                <option value="3" className="bg-charcoal text-white">
                  3+ Beds
                </option>
                <option value="4" className="bg-charcoal text-white">
                  4+ Beds
                </option>
                <option value="5" className="bg-charcoal text-white">
                  5+ Beds
                </option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="btn-gold mt-4 w-full text-charcoal font-bold tracking-[0.2em] uppercase py-3.5 rounded-xl text-sm"
          >
            Search Toronto Properties
          </button>
        </div>

        {/* Trust stats */}
        <div className="flex items-center justify-center gap-10 sm:gap-16 mt-9 opacity-0 animate-fade-in-up animation-delay-800">
          {[
            { value: "$2.1B+", label: "Toronto Sales" },
            { value: "500+", label: "Properties" },
            { value: "15 Yrs", label: "In Toronto" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white font-semibold text-lg leading-tight">{stat.value}</p>
              <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animation-delay-1000">
        <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase">Explore</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-gold rounded-full animate-scroll-bounce" />
        </div>
      </div>
    </section>
  )
}
