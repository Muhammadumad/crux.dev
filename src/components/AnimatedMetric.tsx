import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedMetricProps {
  value: number
  suffix: string
  label: string
  description: string
  decimals?: number
  duration?: number
}

export default function AnimatedMetric({
  value,
  suffix,
  label,
  description,
  decimals = 0,
  duration = 2.5
}: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals)
  })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: 'easeOut'
      })
      return controls.stop
    }
  }, [isInView, value, count, duration])

  return (
    <div ref={ref} className="flex flex-col text-left py-6 select-none">
      <div className="flex items-baseline">
        <motion.span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          {rounded}
        </motion.span>
        <span className="text-4xl md:text-5xl font-black text-cyan-400 ml-1">
          {suffix}
        </span>
      </div>
      
      <div className="text-xs text-slate-400 font-extrabold uppercase tracking-widest mt-3">
        {label}
      </div>
      
      <div className="text-xs text-slate-500 font-light mt-1 max-w-[220px]">
        {description}
      </div>
    </div>
  )
}
