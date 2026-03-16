import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import IntroScreen from "@/components/IntroScreen"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <IntroScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
