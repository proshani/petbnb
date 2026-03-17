"use client"

import { useState, useRef } from "react"
import type { Property } from "@/types/realestate"

interface PropertyCardProps {
  property: Property
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onSelect: (property: Property) => void
}

function formatPrice(price: number): string {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  return `$${(price / 1000).toFixed(0)}K`
}

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: ny * -10, y: nx * 10 })
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.12,
    })
  }

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare((g) => ({ ...g, opacity: 0 }))
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className="group bg-white overflow-hidden cursor-pointer relative"
      style={{
        borderRadius: "16px",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(8px)" : "translateZ(0)"}`,
        transition: hovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s var(--ease-spring), box-shadow 0.4s ease",
        boxShadow: hovered
          ? `0 32px 72px rgba(28,28,30,0.22), 0 8px 24px rgba(201,168,76,0.12)`
          : "0 4px 20px rgba(28,28,30,0.07)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onClick={() => onSelect(property)}
    >
      {/* Glare layer */}
      <div
        className="absolute inset-0 pointer-events-none z-20 rounded-[16px]"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 55%)`,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          style={{
            transform: `scale(${hovered ? 1.06 : 1}) translate(${tilt.y * -0.3}px, ${tilt.x * 0.3}px)`,
            transition: hovered
              ? "transform 0.1s ease-out"
              : "transform 0.5s var(--ease-spring)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

        {/* View Details — slides up */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pb-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <span className="btn-gold text-charcoal text-xs font-bold tracking-[0.2em] uppercase px-7 py-2.5">
            View Details
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.badge && (
            <span
              className={`text-xs font-bold tracking-wider px-3 py-1 ${
                property.badge === "Featured"
                  ? "bg-gold text-charcoal"
                  : "bg-charcoal/90 text-white border border-white/20"
              }`}
            >
              {property.badge}
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1">
            {property.type}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(property.id)
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 rounded-full shadow-sm"
        >
          <span
            className={`text-base transition-all duration-300 ${
              isFavorite ? "text-red-500 scale-110" : "text-mid-gray"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-serif text-2xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300 mb-1">
          {formatPrice(property.price)}
          <span className="text-mid-gray text-xs font-normal ml-1 tracking-wider">CAD</span>
        </p>
        <h3 className="font-semibold text-charcoal text-sm leading-snug mb-1">{property.title}</h3>
        <p className="text-mid-gray text-xs mb-4 line-clamp-1">
          {property.address} · {property.neighborhood}, Toronto
        </p>
        <div className="flex items-center gap-5 pt-4 border-t border-light-gray text-xs text-mid-gray">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
            </svg>
            {property.beds} bd
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 9a2 2 0 012-2h10a2 2 0 012 2v3H3V9z" />
              <path d="M3 13h14v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z" />
            </svg>
            {property.baths} ba
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.sqft.toLocaleString()} sf
          </span>
        </div>
      </div>
    </div>
  )
}
