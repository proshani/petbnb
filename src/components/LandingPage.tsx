"use client"

import { useState, useMemo, useCallback } from "react"
import type { Property, Filters } from "@/types/realestate"
import { properties } from "@/data/properties"
import HeroSection from "@/components/sections/HeroSection"
import PropertiesSection from "@/components/sections/PropertiesSection"
import StatsSection from "@/components/sections/StatsSection"
import ServicesSection from "@/components/sections/ServicesSection"
import NeighborhoodsSection from "@/components/sections/NeighborhoodsSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import AgentsSection from "@/components/sections/AgentsSection"
import CTABanner from "@/components/sections/CTABanner"
import PropertyModal from "@/components/PropertyModal"

const defaultFilters: Filters = {
  location: "",
  type: "All",
  minPrice: 0,
  maxPrice: 15000000,
  beds: 0,
  baths: 0,
  sort: "newest",
}

export default function LandingPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (filters.type !== "All" && p.type !== filters.type) return false
        if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
        if (filters.beds > 0 && p.beds < filters.beds) return false
        if (filters.baths > 0 && p.baths < filters.baths) return false
        if (
          filters.location &&
          !p.city.toLowerCase().includes(filters.location.toLowerCase()) &&
          !p.neighborhood.toLowerCase().includes(filters.location.toLowerCase())
        )
          return false
        return true
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          case "newest":
            return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
          case "oldest":
            return new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime()
          default:
            return 0
        }
      })
  }, [filters])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleNeighborhoodClick = useCallback((name: string) => {
    setFilters((prev) => ({ ...prev, location: name }))
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <>
      <HeroSection filters={filters} onFiltersChange={setFilters} />
      <PropertiesSection
        properties={filteredProperties}
        totalCount={properties.length}
        filters={filters}
        onFiltersChange={setFilters}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelectProperty={setSelectedProperty}
      />
      <StatsSection />
      <ServicesSection />
      <NeighborhoodsSection onNeighborhoodClick={handleNeighborhoodClick} />
      <TestimonialsSection />
      <AgentsSection />
      <CTABanner />

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isFavorite={favorites.has(selectedProperty.id)}
          onToggleFavorite={() => toggleFavorite(selectedProperty.id)}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  )
}
