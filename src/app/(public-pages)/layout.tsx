import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import IntroScreen from "@/components/IntroScreen"
import ScrollProgress from "@/components/ScrollProgress"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <IntroScreen />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
