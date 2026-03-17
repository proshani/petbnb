"use client"

import { useState, useEffect } from "react"

export default function IntroScreen() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden")

  useEffect(() => {
    if (sessionStorage.getItem("luxe_gta_seen")) return

    setPhase("visible")
    const t1 = setTimeout(() => setPhase("exiting"), 2100)
    const t2 = setTimeout(() => {
      setPhase("hidden")
      sessionStorage.setItem("luxe_gta_seen", "1")
    }, 3000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === "hidden") return null
  const exiting = phase === "exiting"

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top curtain — LUXE */}
      <div
        className="absolute inset-x-0 top-0 bg-charcoal flex items-end justify-center pb-1 overflow-hidden"
        style={{
          height: "50%",
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="flex items-baseline">
          {"LUXE".split("").map((l, i) => (
            <span key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
              <span
                className="font-serif font-bold text-white inline-block"
                style={{
                  fontSize: "clamp(72px, 12vw, 128px)",
                  letterSpacing: "0.16em",
                  animation: `introLetterUp 0.8s cubic-bezier(0.16,1,0.3,1) ${160 + i * 90}ms both`,
                }}
              >
                {l}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Seam line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-gold/50"
        style={{
          top: "50%",
          height: "1px",
          animation: "introLineExpand 1s ease-out 0.65s both",
          width: 0,
        }}
      />

      {/* Bottom curtain — TORONTO */}
      <div
        className="absolute inset-x-0 bottom-0 bg-charcoal flex flex-col items-center justify-start pt-1 overflow-hidden"
        style={{
          height: "50%",
          transform: exiting ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="flex items-baseline">
          {"TORONTO".split("").map((l, i) => (
            <span key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
              <span
                className="font-serif font-bold text-gradient-gold inline-block"
                style={{
                  fontSize: "clamp(72px, 12vw, 128px)",
                  letterSpacing: "0.16em",
                  animation: `introLetterUp 0.8s cubic-bezier(0.16,1,0.3,1) ${160 + i * 65}ms both`,
                }}
              >
                {l}
              </span>
            </span>
          ))}
        </div>
        <p
          className="text-white/25 font-medium mt-2"
          style={{
            fontSize: "10px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            animation: "introFadeUp 0.65s ease 1.2s both",
            opacity: 0,
          }}
        >
          GTA Luxury Real Estate
        </p>
      </div>
    </div>
  )
}
