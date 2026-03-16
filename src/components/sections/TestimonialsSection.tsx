"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/useInView"
import { testimonials } from "@/data/testimonials"

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const { ref, inView } = useInView()

  const go = (idx: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 280)
  }

  // Auto-advance
  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      go((active + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [active, inView])

  const t = testimonials[active]

  return (
    <section className="bg-charcoal py-28 relative overflow-hidden">
      {/* Decorative quote mark */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 font-serif text-[220px] text-white/[0.02] leading-none select-none pointer-events-none">
        "
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className={`h-px bg-gold mx-auto mb-6 transition-all duration-1000 ${
              inView ? "w-14" : "w-0"
            }`}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            What Toronto Says <span className="italic text-gradient-gold">About Us</span>
          </h2>
        </div>

        <div ref={ref}>
          {/* Testimonial */}
          <div
            className={`text-center transition-all duration-300 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-gold text-xl">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-serif text-xl sm:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto italic mb-10">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold/40"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-charcoal text-[9px] font-bold">✓</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/35 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => go((active - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 border border-white/15 hover:border-gold text-white/40 hover:text-gold flex items-center justify-center transition-all duration-200 text-lg hover:scale-110"
            >
              ←
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active ? "w-8 h-2 bg-gold" : "w-2 h-2 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go((active + 1) % testimonials.length)}
              className="w-10 h-10 border border-white/15 hover:border-gold text-white/40 hover:text-gold flex items-center justify-center transition-all duration-200 text-lg hover:scale-110"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
