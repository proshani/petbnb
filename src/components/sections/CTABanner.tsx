"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/useInView"

export default function CTABanner() {
  const { ref, inView } = useInView()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const el = document.getElementById("cta")
    const handleScroll = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setScrollY(window.scrollY)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) return
    setSubmitted(true)
  }

  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')`,
          transform: `scale(1.1) translateY(${scrollY * 0.15}px)`,
          willChange: "transform",
        }}
      />
      {/* Deep overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/92 via-charcoal/80 to-charcoal/92" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-900 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div
          className={`h-px bg-gold mx-auto mb-7 transition-all duration-1000 ${inView ? "w-14" : "w-0"
            }`}
        />
        <p className="text-gold text-xs tracking-[0.45em] uppercase font-medium mb-5">
          Begin Your Journey
        </p>
        <h2 className="font-serif font-bold text-white mb-5">
          <span className="block text-4xl sm:text-5xl lg:text-6xl">Ready to Find Your</span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl">
            Toronto{" "}
            <span className="text-gradient-gold italic">Dream Home?</span>
          </span>
        </h2>
        <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join over 1,200 Toronto families who trusted LUXE with Canada&apos;s most significant
          purchase. Our team is ready to guide you — from first viewing to closing day.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/8 border border-white/20 text-white placeholder-white/35 px-5 py-3.5 text-sm focus:outline-none focus:border-gold transition-all duration-200 rounded-none"
            />
            <button
              type="submit"
              className="btn-gold text-charcoal font-bold tracking-[0.2em] uppercase px-8 py-3.5 text-sm whitespace-nowrap"
            >
              Get Started
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-3 border border-gold/50 bg-gold/10 px-8 py-4">
            <span className="text-gold text-xl">✓</span>
            <span className="text-white text-sm tracking-wider">
              Thank you — a LUXE advisor will contact you within the hour.
            </span>
          </div>
        )}

        <p className="text-white/25 text-xs mt-5">
          No spam. No pressure. Just exceptional service.
        </p>

        {/* Contact info */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
          {[
            { label: "Toronto Office", value: "+1 (416) 555-0100" },
            { label: "Email", value: "hello@luxe.ca" },
            { label: "Hours", value: "Mon–Sat 9am–7pm" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-white/30 text-xs tracking-wider uppercase mb-0.5">{item.label}</p>
              <p className="text-white/70 text-xs">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
