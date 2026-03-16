"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-charcoal/96 backdrop-blur-md shadow-2xl py-3" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
          <div className="flex flex-col items-start">
            <span className="font-serif text-xl font-bold text-white tracking-[0.08em] group-hover:text-gold transition-colors duration-300 leading-none">
              Richmondhill Real Estate
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-gold/80 font-medium leading-none" style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase" }}>
                Luxury Real Estate
              </span>
              <span className="text-white/20 text-[8px]">·</span>
              <span className="text-white/35 leading-none" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                GTA
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: "Properties", id: "properties" },
            { label: "Services", id: "services" },
            { label: "Neighbourhoods", id: "neighborhoods" },
            { label: "About", id: "agents" },
            { label: "Contact", id: "cta" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative text-white/70 hover:text-white transition-colors duration-200 text-xs tracking-[0.12em] uppercase font-medium group/nav"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover/nav:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("cta")}
            className="hidden lg:block border border-gold text-gold hover:bg-gold hover:text-charcoal px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
          >
            List Your Property
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gold/70 transition-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="bg-charcoal/98 backdrop-blur-md border-t border-white/10 py-6 px-6 flex flex-col gap-4">
          {[
            { label: "Properties", id: "properties" },
            { label: "Services", id: "services" },
            { label: "Neighbourhoods", id: "neighborhoods" },
            { label: "About", id: "agents" },
            { label: "Contact", id: "cta" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/75 hover:text-gold text-left text-sm tracking-[0.15em] uppercase py-1 transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("cta")}
            className="border border-gold text-gold px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase mt-2 text-left hover:bg-gold hover:text-charcoal transition-all duration-200"
          >
            List Your Property
          </button>
        </div>
      </div>
    </nav>
  )
}
