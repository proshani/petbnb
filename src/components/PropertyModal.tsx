"use client"

import { useState, useEffect } from "react"
import type { Property } from "@/types/realestate"

interface PropertyModalProps {
  property: Property
  isFavorite: boolean
  onToggleFavorite: () => void
  onClose: () => void
}

function formatPrice(price: number): string {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  return `$${(price / 1000).toFixed(0)}K`
}

interface ViewingForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
}

export default function PropertyModal({
  property,
  isFavorite,
  onToggleFavorite,
  onClose,
}: PropertyModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [showViewingForm, setShowViewingForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [form, setForm] = useState<ViewingForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<ViewingForm>>({})

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const validate = () => {
    const e: Partial<ViewingForm> = {}
    if (!form.name.trim()) e.name = "Required"
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required"
    if (!form.date) e.date = "Required"
    if (!form.time) e.time = "Required"
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setFormSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-warm-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-charcoal">
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium">
              {property.type}
            </p>
            <h2 className="font-serif text-xl font-bold text-white">{property.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleFavorite}
              className="w-10 h-10 border border-white/20 hover:border-gold flex items-center justify-center transition-all"
            >
              <span className={`text-xl ${isFavorite ? "text-red-400" : "text-white/50"}`}>
                {isFavorite ? "♥" : "♡"}
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 border border-white/20 hover:border-white flex items-center justify-center text-white/60 hover:text-white transition-all text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left: Images + Description */}
          <div className="lg:col-span-2 p-6">
            {/* Main Image */}
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-3">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {property.badge && (
                <span className="absolute top-4 left-4 bg-gold text-charcoal text-xs font-bold tracking-wider px-3 py-1">
                  {property.badge}
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mb-6">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-gold"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">
                About This Property
              </h3>
              <p className="text-mid-gray text-sm leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-mid-gray">
                    <span className="text-gold text-xs">✦</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-40 bg-light-gray rounded-xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl block mb-1">📍</span>
                <p className="text-mid-gray text-sm">
                  {property.address}, {property.city}
                </p>
                <p className="text-mid-gray/60 text-xs mt-1">Interactive map coming soon</p>
              </div>
            </div>
          </div>

          {/* Right: Details + Booking */}
          <div className="lg:col-span-1 p-6 bg-white border-t lg:border-t-0 lg:border-l border-light-gray">
            {/* Price */}
            <div className="mb-6">
              <p className="font-serif text-3xl font-bold text-charcoal">
                {formatPrice(property.price)}
              </p>
              <p className="text-mid-gray text-sm mt-1">{property.address}</p>
              <p className="text-mid-gray text-sm">{property.city}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Beds", value: property.beds },
                { label: "Baths", value: property.baths },
                { label: "Sq Ft", value: property.sqft.toLocaleString() },
                { label: "Year Built", value: property.yearBuilt },
                { label: "Lot Size", value: property.lotSize },
                { label: "Garage", value: `${property.garage} car` },
              ].map((spec) => (
                <div key={spec.label} className="bg-light-gray p-3 rounded-xl">
                  <p className="text-mid-gray text-xs uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="text-charcoal font-semibold text-sm">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            {!showViewingForm && !formSubmitted && (
              <button
                onClick={() => setShowViewingForm(true)}
                className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold tracking-wider uppercase py-4 transition-all duration-200 hover:scale-[1.02] text-sm mb-3"
              >
                Schedule a Viewing
              </button>
            )}

            {/* Viewing Form */}
            {showViewingForm && !formSubmitted && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h4 className="font-serif font-semibold text-charcoal mb-4">Schedule a Viewing</h4>
                {(
                  [
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "email", label: "Email Address", type: "email" },
                    { key: "phone", label: "Phone (optional)", type: "tel" },
                  ] as const
                ).map(({ key, label, type }) => (
                  <div key={key}>
                    <input
                      type={type}
                      placeholder={label}
                      value={form[key]}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className={`w-full border px-4 py-2.5 text-sm text-charcoal placeholder-mid-gray/60 focus:outline-none focus:border-gold transition-colors ${
                        errors[key] ? "border-red-400" : "border-light-gray"
                      }`}
                    />
                    {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      className={`w-full border px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold transition-colors ${
                        errors.date ? "border-red-400" : "border-light-gray"
                      }`}
                    />
                  </div>
                  <div>
                    <select
                      value={form.time}
                      onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                      className={`w-full border px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold transition-colors ${
                        errors.time ? "border-red-400" : "border-light-gray"
                      }`}
                    >
                      <option value="">Time</option>
                      <option>Morning (9–12)</option>
                      <option>Afternoon (12–5)</option>
                      <option>Evening (5–8)</option>
                    </select>
                  </div>
                </div>
                <textarea
                  placeholder="Message (optional)"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={3}
                  className="w-full border border-light-gray px-4 py-2.5 text-sm text-charcoal placeholder-mid-gray/60 focus:outline-none focus:border-gold transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-charcoal hover:bg-charcoal/80 text-white font-semibold tracking-wider uppercase py-3.5 transition-all duration-200 text-sm"
                >
                  Confirm Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowViewingForm(false)}
                  className="w-full text-mid-gray hover:text-charcoal text-sm py-1 transition-colors"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* Success */}
            {formSubmitted && (
              <div className="text-center py-6 bg-light-gray rounded-xl">
                <span className="text-4xl block mb-3">✓</span>
                <p className="font-serif font-semibold text-charcoal mb-1">Request Received</p>
                <p className="text-mid-gray text-sm">
                  Our agent will contact you within 24 hours to confirm your viewing.
                </p>
              </div>
            )}

            {/* Agent teaser */}
            <div className="mt-4 pt-4 border-t border-light-gray flex items-center gap-3">
              <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center text-gold text-lg font-serif font-bold flex-shrink-0">
                L
              </div>
              <div>
                <p className="text-charcoal text-xs font-semibold">LUXE Real Estate</p>
                <p className="text-mid-gray text-xs">+1 (310) 555-0100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
