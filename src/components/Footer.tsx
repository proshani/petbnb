import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold text-orange-400">PetBnB</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting loving pet owners with trusted sitters in every neighborhood.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-orange-400 transition-colors">
                  Dog Walking
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-400 transition-colors">
                  Overnight Sitting
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-400 transition-colors">
                  Drop-In Visits
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-400 transition-colors">
                  Doggy Daycare
                </Link>
              </li>
            </ul>
          </div>

          {/* Pet Owners */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pet Owners</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signup" className="hover:text-orange-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-orange-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#sitters" className="hover:text-orange-400 transition-colors">
                  Browse Sitters
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-orange-400 transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Pet Sitters */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pet Sitters</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signup" className="hover:text-orange-400 transition-colors">
                  Become a Sitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Sitter Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Background Check
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Earnings Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 PetBnB. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
