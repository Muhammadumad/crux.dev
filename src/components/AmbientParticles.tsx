import React, { useMemo } from 'react'

// Matte desaturated particles — no neon colors
export default function AmbientParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 1.5 + 0.75        // 0.75px – 2.25px (tiny)
      const left = Math.random() * 100
      const duration = Math.random() * 35 + 40       // 40s – 75s (slow)
      const delay = Math.random() * -75
      const drift = `${Math.floor(Math.random() * 60) - 30}px`
      const opacity = Math.random() * 0.12 + 0.04    // 0.04 – 0.16 (very dim)

      return {
        id: i,
        style: {
          position: 'absolute' as const,
          left: `${left}%`,
          bottom: '-6px',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: `rgba(226, 232, 240, ${opacity})`, // slate-200, desaturated
          animation: `floatUpParticle ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          '--drift': drift,
          pointerEvents: 'none' as const,
        }
      }
    })
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes floatUpParticle {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-105vh) translateX(var(--drift)); opacity: 0; }
        }
      `}</style>
      {particles.map(p => (
        <div key={p.id} style={p.style as React.CSSProperties} />
      ))}
    </div>
  )
}
