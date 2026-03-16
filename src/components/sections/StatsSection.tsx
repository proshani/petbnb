"use client"

import { useInView } from "@/hooks/useInView"
import { useCountUp } from "@/hooks/useCountUp"

interface StatProps {
  value: number
  suffix: string
  prefix?: string
  label: string
  sublabel: string
  enabled: boolean
  delay: number
  inView: boolean
}

function Stat({ value, suffix, prefix = "", label, sublabel, enabled, delay, inView }: StatProps) {
  const count = useCountUp(value, 2400, enabled)

  return (
    <div
      className={`text-center transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Number */}
      <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold mb-2 leading-none">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      {/* Label */}
      <p className="text-white text-sm font-semibold tracking-wide mb-1">{label}</p>
      <p className="text-white/35 text-xs tracking-[0.1em]">{sublabel}</p>
    </div>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView()

  const stats = [
    {
      value: 1200,
      suffix: "+",
      label: "Properties Sold",
      sublabel: "Across the GTA",
    },
    {
      value: 2,
      suffix: "B+",
      prefix: "$",
      label: "In Total Sales",
      sublabel: "Toronto market value",
    },
    {
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      sublabel: "Based on 500+ reviews",
    },
    {
      value: 15,
      suffix: "+",
      label: "Years in Toronto",
      sublabel: "Established 2009",
    },
  ]

  return (
    <section className="bg-charcoal py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, #c9a84c 40px, #c9a84c 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #c9a84c 40px, #c9a84c 41px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className={`h-px bg-gold mx-auto mb-6 transition-all duration-1000 ${
              inView ? "w-14" : "w-0"
            }`}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-4">
            The LUXE Toronto Difference
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Numbers That
            <span className="text-gradient-gold italic"> Speak </span>
            for Themselves
          </h2>
        </div>

        {/* Stats grid */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <Stat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              sublabel={stat.sublabel}
              enabled={inView}
              delay={i * 130}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom row */}
        <div
          className={`mt-20 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {[
            {
              icon: "🏆",
              title: "#1 Luxury Brokerage",
              desc: "Toronto Real Estate Board, 2023",
            },
            {
              icon: "🌐",
              title: "Global Network",
              desc: "Connected to Sotheby's & Christie's International",
            },
            {
              icon: "📜",
              title: "TREB & RECO Certified",
              desc: "Fully accredited Ontario real estate professionals",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-2xl mb-1">{item.icon}</span>
              <p className="text-white font-semibold text-sm">{item.title}</p>
              <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
