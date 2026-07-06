import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const THEMES = {
  cyan: {
    accent: '#38bdf8',
    textColor: 'text-sky-400',
    hoverText: 'group-hover:text-sky-400',
    gradientBg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(0, 0, 0, 0))',
  },
  fuchsia: {
    accent: '#f472b6',
    textColor: 'text-pink-400',
    hoverText: 'group-hover:text-pink-400',
    gradientBg: 'linear-gradient(135deg, rgba(244, 114, 182, 0.05), rgba(0, 0, 0, 0))',
  },
} as const

export type AccentColor = keyof typeof THEMES

export interface WorkCardProps {
  title: string
  badge: string
  description: string
  techStack: string[]
  imageUrl: string
  projectUrl?: string
  isReversed?: boolean
  accentColor: AccentColor
}

export default function WorkCard({
  title,
  badge,
  description,
  techStack,
  imageUrl,
  projectUrl = '#contact',
  isReversed = false,
  accentColor,
}: WorkCardProps) {
  const theme = THEMES[accentColor]
  const containerRef = useRef<HTMLDivElement>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)
  
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth, { passive: true })
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // GSAP ScrollTrigger clip-path unmasking
  useEffect(() => {
    const triggerEl = imgContainerRef.current
    if (!triggerEl) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        triggerEl,
        { clipPath: 'inset(15% 0% 15% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: 1, // Smooth unmasking tied to scroll
          },
          ease: 'power3.out',
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 3D Tilt Spring Physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.4 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relativeX)
    mouseY.set(relativeY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="w-full py-16 md:py-24 border-b border-white/5 last:border-0"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Image Presentation Slab (Col-span 7) */}
        <div
          className={`relative lg:col-span-7 ${
            isReversed ? 'lg:order-last lg:col-start-6' : 'lg:col-start-1'
          }`}
        >
          <div
            ref={imgContainerRef}
            className="relative overflow-hidden rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
            style={{ willChange: 'clip-path' }}
          >
            <motion.div
              style={{
                rotateX: isDesktop ? rotateX : 0,
                rotateY: isDesktop ? rotateY : 0,
                transformStyle: 'preserve-3d',
              }}
              className="relative group cursor-pointer"
            >
              {/* Subtle ambient spotlight layer */}
              <div
                style={{ background: theme.gradientBg }}
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
              />

              <img
                src={imageUrl}
                alt={`${title} Preview`}
                className="w-full h-auto object-cover block rounded-2xl transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.015]"
              />
              
              {/* Digital slab glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay z-20 rounded-2xl" />
            </motion.div>
          </div>
        </div>

        {/* Typography Block (Col-span 5) */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className={`flex flex-col justify-center lg:col-span-5 ${
            isReversed 
              ? 'lg:col-start-1 lg:pr-12' 
              : 'lg:col-start-8 lg:pl-12'
          }`}
        >
          {/* Eyebrow Label */}
          <motion.div
            variants={textItemVariants}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className={`w-3.5 h-3.5 ${theme.textColor}`} />
            <span className="text-xs font-bold tracking-[0.22em] text-slate-400 uppercase">
              {badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h3
            variants={textItemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-6"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            variants={textItemVariants}
            className="text-base text-slate-350 leading-relaxed font-light mb-8"
          >
            {description}
          </motion.p>

          {/* Tech Stack Pipe Display */}
          <motion.div
            variants={textItemVariants}
            className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8"
          >
            {techStack.join('   /   ')}
          </motion.div>

          {/* Clean Link */}
          <motion.div variants={textItemVariants}>
            <a
              href={projectUrl}
              className={`group inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-white uppercase transition-colors duration-300 ${theme.hoverText}`}
            >
              <span>Explore Project</span>
              <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
