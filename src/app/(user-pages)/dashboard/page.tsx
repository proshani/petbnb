"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-orange-50">
      <nav className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-orange-500">PetBnB</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, <span className="font-semibold text-gray-900">{session?.user?.name}</span>
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">🐾</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Hey {session?.user?.name?.split(" ")[0]}, your dashboard is ready!
        </h1>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          From here you will manage your bookings, browse sitters, and keep track of your pets.
          Features coming soon!
        </p>
        <Link
          href="/#sitters"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Browse Sitters
        </Link>
      </div>
    </div>
  )
}
