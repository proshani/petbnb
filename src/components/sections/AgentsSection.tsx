"use client"

import { useInView } from "@/hooks/useInView"
import { agents } from "@/data/agents"

export default function AgentsSection() {
  const { ref, inView } = useInView()
  const principal = agents.find((a) => a.featured)
  const team = agents.filter((a) => !a.featured)

  return (
    <section id="agents" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`h-px bg-gold mx-auto mb-6 transition-all duration-1000 ${inView ? "w-14" : "w-0"}`}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Your Trusted Realtor
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Meet <span className="italic text-gradient-gold">Richmondhill Real Estate</span>
          </h2>
          <p className="text-mid-gray max-w-lg mx-auto text-base leading-relaxed">
            Award-winning luxury real estate expert serving Toronto&apos;s most prestigious
            neighbourhoods across the GTA.
          </p>
        </div>

        <div ref={ref}>
          {/* ── Principal — featured full-width card ── */}
          {principal && (
            <div
              className={`mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-charcoal"
                style={{ borderRadius: "12px" }}
              >
                {/* Photo */}
                <div className="relative h-[420px] lg:h-auto overflow-hidden">
                  <img
                    src={principal.photo}
                    alt={principal.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 bg-gold text-charcoal text-[10px] font-bold px-3 py-1.5 tracking-[0.18em] uppercase">
                    🏆 {principal.award}
                  </div>
                  <a
                    href={`https://www.instagram.com/${principal.instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-2 hover:border-gold/60 transition-all duration-200"
                  >
                    <span className="text-white text-sm">📸</span>
                    <span className="text-white/80 text-xs font-medium">
                      @{principal.instagram}
                    </span>
                  </a>
                </div>

                {/* Info */}
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <p
                    className="text-gold font-medium mb-2"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.38em",
                      textTransform: "uppercase",
                    }}
                  >
                    Principal Broker
                  </p>
                  <h3 className="font-serif text-4xl font-bold text-white mb-1">
                    {principal.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-6">{principal.specialization}</p>

                  <div className="flex flex-col gap-3 mb-8">
                    {[
                      { icon: "🏆", text: "Million Dollar Award Winner 2025" },
                      { icon: "✅", text: "Trusted Realtor in the GTA" },
                      { icon: "⭐", text: "5.0 Rating · 200+ Deals Closed" },
                      {
                        icon: "📍",
                        text: "Toronto · Yorkville · Rosedale · Forest Hill · Bridle Path",
                      },
                    ].map((c) => (
                      <div key={c.text} className="flex items-start gap-3">
                        <span className="text-base mt-0.5 flex-shrink-0">{c.icon}</span>
                        <span className="text-white/65 text-sm leading-snug">{c.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/10">
                    {[
                      { v: "200+", l: "Deals Closed" },
                      { v: "5.0★", l: "Client Rating" },
                      { v: "15 Yrs", l: "Experience" },
                    ].map((s) => (
                      <div key={s.l}>
                        <p className="text-gold font-serif font-bold text-2xl leading-none">
                          {s.v}
                        </p>
                        <p
                          className="text-white/35 mt-1"
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                          }}
                        >
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn-gold text-charcoal font-bold tracking-[0.18em] uppercase px-8 py-3.5 text-sm flex-1"
                    >
                      Book a Consultation
                    </button>
                    <a
                      href={`https://www.instagram.com/${principal.instagram}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/20 text-white/70 hover:border-gold hover:text-gold font-medium tracking-[0.12em] uppercase px-6 py-3.5 text-sm transition-all duration-200 text-center"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Supporting Team ── */}
          <div>
            <p
              className="text-mid-gray/60 mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}
            >
              The Team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {team.map((agent, i) => (
                <div
                  key={agent.id}
                  className={`group bg-warm-white overflow-hidden transition-all duration-700 card-hover ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${(i + 1) * 120}ms`, borderRadius: "10px" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 bg-gold text-charcoal text-xs font-bold px-2 py-1 flex items-center gap-1">
                      <span>★</span>
                      <span>{agent.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base font-bold text-charcoal mb-0.5">
                      {agent.name}
                    </h3>
                    <p
                      className="text-gold mb-1"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {agent.title}
                    </p>
                    <p className="text-mid-gray text-xs">{agent.specialization}</p>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-light-gray">
                      <span className="text-charcoal font-bold text-sm">{agent.deals} deals</span>
                      <button
                        onClick={() =>
                          document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="text-charcoal hover:text-gold text-xs font-bold tracking-[0.12em] uppercase transition-colors duration-200"
                      >
                        Contact →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
