"use client"

import { useState, useEffect } from "react"
import type { Filters, PropertyType } from "@/types/realestate"

interface HeroSectionProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const headlineWords = [
  { text: "Toronto's", delay: 0.55 },
  { text: "Most", delay: 0.75 },
  { text: "Exceptional", delay: 0.95, gold: true },
  { text: "Homes.", delay: 1.15 },
]

export default function HeroSection({ filters, onFiltersChange }: HeroSectionProps) {
  const [localLocation, setLocalLocation] = useState(filters.location)
  const [localType, setLocalType] = useState<PropertyType>(filters.type)
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 1.5) {
        setScrollY(window.scrollY)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = () => {
    onFiltersChange({ ...filters, location: localLocation, type: localType })
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative flex flex-col lg:flex-row overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── LEFT PANEL ──────────────────────────────── */}
      <div className="relative z-10 bg-charcoal flex flex-col justify-center w-full lg:w-[44%] flex-shrink-0 px-8 sm:px-12 lg:px-14 xl:px-20 pt-32 pb-16 lg:pt-28 lg:pb-20 min-h-[55vh] lg:min-h-0">
        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-8 relative"
          style={{
            animation: loaded ? "introFadeUp 0.7s ease 0.3s both" : "none",
            opacity: 0,
          }}
        >
          <div className="w-8 h-px bg-gold/60" />
          <span
            className="text-gold font-medium uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.42em" }}
          >
            Est. 2009 · Toronto, Ontario
          </span>
        </div>

        {/* Headline — word-by-word reveal */}
        <h1 className="font-serif font-bold text-white leading-[1.08] mb-6 relative">
          {headlineWords.map((w) => (
            <div key={w.text} style={{ overflow: "hidden", display: "block" }}>
              <span
                className={`inline-block ${w.gold ? "text-gradient-gold italic" : ""}`}
                style={{
                  fontSize: "clamp(2.6rem, 4.2vw, 5rem)",
                  animation: loaded
                    ? `wordRevealUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${w.delay}s both`
                    : "none",
                  opacity: 0,
                }}
              >
                {w.text}
              </span>
            </div>
          ))}
        </h1>

        {/* Descriptor */}
        <p
          className="text-white/45 leading-relaxed mb-10 max-w-[360px] relative"
          style={{
            fontSize: "14px",
            animation: loaded ? "introFadeUp 0.7s ease 1.4s both" : "none",
            opacity: 0,
          }}
        >
          Curated estates across Yorkville, Rosedale &amp; Forest Hill. Where architecture meets
          legacy.
        </p>

        {/* Search bar */}
        <div
          className="relative"
          style={{
            animation: loaded ? "introFadeUp 0.7s ease 1.6s both" : "none",
            opacity: 0,
          }}
        >
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Location */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">
                ⌖
              </span>
              <input
                type="text"
                placeholder="Neighbourhood or address..."
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 pl-9 pr-4 py-3.5 text-sm focus:outline-none focus:border-gold/70 transition-all duration-200"
                style={{ borderRadius: 0 }}
              />
            </div>

            {/* Type */}
            <select
              value={localType}
              onChange={(e) => setLocalType(e.target.value as PropertyType)}
              className="bg-white/8 border border-white/15 text-white/70 px-4 py-3.5 text-sm focus:outline-none focus:border-gold/70 transition-all duration-200 appearance-none"
              style={{ borderRadius: 0, minWidth: "130px" }}
            >
              <option value="All" className="bg-charcoal">
                Any Type
              </option>
              <option value="House" className="bg-charcoal">
                House
              </option>
              <option value="Condo" className="bg-charcoal">
                Condo
              </option>
              <option value="Townhouse" className="bg-charcoal">
                Townhouse
              </option>
              <option value="Penthouse" className="bg-charcoal">
                Penthouse
              </option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="btn-gold mt-2 w-full text-charcoal font-bold tracking-[0.18em] uppercase py-4 text-sm"
            style={{ borderRadius: 0 }}
          >
            Search Properties
          </button>
        </div>

        {/* Bottom stats */}
        <div
          className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10 relative"
          style={{
            animation: loaded ? "introFadeUp 0.7s ease 1.85s both" : "none",
            opacity: 0,
          }}
        >
          {[
            { v: "$2.1B+", l: "Sales Volume" },
            { v: "500+", l: "Properties" },
            { v: "15 Yrs", l: "In Toronto" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-white font-semibold text-lg leading-none">{s.v}</p>
              <p
                className="text-white/30 mt-1"
                style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── GOLD DIVIDER LINE ────────────────────────────────── */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 w-px z-20 pointer-events-none"
        style={{ left: "44%" }}
      >
        <div
          className="w-full h-full bg-gold/50 origin-top"
          style={{
            animation: loaded ? "drawLineDown 1.4s ease-out 0.5s both" : "none",
            transform: "scaleY(0)",
          }}
        />
      </div>

      {/* ── RIGHT PANEL — PROPERTY IMAGE ────────────────────── */}
      <div className="relative flex-1 overflow-hidden min-h-[45vh] lg:min-h-0">
        {/* Property image with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85')`,
            transform: `scale(1.1) translateY(${scrollY * 0.18}px)`,
            willChange: "transform",
            transition: "transform 0.05s linear",
          }}
        />

        {/* Subtle left-edge darkening for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />

        {/* Floating property badge */}
        <div
          className="absolute bottom-10 right-10 bg-charcoal/90 backdrop-blur-sm border border-gold/30 px-5 py-4 hidden lg:block"
          style={{
            animation: loaded ? "introFadeUp 0.7s ease 2s both" : "none",
            opacity: 0,
          }}
        >
          <p
            className="text-gold"
            style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            Featured Listing
          </p>
          <p className="text-white font-serif font-bold text-lg mt-0.5">47 Hazelton Ave</p>
          <p className="text-white/50 text-xs mt-0.5">Yorkville, Toronto</p>
          <p className="text-gold font-semibold mt-2 text-sm">$6,850,000 CAD</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex">
          <div
            className="w-px h-16 bg-white/20 relative overflow-hidden"
            style={{ animation: loaded ? "introFadeUp 0.7s ease 2.2s both" : "none", opacity: 0 }}
          >
            <div
              className="absolute top-0 left-0 w-full bg-gold"
              style={{ height: "40%", animation: "scrollBounce 2s ease-in-out infinite" }}
            />
          </div>
          <span
            className="text-white/30 uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.25em" }}
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
