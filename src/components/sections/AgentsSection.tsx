"use client"

import { useInView } from "@/hooks/useInView"
import { agents } from "@/data/agents"

export default function AgentsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="agents" className="py-28 bg-charcoal relative overflow-hidden">
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute top-8 right-10 font-serif font-bold text-white/[0.025] pointer-events-none select-none leading-none"
        style={{ fontSize: "clamp(60px, 8vw, 120px)" }}
      >
        05
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className={`h-px bg-gold mb-6 transition-all duration-1000 ${inView ? "w-14" : "w-0"}`}
          />
          <p
            className="text-gold font-medium mb-3"
            style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase" }}
          >
            Our Team
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Toronto&apos;s Best{" "}
            <span className="italic text-gradient-gold">Real Estate Agents</span>
          </h2>
          <p className="text-white/40 max-w-lg text-base leading-relaxed mt-4">
            Handpicked for deep knowledge of Toronto&apos;s luxury market, professional
            integrity, and a track record of exceptional client outcomes.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/[0.07]">
          {agents.map((agent, i) => (
            <div
              key={agent.id}
              className={`group relative overflow-hidden transition-all duration-700 border-r border-white/[0.07] last:border-r-0 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              {/* Photo */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 text-center">
                  <p className="text-white/60 text-xs mb-1 tracking-wider uppercase">
                    {agent.specialization}
                  </p>
                  <p className="text-white text-sm font-medium mb-4">{agent.phone}</p>
                  <button
                    onClick={() =>
                      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="btn-gold text-charcoal text-xs font-bold tracking-[0.2em] uppercase px-6 py-2.5"
                  >
                    Book Consultation
                  </button>
                </div>

                {/* Rating chip — always visible */}
                <div className="absolute top-4 right-4 bg-gold text-charcoal text-xs font-bold px-2.5 py-1 flex items-center gap-1">
                  <span>★</span>
                  <span>{agent.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-charcoal border-t border-white/[0.07]">
                <h3 className="font-serif text-lg font-bold text-white mb-0.5">{agent.name}</h3>
                <p
                  className="text-gold mb-1"
                  style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}
                >
                  {agent.title}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.07]">
                  <div>
                    <p
                      className="text-white/25"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      Deals
                    </p>
                    <p className="text-white font-bold text-sm">{agent.deals}</p>
                  </div>
                  <button
                    onClick={() =>
                      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-gold hover:text-white text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 flex items-center gap-1.5"
                  >
                    Contact <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
