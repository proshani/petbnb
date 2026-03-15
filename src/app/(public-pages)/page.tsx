import Link from "next/link"

const sitters = [
  {
    name: "Sarah M.",
    initials: "SM",
    rating: 4.9,
    reviews: 128,
    pricePerNight: 45,
    bio: "Lifelong animal lover with 5 years of professional pet sitting experience. I treat every pet like my own. Specializes in anxious and senior dogs.",
    services: ["Dog Walking", "Overnight Sitting"],
  },
  {
    name: "James K.",
    initials: "JK",
    rating: 5.0,
    reviews: 87,
    pricePerNight: 38,
    bio: "Former vet tech turned full-time pet sitter. Your fur babies are in the most qualified hands. Happy to handle medications and special diets.",
    services: ["Drop-In Visits", "Daycare"],
  },
  {
    name: "Priya L.",
    initials: "PL",
    rating: 4.8,
    reviews: 214,
    pricePerNight: 52,
    bio: "Three dogs and a whole lot of love! I offer a cozy home environment with plenty of outdoor time, snuggles, and daily photo updates.",
    services: ["Overnight Sitting", "Dog Walking"],
  },
]

const testimonials = [
  {
    quote:
      "PetBnB completely changed how we travel. Knowing Biscuit is with Sarah gives us total peace of mind. She sends daily photos and updates — we love it!",
    name: "Emily R.",
    pet: "Owner of Biscuit, a 4-year-old Golden Retriever",
    initials: "ER",
  },
  {
    quote:
      "James is incredible. He noticed my cat wasn't eating well and called me right away. That kind of attentiveness is exactly what I needed. Highly recommend!",
    name: "Carlos T.",
    pet: "Owner of Mochi, a 2-year-old tabby cat",
    initials: "CT",
  },
  {
    quote:
      "I was nervous leaving my senior dog for the first time, but Priya made the whole experience so smooth. Max came home happy and clearly loved.",
    name: "Diana W.",
    pet: "Owner of Max, a 10-year-old Labrador",
    initials: "DW",
  },
]

