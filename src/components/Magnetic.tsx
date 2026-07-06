import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MagneticProps {
  children: React.ReactElement
  strength?: number
}

export default function Magnetic({ children, strength = 0.15 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Verify if pointer is close enough to trigger magnetic pull
    const triggerRadius = Math.max(width, height) * 1.5
    const distance = Math.hypot(distanceX, distanceY)

    if (distance < triggerRadius) {
      setIsHovered(true)
      setPosition({ x: distanceX * strength, y: distanceY * strength })
    } else {
      setIsHovered(false)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.015 : 1 // physically tags the cursor, scaling up by exactly 1.5% on entry
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, // stiffness: 120
        damping: 20,    // damping: 20
        mass: 0.2
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}
