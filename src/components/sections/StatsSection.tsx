"use client"

import { useInView } from "@/hooks/useInView"
import { useCountUp } from "@/hooks/useCountUp"

interface StatProps {
  value: number
  suffix: string
  prefix?: string
  label: string
  sublabel: string
  bgText: string
  enabled: boolean
  delay: number
  inView: boolean
  borderRight?: boolean
}

function Stat({
  value,
  suffix,
  prefix = "",
  label,
  sublabel,
  bgText,
  enabled,
  delay,
  inView,
  borderRight,
}: StatProps) {
  const count = useCountUp(value, 2400, enabled)

  return (
    <div
      className={`relative overflow-hidden px-8 py-14 ${borderRight ? "border-r border-white/[0.07]" : ""}`}
    >
      {/* Massive watermark number */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-2 font-serif font-bold text-white pointer-events-none select-none leading-none"
        style={{
          fontSize: "clamp(90px, 11vw, 170px)",
          opacity: 0.04,
          transform: "translateY(15%)",
        }}
      >
        {bgText}
      </div>

      <div
        className={`relative z-10 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Number */}
        <p
          className="font-serif font-bold text-gradient-gold leading-none mb-5"
          style={{ fontSize: "clamp(3rem, 4.5vw, 5.5rem)" }}
        >
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </p>

        {/* Gold divider */}
        <div
          className="h-px bg-gradient-to-r from-gold/60 to-transparent mb-4 transition-all duration-1000"
          style={{ width: inView ? "48px" : "0px", transitionDelay: `${delay + 200}ms` }}
        />

        <p className="text-white font-semibold text-sm tracking-wide mb-1.5">{label}</p>
        <p className="text-white/35 text-xs leading-relaxed">{sublabel}</p>
      </div>
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
      sublabel: "Closed transactions across the GTA",
      bgText: "1K",
    },
    {
      value: 2,
      suffix: "B+",
      prefix: "$",
      label: "In Total Sales",
      sublabel: "Volume transacted since 2009",
      bgText: "2B",
    },
    {
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      sublabel: "Rated 5 stars by 500+ buyers",
      bgText: "98",
    },
    {
      value: 15,
      suffix: "+",
      label: "Years in the GTA",
      sublabel: "Deep local expertise since 2009",
      bgText: "15",
    },
  ]

  return (
    <section id="stats" className="bg-charcoal relative overflow-hidden">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute top-8 right-10 font-serif font-bold text-white/[0.025] pointer-events-none select-none leading-none"
        style={{ fontSize: "clamp(60px, 8vw, 120px)" }}
      >
        02
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-0">
        {/* Header */}
        <div
          className={`mb-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className={`h-px bg-gold mb-6 transition-all duration-1000 ${inView ? "w-14" : "w-0"}`}
          />
          <p
            className="text-gold font-medium mb-2"
            style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase" }}
          >
            By the Numbers
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Numbers That{" "}
            <span className="text-gradient-gold italic">Speak</span>
          </h2>
        </div>
      </div>

      {/* Stats row — edge to edge with dividers */}
      <div
        ref={ref}
        className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.07] mt-8"
      >
        {stats.map((s, i) => (
          <Stat
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            prefix={s.prefix}
            label={s.label}
            sublabel={s.sublabel}
            bgText={s.bgText}
            enabled={inView}
            delay={i * 120}
            inView={inView}
            borderRight={i < stats.length - 1}
          />
        ))}
      </div>

      {/* Bottom credentials bar */}
      <div
        className={`border-t border-white/[0.07] grid grid-cols-1 sm:grid-cols-3 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "550ms" }}
      >
        {[
          { icon: "🏆", title: "#1 Luxury Brokerage", desc: "Toronto Real Estate Board" },
          { icon: "🌐", title: "Global Network", desc: "Sotheby's & Christie's International" },
          { icon: "📜", title: "TREB & RECO Certified", desc: "Fully accredited Ontario professionals" },
        ].map((item, i) => (
          <div
            key={item.title}
            className={`flex items-center gap-4 px-8 py-7 ${i < 2 ? "border-r border-white/[0.07]" : ""}`}
          >
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div>
              <p className="text-white font-semibold text-sm">{item.title}</p>
              <p className="text-white/35 text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
