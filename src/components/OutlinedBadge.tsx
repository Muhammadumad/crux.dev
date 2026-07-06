import React from 'react'
import { motion } from 'framer-motion'

// Props for OutlinedBadge (Static Tag)
export interface OutlinedBadgeProps {
  text: string;
  icon?: React.ElementType; // Match user spec
  className?: string; // For custom layout overrides
}

// OutlinedBadge (Typography-First, Borderless Version)
export const OutlinedBadge: React.FC<OutlinedBadgeProps> = ({
  text,
  icon: Icon,
  className = '',
}) => {
  const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }> | undefined

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-2 
        text-[10px] font-extrabold tracking-[0.2em] uppercase text-cyan-400 
        select-none whitespace-nowrap bg-transparent
        ${className}
      `}
    >
      {IconComponent && <IconComponent size={12} className="text-cyan-400 stroke-[2.5]" />}
      <span>{text}</span>
    </span>
  )
}

// Props for OutlinedButton (Clickable/Animated Button)
export interface OutlinedButtonProps {
  text: string;
  icon?: React.ElementType; // Match user spec
  onClick?: () => void;
  className?: string; // For custom layout overrides
}

// OutlinedButton (Minimalist Hover Reveal Underline Version)
export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  text,
  icon: Icon,
  onClick,
  className = '',
}) => {
  const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }> | undefined
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        relative inline-flex items-center justify-center gap-2 
        py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-cyan-400/90 hover:text-cyan-300
        bg-transparent cursor-pointer select-none whitespace-nowrap
        transition-colors duration-300 outline-none
        ${className}
      `}
    >
      {IconComponent && (
        <IconComponent 
          size={13} 
          className="text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300 stroke-[2.5]" 
        />
      )}
      <span>{text}</span>
      {/* Minimal Underline Hover Reveal */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(34, 211, 238, 0.7)',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </motion.button>
  )
}
