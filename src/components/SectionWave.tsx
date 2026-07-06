interface SectionWaveProps {
  fillColor: string; // Now accepts a raw hex color like '#111c38'
}

export default function SectionWave({ fillColor }: SectionWaveProps) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'translate3d(0, 1px, 0)', // Hardware accelerated fix to prevent 1px gap
      zIndex: 10,
    }}>
      <svg 
        viewBox="0 0 1440 120" 
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '80px',
        }}
        preserveAspectRatio="none"
      >
        <path 
          fill={fillColor}
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        ></path>
      </svg>
    </div>
  )
}
