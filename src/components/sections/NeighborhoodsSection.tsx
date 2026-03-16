"use client"

import { useInView } from "@/hooks/useInView"
import { neighborhoods } from "@/data/neighborhoods"

interface NeighborhoodsSectionProps {
  onNeighborhoodClick: (name: string) => void
}

function formatAvgPrice(price: number): string {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M avg`
  return `$${(price / 1000).toFixed(0)}K avg`
}

export default function NeighborhoodsSection({ onNeighborhoodClick }: NeighborhoodsSectionProps) {
  const { ref, inView } = useInView()

  return (
    <section id="neighborhoods" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div
              className={`h-px bg-gold mb-5 transition-all duration-1000 ${
                inView ? "w-14" : "w-0"
              }`}
            />
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
              Explore Toronto
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
              Toronto&apos;s Finest
              <br />
              <span className="italic text-gradient-gold">Neighbourhoods</span>
            </h2>
          </div>
          <p className="text-mid-gray text-sm max-w-xs leading-relaxed hidden sm:block">
            Click any neighbourhood to explore available properties in that area.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {neighborhoods.map((hood, i) => (
            <button
              key={hood.id}
              onClick={() => onNeighborhoodClick(hood.name)}
              className={`group relative overflow-hidden text-left transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${i === 0 ? "sm:row-span-2 h-96 sm:h-auto" : "h-52"}`}
              style={{
                transitionDelay: `${i * 75}ms`,
                borderRadius: "12px",
              }}
            >
              {/* Image */}
              <img
                src={hood.image}
                alt={hood.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />

              {/* Gold border on hover */}
              <div
                className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors duration-400"
                style={{ borderRadius: "12px" }}
              />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors duration-200 mb-0.5">
                      {hood.name}
                    </h3>
                    <p className="text-white/50 text-xs">{hood.city}</p>
                  </div>
                  <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-gold text-xs font-semibold">{hood.propertyCount} listings</p>
                    <p className="text-white/40 text-xs">{formatAvgPrice(hood.avgPrice)}</p>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/20 group-hover:bg-gold/40 transition-colors duration-300" />
                  <span className="text-white/40 group-hover:text-gold text-xs tracking-wider uppercase transition-colors duration-300">
                    Explore →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
