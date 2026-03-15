import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-orange-500">PetBnB</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/#how-it-works" className="hover:text-orange-500 transition-colors">
              How It Works
            </Link>
            <Link href="/#services" className="hover:text-orange-500 transition-colors">
              Services
            </Link>
            <Link href="/#sitters" className="hover:text-orange-500 transition-colors">
              Find a Sitter
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
