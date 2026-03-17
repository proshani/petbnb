"use client"

import { useState, useEffect } from "react"

type Step = "closed" | "form" | "success"

const services = [
  { v: "buy", l: "Buy a Property" },
  { v: "sell", l: "Sell a Property" },
  { v: "invest", l: "Investment" },
  { v: "consult", l: "General Advice" },
]

const times = [
  { v: "morning", l: "Morning  9am – 12pm" },
  { v: "afternoon", l: "Afternoon  12pm – 5pm" },
  { v: "evening", l: "Evening  5pm – 7pm" },
]

export default function BookingWidget() {
  const [step, setStep] = useState<Step>("closed")
  const [bookingRef, setBookingRef] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "buy",
    budget: "",
    date: "",
    time: "morning",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    document.body.style.overflow = step !== "closed" ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [step])

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
    setBookingRef(`LX-${Date.now().toString(36).toUpperCase().slice(-5)}`)
    setStep("success")
  }

  const open = step !== "closed"

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[9000]"
          onClick={() => setStep("closed")}
        />
      )}

      {/* Slide-in panel */}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-charcoal z-[9001] overflow-y-auto"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: open ? "-24px 0 80px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Panel header */}
        <div className="sticky top-0 bg-charcoal z-10 flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/[0.08]">
          <div>
            <p
              className="text-gold font-medium mb-1"
              style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase" }}
            >
              Free Consultation
            </p>
            <h3 className="font-serif text-2xl font-bold text-white leading-none">
              Book an Appointment
            </h3>
          </div>
          <button
            onClick={() => setStep("closed")}
            className="w-10 h-10 border border-white/15 hover:border-gold text-white/40 hover:text-gold flex items-center justify-center transition-all duration-200 flex-shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── FORM ── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="px-8 py-7 flex flex-col gap-6">
            {/* Trust strip */}
            <div className="flex items-start gap-3 bg-gold/8 border border-gold/20 px-4 py-3">
              <span className="text-gold text-base mt-0.5 flex-shrink-0">🏆</span>
              <p className="text-white/55 text-xs leading-relaxed">
                Free, no-obligation session with one of Toronto&apos;s top GTA specialists. We
                typically confirm within 2 hours.
              </p>
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

            {/* Service toggle */}
            <div>
              <label className="form-label">I&apos;m looking to</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {services.map((s) => (
                  <button
                    key={s.v}
                    type="button"
                    onClick={() => update("service", s.v)}
                    className={`px-4 py-3 text-xs font-medium tracking-[0.1em] uppercase border transition-all duration-200 text-left ${
                      form.service === s.v
                        ? "bg-gold text-charcoal border-gold"
                        : "bg-white/[0.04] text-white/45 border-white/12 hover:border-white/30 hover:text-white/70"
                    }`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="form-label">Budget Range</label>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className="form-input appearance-none"
              >
                <option value="" className="bg-charcoal">
                  Select a range
                </option>
                <option value="under1m" className="bg-charcoal">
                  Under $1M
                </option>
                <option value="1m-2m" className="bg-charcoal">
                  $1M – $2M
                </option>
                <option value="2m-4m" className="bg-charcoal">
                  $2M – $4M
                </option>
                <option value="4m-8m" className="bg-charcoal">
                  $4M – $8M
                </option>
                <option value="over8m" className="bg-charcoal">
                  $8M +
                </option>
              </select>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
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
                <label className="form-label">Time Preference</label>
                <div className="flex flex-col gap-2 mt-2">
                  {times.map((t) => (
                    <label key={t.v} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                          form.time === t.v
                            ? "border-gold bg-gold"
                            : "border-white/25 group-hover:border-white/50"
                        }`}
                        onClick={() => update("time", t.v)}
                      >
                        {form.time === t.v && (
                          <div className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                        )}
                      </div>
                      <span className="text-white/50 text-xs leading-tight">{t.l}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="form-label">Tell us more</label>
              <textarea
                placeholder="Property requirements, neighbourhood preferences, questions…"
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
              Confirm Booking →
            </button>

            <p className="text-white/20 text-xs text-center">
              No spam. Our team confirms within 2 hours during business hours.
            </p>
          </form>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && (
          <div className="px-8 py-14 flex flex-col items-center text-center">
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
            <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-xs">
              A LUXE Toronto specialist will contact you within 2 business hours to confirm your
              appointment details.
            </p>

            <div className="border border-gold/30 bg-gold/6 px-8 py-5 mb-10 w-full">
              <p
                className="text-white/35 mb-1"
                style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                Booking Reference
              </p>
              <p className="text-gold font-serif font-bold text-3xl tracking-[0.2em]">
                {bookingRef}
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full text-sm">
              <a
                href="tel:+14165550100"
                className="border border-white/10 hover:border-gold text-white/50 hover:text-gold py-3 transition-all duration-200"
              >
                📞 +1 (416) 555-0100
              </a>
              <a
                href="mailto:hello@luxe.ca"
                className="border border-white/10 hover:border-gold text-white/50 hover:text-gold py-3 transition-all duration-200"
              >
                ✉ hello@luxe.ca
              </a>
            </div>

            <button
              onClick={() => {
                setStep("closed")
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  service: "buy",
                  budget: "",
                  date: "",
                  time: "morning",
                  message: "",
                })
              }}
              className="mt-8 text-white/25 hover:text-white/50 text-xs tracking-wider uppercase transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* ── Floating trigger button ── */}
      <div
        className="fixed bottom-8 right-8 z-[8999]"
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          transform: open ? "scale(0.85)" : "scale(1)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-none bg-gold/30 animate-ping" style={{ borderRadius: 0 }} />
        <button
          data-booking-trigger=""
          onClick={() => setStep("form")}
          className="relative btn-gold text-charcoal font-bold tracking-[0.14em] uppercase text-xs px-6 py-4 flex items-center gap-3 shadow-2xl"
          style={{ borderRadius: 0, boxShadow: "0 8px 40px rgba(201,168,76,0.35)" }}
        >
          <span className="text-base">📅</span>
          <span>Book Consultation</span>
        </button>
      </div>
    </>
  )
}
