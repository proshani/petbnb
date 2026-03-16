"use client"

import { useState, useEffect } from "react"

export default function IntroScreen() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden")

  useEffect(() => {
    if (sessionStorage.getItem("amin_shahvari_seen")) return

    setPhase("visible")

    const t1 = setTimeout(() => setPhase("exiting"), 2200)
    const t2 = setTimeout(() => {
      setPhase("hidden")
      sessionStorage.setItem("amin_shahvari_seen", "1")
    }, 3100)

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
      {/* Top curtain — "AMIN" */}
      <div
        className="absolute inset-x-0 top-0 bg-charcoal flex items-end justify-center pb-1 overflow-hidden"
        style={{
          height: "50%",
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="flex items-baseline">
          {"AMIN".split("").map((letter, i) => (
            <span key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
              <span
                className="font-serif font-bold text-white inline-block"
                style={{
                  fontSize: "clamp(64px, 11vw, 112px)",
                  letterSpacing: "0.14em",
                  animation: `introLetterUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${160 + i * 90}ms both`,
                }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Gold seam line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-gold/50"
        style={{
          top: "50%",
          height: "1px",
          animation: "introLineExpand 1s ease-out 0.65s both",
          width: 0,
        }}
      />

      {/* Bottom curtain — "SHAHVARI" */}
      <div
        className="absolute inset-x-0 bottom-0 bg-charcoal flex flex-col items-center justify-start pt-1 overflow-hidden"
        style={{
          height: "50%",
          transform: exiting ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="flex items-baseline">
          {"SHAHVARI".split("").map((letter, i) => (
            <span key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
              <span
                className="font-serif font-bold text-gradient-gold inline-block"
                style={{
                  fontSize: "clamp(64px, 11vw, 112px)",
                  letterSpacing: "0.14em",
                  animation: `introLetterUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${160 + i * 70}ms both`,
                }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        <p
          className="text-white/30 font-medium mt-2"
          style={{
            fontSize: "10px",
            letterSpacing: "0.48em",
            textTransform: "uppercase",
            animation: "introFadeUp 0.65s ease 1.1s both",
            opacity: 0,
          }}
        >
          Million Dollar Award Winner 2025 · GTA
        </p>
      </div>
    </div>
  )
}
