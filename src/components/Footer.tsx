"use client"

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="bg-charcoal text-white/55">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-2xl font-bold text-white tracking-widest">LUXE</span>
              <div className="flex flex-col ml-1">
                <span className="text-gold text-[10px] font-medium tracking-[0.35em] uppercase leading-none">
                  Toronto
                </span>
                <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase leading-tight">
                  Real Estate
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs mt-4">
              Toronto&apos;s most trusted luxury real estate agency. Exceptional properties,
              extraordinary service, since 2009.
            </p>
            <div className="flex gap-3 mb-6">
              {[
                { label: "in", name: "LinkedIn" },
                { label: "ig", name: "Instagram" },
                { label: "tw", name: "Twitter" },
                { label: "fb", name: "Facebook" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.name}
                  className="w-9 h-9 border border-white/15 hover:border-gold hover:text-gold flex items-center justify-center text-xs uppercase transition-all duration-200"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Properties
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Buy a Home",
                "Sell a Home",
                "New Developments",
                "Luxury Estates",
                "Investment Properties",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo("properties")}
                    className="hover:text-gold transition-colors duration-200 text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Neighbourhoods */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Neighbourhoods
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Yorkville",
                "Rosedale",
                "Forest Hill",
                "King West",
                "The Beaches",
                "Bridle Path",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo("neighborhoods")}
                    className="hover:text-gold transition-colors duration-200 text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Toronto Office
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Address</p>
                <p>100 King Street West</p>
                <p>Suite 5600</p>
                <p>Toronto, ON M5X 1C9</p>
              </li>
              <li>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Phone</p>
                <p>+1 (416) 555-0100</p>
              </li>
              <li>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Email</p>
                <p>hello@luxe.ca</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <div>
            <p>© 2026 LUXE Toronto Real Estate. All rights reserved.</p>
            <p className="mt-0.5 text-white/15">
              Licensed under the Real Estate and Business Brokers Act (REBBA), Ontario.
            </p>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "FINTRAC Policy"].map((item) => (
              <button key={item} className="hover:text-gold transition-colors duration-200">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
