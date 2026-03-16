"use client"

import { useInView } from "@/hooks/useInView"
import { agents } from "@/data/agents"

export default function AgentsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="agents" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`h-px bg-gold mx-auto mb-6 transition-all duration-1000 ${
              inView ? "w-14" : "w-0"
            }`}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">Our Team</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Toronto&apos;s Best{" "}
            <span className="italic text-gradient-gold">Real Estate Agents</span>
          </h2>
          <p className="text-mid-gray max-w-lg mx-auto text-base leading-relaxed">
            Handpicked for their deep knowledge of Toronto&apos;s luxury market, professional
            integrity, and track record of client success.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {agents.map((agent, i) => (
            <div
              key={agent.id}
              className={`group bg-warm-white overflow-hidden transition-all duration-700 card-hover ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                borderRadius: "12px",
              }}
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Rating */}
                <div className="absolute bottom-3 right-3 bg-gold text-charcoal text-xs font-bold px-2.5 py-1 flex items-center gap-1">
                  <span>★</span>
                  <span>{agent.rating.toFixed(1)}</span>
                </div>

                {/* Hover contact overlay */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-xs font-medium">{agent.phone}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-0.5">{agent.name}</h3>
                <p className="text-gold text-[10px] tracking-[0.15em] uppercase font-semibold mb-1">
                  {agent.title}
                </p>
                <p className="text-mid-gray text-xs mb-4">{agent.specialization}</p>

                <div className="flex items-center justify-between pt-4 border-t border-light-gray">
                  <div>
                    <p className="text-mid-gray text-[10px] uppercase tracking-wider mb-0.5">
                      Deals Closed
                    </p>
                    <p className="text-charcoal font-bold text-sm">{agent.deals}</p>
                  </div>
                  <button
                    onClick={() =>
                      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-charcoal hover:text-gold text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 flex items-center gap-1"
                  >
                    Contact
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
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