export default function LandingPage() {
  return (
    <div className="text-gray-800">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🐾</span>
            <span>Trusted by 50,000+ pet owners</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
            Your Pet's Home <span className="text-orange-500">Away From Home</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Find verified, loving pet sitters and dog walkers right in your neighborhood. Book in
            minutes, travel with complete peace of mind.
          </p>

          {/* Search bar mockup */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-3 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 flex-1 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
              <span className="text-orange-400 text-lg">📍</span>
              <input
                type="text"
                placeholder="Enter your city or ZIP code"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                readOnly
              />
            </div>
            <div className="flex items-center gap-3 flex-1 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
              <span className="text-orange-400 text-lg">📅</span>
              <span className="text-sm text-gray-400">Select dates</span>
            </div>
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm"
            >
              Find a Sitter
            </Link>
          </div>
          <p className="text-sm text-gray-400">No credit card required to browse sitters.</p>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-orange-500 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
            <div>
              <p className="text-3xl font-extrabold mb-1">50,000+</p>
              <p className="text-orange-100 text-sm font-medium">Happy Pets Cared For</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold mb-1">10,000+</p>
              <p className="text-orange-100 text-sm font-medium">Verified Sitters</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold mb-1">4.9 ★</p>
              <p className="text-orange-100 text-sm font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From search to booking, we make it simple — so you can focus on enjoying your time
              away.
            </p>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Timeline connector (desktop) */}
            <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-orange-200 z-0" />
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Search",
                desc: "Enter your location and dates to find available sitters near you.",
              },
              {
                step: "02",
                icon: "👤",
                title: "Browse Profiles",
                desc: "Read verified reviews, see photos, and compare prices to find the perfect match.",
              },
              {
                step: "03",
                icon: "💳",
                title: "Book & Pay",
                desc: "Securely book your sitter and pay online — no cash, no hassle.",
              },
              {
                step: "04",
                icon: "😊",
                title: "Enjoy Peace of Mind",
                desc: "Receive real-time GPS updates and daily photo check-ins while you're away.",
              },
            ].map((item) => (
              <div key={item.step} className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center text-3xl shadow-sm">
                    {item.icon}
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-400 tracking-widest uppercase">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Whatever your pet needs, we have a service tailored for them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🦮",
                title: "Dog Walking",
                desc: "Daily 30 or 60-minute walks with GPS tracking. Perfect for busy pet parents who need a reliable midday break.",
              },
              {
                icon: "🏠",
                title: "Overnight Sitting",
                desc: "Your sitter stays at your home overnight, keeping your pet's routine intact and eliminating the stress of a new environment.",
              },
              {
                icon: "🐾",
                title: "Drop-In Visits",
                desc: "Quick 30-minute visits for feeding, playtime, and a potty break. Great for cats, small animals, or dogs that don't need full walks.",
              },
              {
                icon: "🐕",
                title: "Doggy Daycare",
                desc: "Full days of supervised play and socialization at your sitter's home. Your pup comes home happily tired.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-300 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why PetBnB ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why PetBnB?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We go beyond basic pet sitting so your furry family member always gets the best care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "Verified Background Checks",
                desc: "Every sitter on PetBnB undergoes a thorough background check before their first booking. You can browse with confidence, knowing every profile is fully verified.",
              },
              {
                icon: "📍",
                title: "GPS Walk Tracking",
                desc: "See exactly where your dog is going in real time. Every walk is GPS-tracked and shared with you, so you never have to wonder.",
              },
              {
                icon: "🏥",
                title: "Vet Emergency Support",
                desc: "In the unlikely event of an emergency, all bookings include access to 24/7 vet support and reimbursement for eligible vet bills.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl bg-orange-50 border border-orange-100"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Sitters ── */}
      <section id="sitters" className="py-20 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Meet Top Sitters Near You
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Handpicked sitters with outstanding reviews, ready to care for your pet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sitters.map((sitter) => (
              <div
                key={sitter.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
              >
                {/* Photo placeholder */}
                <div className="h-44 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {sitter.initials}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{sitter.name}</h3>
                    <span className="text-orange-500 font-bold text-sm">
                      ${sitter.pricePerNight}
                      <span className="text-gray-400 font-normal">/night</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold text-gray-700">{sitter.rating}</span>
                    <span>({sitter.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{sitter.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {sitter.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-orange-50 text-orange-600 border border-orange-100 rounded-full px-3 py-1 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/signup"
                    className="block text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Book {sitter.name.split(" ")[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/signup"
              className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              View All Sitters
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Pet Owners Love PetBnB
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real stories from real pet parents who found their perfect match.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-orange-50 border border-orange-100 rounded-2xl p-8 flex flex-col"
              >
                <div className="text-orange-400 text-3xl mb-4">"</div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">{t.quote}</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download the App ── */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-white text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Manage Bookings on the Go</h2>
              <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                Download the PetBnB app to track walks in real time, chat with your sitter, receive
                photo updates, and manage bookings — all from your pocket.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 cursor-pointer hover:bg-gray-900 transition-colors">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="text-xs text-gray-300">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 cursor-pointer hover:bg-gray-900 transition-colors">
                  <span className="text-2xl">▶</span>
                  <div>
                    <p className="text-xs text-gray-300">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Phone mockup placeholder */}
            <div className="flex-shrink-0">
              <div className="w-48 h-96 bg-white bg-opacity-20 rounded-3xl border-4 border-white border-opacity-40 flex flex-col items-center justify-center shadow-2xl">
                <div className="w-28 h-4 bg-white bg-opacity-30 rounded-full mb-6" />
                <span className="text-6xl mb-4">🐾</span>
                <div className="space-y-2 w-32">
                  <div className="h-2 bg-white bg-opacity-30 rounded-full" />
                  <div className="h-2 bg-white bg-opacity-20 rounded-full w-3/4" />
                  <div className="h-2 bg-white bg-opacity-30 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Pet's Perfect Sitter?
          </h2>
          <p className="text-gray-500 mb-8">
            Join thousands of happy pet owners. Create your free account in under a minute.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg transition-colors shadow-lg shadow-orange-200"
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}
