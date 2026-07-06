import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { Menu } from 'lucide-react'

// SPA Anchor navigation links to avoid any router context collisions
const NAV_LINKS = [
  { name: 'Services', hash: '#services', key: 'services' },
  { name: 'Tech Stack', hash: '#tech', key: 'tech' },
  { name: 'Case Studies', hash: '#work', key: 'work' },
  { name: 'About', hash: '#about', key: 'about' },
  { name: 'Contact', hash: '#contact', key: 'contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LayoutGroup>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-xl'
            : 'bg-transparent border-b border-transparent py-6'
          }`}
      >
        {/* Relative layout wrapper at full width to enable perfect center docking */}
        <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between relative h-10">

          {/* Logo - Pushed far-left */}
          <div className="flex-shrink-0">
            <a href="#" className="font-sans font-black text-xl tracking-[0.3em] text-white no-underline">
              CRUX
            </a>
          </div>

          {/* Links - Rigidly locked to the mathematical center of the screen layout */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.hash}
                onMouseEnter={() => setHoveredKey(link.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className="relative py-2 text-xs font-bold tracking-[0.22em] text-slate-400 hover:text-white uppercase transition-colors duration-300 no-underline"
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredKey === link.key && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Pill CTA Button - Pushed far-right */}
          <div className="hidden lg:block flex-shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-white/5 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white/10 no-underline"
            >
              Get Started →
            </a>
          </div>

          {/* Mobile Hamburg icon */}
          <button className="lg:hidden text-white bg-transparent border-none outline-none cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </header>
    </LayoutGroup>
  )
}