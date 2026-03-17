"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/useInView"

const times = [
  { v: "morning", l: "Morning  9am – 12pm" },
  { v: "afternoon", l: "Afternoon  12pm – 5pm" },
  { v: "evening", l: "Evening  5pm – 7pm" },
]

export default function CTABanner() {
  const { ref, inView } = useInView()
  const [scrollY, setScrollY] = useState(0)
  const [step, setStep] = useState<"form" | "success">("form")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "morning",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("cta")
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setScrollY(window.scrollY)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Required"
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required"
    if (!form.phone.trim()) e.phone = "Required"
    if (!form.date) e.date = "Required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStep("success")
  }

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')`,
          transform: `scale(1.1) translateY(${scrollY * 0.12}px)`,
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/95 via-charcoal/85 to-charcoal/95" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div
        ref={ref}
        className={`relative z-10 max-w-6xl mx-auto px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: Copy ── */}
          <div>
            <div className={`h-px bg-gold mb-6 transition-all duration-1000 ${inView ? "w-14" : "w-0"}`} />
            <p className="text-gold text-xs tracking-[0.42em] uppercase font-medium mb-5">
              Free Consultation
            </p>
            <h2 className="font-serif font-bold text-white mb-6">
              <span className="block text-4xl sm:text-5xl leading-[1.1]">Ready to Find Your</span>
              <span className="block text-4xl sm:text-5xl leading-[1.1] text-gradient-gold italic">Dream Home?</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              Book a free, no-obligation session with one of Toronto&apos;s top GTA specialists.
              We&apos;ll guide you from first viewing to closing day.
            </p>

            {/* Trust signals */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: "✓", text: "Confirmed within 2 business hours" },
                { icon: "✓", text: "Zero pressure, fully confidential" },
                { icon: "✓", text: "TREB & RECO certified specialists" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-gold text-sm font-bold">{item.icon}</span>
                  <span className="text-white/55 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="border-t border-white/10 pt-8 flex flex-col gap-3">
              {[
                { label: "Toronto Office", value: "+1 (416) 555-0100" },
                { label: "Email", value: "hello@luxe.ca" },
                { label: "Hours", value: "Mon–Sat  9am – 7pm" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <p
                    className="text-white/30 uppercase w-28 flex-shrink-0"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-white/65 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Booking form ── */}
          <div className="bg-white/[0.04] border border-white/[0.08] p-8">
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <p
                    className="text-gold font-medium mb-1"
                    style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase" }}
                  >
                    Book Your Appointment
                  </p>
                  <h3 className="font-serif text-xl font-bold text-white">Schedule a Free Consultation</h3>
                </div>

                {/* Name */}
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={`form-input ${errors.name ? "border-red-400/60" : ""}`}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`form-input ${errors.email ? "border-red-400/60" : ""}`}
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      placeholder="+1 (416)…"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={`form-input ${errors.phone ? "border-red-400/60" : ""}`}
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className={`form-input ${errors.date ? "border-red-400/60" : ""}`}
                    />
                    {errors.date && <p className="form-error">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="form-label">Time</label>
                    <select
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className="form-input appearance-none"
                    >
                      {times.map((t) => (
                        <option key={t.v} value={t.v} className="bg-charcoal">
                          {t.l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">How can we help?</label>
                  <textarea
                    placeholder="Tell us about your property goals…"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={3}
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full text-charcoal font-bold tracking-[0.2em] uppercase py-4 text-sm"
                  style={{ borderRadius: 0 }}
                >
                  Book Free Consultation →
                </button>

                <p className="text-white/20 text-xs text-center">
                  No spam. Confirmed within 2 hours during business hours.
                </p>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-10">
                <div
                  className="w-16 h-16 border border-gold/50 flex items-center justify-center mb-8"
                  style={{ animation: "scaleIn 0.5s var(--ease-spring) both" }}
                >
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <p
                  className="text-gold font-medium mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.42em", textTransform: "uppercase" }}
                >
                  Booking Confirmed
                </p>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  We&apos;ll be in touch shortly
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-xs">
                  A LUXE Toronto specialist will contact you within 2 business hours to confirm your appointment.
                </p>
                <button
                  onClick={() => {
                    setStep("form")
                    setForm({ name: "", email: "", phone: "", date: "", time: "morning", message: "" })
                  }}
                  className="text-white/30 hover:text-white/60 text-xs tracking-wider uppercase transition-colors duration-200"
                >
                  Book Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
