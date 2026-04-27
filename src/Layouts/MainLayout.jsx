import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import { pageMotionProps } from '../components/ScrollReveal/ScrollReveal.jsx'

export default function MainLayout() {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <div className="flex min-h-dvh min-h-screen flex-col bg-transparent">
      <Navbar />

      <main className="relative flex w-full flex-1 flex-col bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="flex w-full flex-1 flex-col"
            initial={reduced ? false : pageMotionProps.initial}
            animate={pageMotionProps.animate}
            exit={reduced ? undefined : pageMotionProps.exit}
            transition={reduced ? { duration: 0 } : pageMotionProps.transition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
