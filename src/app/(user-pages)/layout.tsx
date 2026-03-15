import { getServerSession } from "next-auth"
import { authOptions } from "@/config/nextAuthOptions/authOptions"
import SessionProvider from "@/components/SessionProvider"

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return <SessionProvider session={session}>{children}</SessionProvider>
}
