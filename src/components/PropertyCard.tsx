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
  return (
    <div
      className="group bg-white overflow-hidden cursor-pointer card-hover"
      style={{ borderRadius: "16px" }}
      onClick={() => onSelect(property)}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />

        {/* Gradient overlay — always subtle, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

        {/* View Details — slides up on hover */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pb-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <span className="btn-gold text-charcoal text-xs font-bold tracking-[0.2em] uppercase px-7 py-2.5">
            View Details
          </span>
        </div>

        {/* Top badges */}
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
        {/* Price */}
        <p className="font-serif text-2xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300 mb-1">
          {formatPrice(property.price)}
          <span className="text-mid-gray text-xs font-normal ml-1 tracking-wider">CAD</span>
        </p>

        <h3 className="font-semibold text-charcoal text-sm leading-snug mb-1">{property.title}</h3>
        <p className="text-mid-gray text-xs mb-4 line-clamp-1">
          {property.address} · {property.neighborhood}, Toronto
        </p>

        {/* Specs */}
        <div className="flex items-center gap-5 pt-4 border-t border-light-gray text-xs text-mid-gray">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
            </svg>
            <span>{property.beds} bd</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 9a2 2 0 012-2h10a2 2 0 012 2v3H3V9z" />
              <path d="M3 13h14v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z" />
            </svg>
            <span>{property.baths} ba</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span>{property.sqft.toLocaleString()} sf</span>
          </span>
        </div>
      </div>
    </div>
  )
}
