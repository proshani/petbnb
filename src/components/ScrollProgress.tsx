"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "hero", label: "Home" },
  { id: "properties", label: "Listings" },
  { id: "stats", label: "Impact" },
  { id: "services", label: "Services" },
  { id: "neighborhoods", label: "Areas" },
  { id: "agents", label: "Team" },
  { id: "instagram", label: "Social" },
  { id: "cta", label: "Contact" },
]

export default function ScrollProgress() {
  const [active, setActive] = useState("hero")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80)
      const mid = window.innerHeight * 0.5
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= mid && rect.bottom >= mid) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed left-7 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      {sections.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 group"
            title={s.label}
          >
            {/* Dot */}
            <div
              className="flex-shrink-0 rounded-full transition-all duration-400"
              style={{
                width: isActive ? "10px" : "5px",
                height: isActive ? "10px" : "5px",
                backgroundColor: isActive ? "#c9a84c" : "rgba(255,255,255,0.2)",
                boxShadow: isActive ? "0 0 8px rgba(201,168,76,0.6)" : "none",
              }}
            />
            {/* Label */}
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-400 whitespace-nowrap"
              style={{
                color: isActive ? "#c9a84c" : "transparent",
                transform: isActive ? "translateX(0)" : "translateX(-8px)",
                opacity: isActive ? 1 : 0,
              }}
            >
              {s.label}
            </span>
          </button>
        )
      })}

      {/* Connecting line */}
      <div
        className="absolute left-[4px] top-[6px] bottom-[6px] w-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />
    </div>
  )
}
