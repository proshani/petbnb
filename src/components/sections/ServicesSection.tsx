"use client"

import { useInView } from "@/hooks/useInView"

const services = [
  {
    icon: "🏡",
    title: "Buy a Home",
    description:
      "Our Toronto buyer specialists navigate every neighbourhood from Bridle Path to King West with unrivalled expertise. We secure the right property at the right price — every time.",
    cta: "Start Your Search",
    target: "properties",
  },
  {
    icon: "📈",
    title: "Sell a Home",
    description:
      "Our proven Toronto marketing strategy consistently achieves 12–18% above asking price. Professional staging, editorial photography, and access to our private buyer network make the difference.",
    cta: "Get a Valuation",
    target: "cta",
  },
  {
    icon: "🔑",
    title: "Property Management",
    description:
      "From tenant screening to quarterly inspections, we manage your Toronto investment with the same care we give to $10M estates. Your asset is always in expert hands.",
    cta: "Learn More",
    target: "cta",
  },
  {
    icon: "💼",
    title: "Investment Advisory",
    description:
      "Toronto's real estate market is one of North America's most dynamic. Our investment advisors provide data-driven analysis to help you build generational wealth through property.",
    cta: "Meet an Advisor",
    target: "agents",
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView()

  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`h-px bg-gold mx-auto mb-6 transition-all duration-1000 ${
              inView ? "w-14" : "w-0"
            }`}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            What We Do
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Full-Service Toronto
            <br />
            <span className="italic text-gradient-gold">Real Estate</span>
          </h2>
          <p className="text-mid-gray max-w-xl mx-auto text-base leading-relaxed">
            Whether buying your first Toronto home or expanding your portfolio, our team brings
            decades of combined local expertise to every transaction.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative bg-warm-white border border-light-gray p-8 overflow-hidden cursor-pointer transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 90}ms`,
                transitionProperty: "opacity, transform",
                borderRadius: "12px",
              }}
              onClick={() =>
                document.getElementById(service.target)?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {/* Hover fill */}
              <div className="absolute inset-0 bg-charcoal scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out" />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-4xl block mb-6 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-3">
                  {service.icon}
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-white mb-3 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-mid-gray group-hover:text-white/60 text-sm leading-relaxed mb-6 transition-colors duration-300">
                  {service.description}
                </p>
                <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold flex items-center gap-2 transition-all duration-200">
                  {service.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
