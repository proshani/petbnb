"use client"

import { useInView } from "@/hooks/useInView"

const INSTAGRAM_HANDLE = "luxe.toronto"
const INSTAGRAM_URL = `https://www.instagram.com/`

const posts = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    likes: "1,284",
    caption:
      "Just listed in Yorkville 🏡 Breathtaking 5BR estate with floor-to-ceiling windows and private terrace. $6.85M CAD. DM for a private showing.",
    tag: "Just Listed",
  },
  {
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
    likes: "2,047",
    caption:
      "SOLD ✅ Another record-breaking sale in Rosedale. Congratulations to my incredible clients on their new forever home. #GTARealEstate",
    tag: "Sold",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    likes: "987",
    caption:
      "The Bridle Path — where luxury truly meets nature 🌿 This is what $8.5M looks like in Canada's most prestigious address.",
    tag: "Featured",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=600&q=80",
    likes: "3,162",
    caption:
      "Honoured to receive the Million Dollar Award 2025 🏆 Grateful for every client who trusted me with Toronto's most significant purchase.",
    tag: "Award",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80",
    likes: "1,531",
    caption:
      "Forest Hill elegance. 6BR, 7BA, private pool and 3-car garage. Asking $5.4M. This is what a forever home looks like 🌟",
    tag: "New Listing",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
    likes: "876",
    caption:
      "King West living redefined 🌆 Modern, vibrant, iconic. New penthouse listing dropping this week — follow for updates.",
    tag: "Coming Soon",
  },
]

const tagColors: Record<string, string> = {
  "Just Listed": "bg-gold text-charcoal",
  Sold: "bg-white/90 text-charcoal",
  Featured: "bg-gold/90 text-charcoal",
  Award: "bg-white text-charcoal",
  "New Listing": "bg-gold text-charcoal",
  "Coming Soon": "bg-white/80 text-charcoal",
}

export default function InstagramSection() {
  const { ref, inView } = useInView()

  return (
    <section id="instagram" className="py-24 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div
              className={`h-px bg-gold mb-5 transition-all duration-1000 ${inView ? "w-14" : "w-0"}`}
            />
            <p
              className="text-gold font-medium mb-2"
              style={{ fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase" }}
            >
              Follow the Journey
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              @{INSTAGRAM_HANDLE}
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-white/20 hover:border-gold text-white/70 hover:text-gold px-6 py-3 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 self-start sm:self-auto"
          >
            <span>Follow on Instagram</span>
            <span className="text-base">↗</span>
          </a>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden block transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms`, borderRadius: "4px" }}
            >
              {/* Square aspect ratio */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-5 text-center">
                  <p className="text-white text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                    <span>♥</span>
                    <span>{post.likes}</span>
                  </div>
                </div>

                {/* Tag badge */}
                <div
                  className={`absolute top-3 left-3 text-[9px] font-bold px-2 py-1 tracking-[0.15em] uppercase ${tagColors[post.tag] ?? "bg-gold text-charcoal"}`}
                >
                  {post.tag}
                </div>

                {/* Likes (visible bottom right always) */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-0">
                  <span className="text-white text-xs">♥ {post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-white/8">
          <p className="text-white/35 text-sm mb-5">
            See all listings, sold properties, and behind-the-scenes moments
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block text-charcoal font-bold tracking-[0.2em] uppercase px-10 py-4 text-sm"
          >
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  )
}
