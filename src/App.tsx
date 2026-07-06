import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion, type Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, Code2, Layers, Zap, Globe, Shield, Cpu,
  Star, CheckCircle2
} from 'lucide-react'
import './index.css'
import AmbientParticles from './components/AmbientParticles'
import SectionWave from './components/SectionWave'
import Navbar from './components/Navbar'
import InteractiveShowcase from './components/InteractiveShowcase'
import MetricsGrid from './components/MetricsGrid'

function useWindowSize() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    handler()
    return () => window.removeEventListener('resize', handler)
  }, [])
  return { width }
}

const HeroCanvas = lazy(() => import('./components/HeroCanvas'))
const ServicesBackground = lazy(() => import('./components/ServicesBackground'))

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { width } = useWindowSize()
  const isMobile = width < 768

  const staggerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
  }
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0b0f19',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '160px',
      }}
    >
      <div
        className="hero-canvas-wrap"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect()
          mouseRef.current = {
            x: ((e.clientX - r.left) / r.width - 0.5) * 2,
            y: -((e.clientY - r.top) / r.height - 0.5) * 2,
          }
        }}
        onMouseLeave={() => { mouseRef.current = { x: 0, y: 0 } }}
      >
        <Suspense fallback={null}>
          <HeroCanvas mouseRef={mouseRef} />
        </Suspense>
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'rgba(11, 15, 25, 0.9)'
          : 'linear-gradient(105deg, rgba(11, 15, 25, 0.98) 0%, rgba(11, 15, 25, 0.92) 38%, rgba(11, 15, 25, 0.25) 62%, transparent 75%)',
      }} />

      <AmbientParticles />

      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 3rem)',
        width: '100%', position: 'relative', zIndex: 2,
      }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{
            maxWidth: isMobile ? '100%' : '640px',
            paddingTop: '100px',
            paddingBottom: '120px',
          }}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 800,
              letterSpacing: '0.22em',
              fontSize: '10px',
              textTransform: 'uppercase',
            }}>
              <span>Est. 2018 — Software Architecture Group</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem',
            }}
          >
            Software<br />
            <span className="gradient-text" style={{ fontWeight: 900 }}>engineering</span><br />
            <span style={{ fontWeight: 300 }}>built to scale.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              lineHeight: 1.8,
              color: '#94a3b8',
              maxWidth: '480px',
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}
          >
            We design, develop, and deploy production-grade software applications.
            Our code is clean, our architectures are robust, and our process is highly transparent.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary" id="hero-cta-primary">
              Get in touch <ArrowRight size={14} />
            </a>

            <a href="#work" className="nav-link text-xs uppercase tracking-wider font-bold" id="hero-cta-work" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              textDecoration: 'none',
              padding: '0.5rem 0',
            }}>
              Explore work
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: '4rem',
              display: 'flex', alignItems: 'center',
              gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap',
            }}
          >
            {[
              { val: '150+', label: 'Shipped products' },
              { val: '99.9%', label: 'SLA uptime' },
              { val: '100%', label: 'IP ownership' },
            ].map(({ val, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <div style={{
                    width: '1px',
                    height: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', fontWeight: 900,
                    color: '#ffffff', lineHeight: 1,
                  }}>{val}</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 650, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '150px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: '#64748b', fontSize: '10px', letterSpacing: '0.15em', fontWeight: 700, zIndex: 2,
        }}
      >
        <span>SCROLL DOWN</span>
      </motion.div>

      <SectionWave fillColor="#131926" />
    </section>
  )
}

const SERVICES = [
  { icon: <Code2 size={20} />, title: 'Full-Stack Engineering', desc: 'Clean Next.js frontends, scalable REST/GraphQL APIs, and robust application architectures.', color: '#94a3b8' },
  { icon: <Cpu size={20} />, title: 'AI & Machine Learning', desc: 'Custom LLM integrations, computer vision pipelines, and intelligent agentic workflows.', color: '#94a3b8' },
  { icon: <Globe size={20} />, title: 'Cloud & DevOps', desc: 'High-availability infrastructure, automated CI/CD pipelines, and AWS/GCP cost optimizations.', color: '#94a3b8' },
  { icon: <Layers size={20} />, title: 'Product Design (UI/UX)', desc: 'Stark, grid-aligned interface systems, precise typography hierarchy, and interactive prototypes.', color: '#94a3b8' },
  { icon: <Zap size={20} />, title: 'Performance Optimization', desc: 'Database query tuning, Core Web Vitals, lazy loading, and edge caching strategies.', color: '#94a3b8' },
  { icon: <Shield size={20} />, title: 'Security & Compliance', desc: 'OWASP best practices, penetration testing, and HIPAA/GDPR compliance assurance.', color: '#94a3b8' },
]

interface ServiceCardProps {
  svc: typeof SERVICES[0];
  index: number;
  isDesktop: boolean;
  isTablet: boolean;
}

function ServiceCard({ svc, index, isDesktop, isTablet }: ServiceCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null!)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  let gridColumn = 'span 1'
  if (isDesktop) {
    if (index === 0 || index === 3 || index === 5) gridColumn = 'span 2'
  } else if (isTablet) {
    if (index === 0 || index === 3) gridColumn = 'span 2'
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        gridColumn,
        borderRadius: '1.25rem',
        padding: '2.5rem',
        position: 'relative',
        background: 'rgba(11, 15, 25, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'default',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
      }}
      whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.1)', transition: { duration: 0.3 } }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, borderRadius: 'inherit',
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.025), transparent 80%)`,
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '0.75rem',
          background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem', color: '#e2e8f0',
        }}>{svc.icon}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.85rem', letterSpacing: '-0.01em' }}>{svc.title}</h3>
        <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.875rem', fontWeight: 300, maxWidth: '520px' }}>{svc.desc}</p>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        <span>Learn more</span> <ArrowRight size={12} />
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const { width } = useWindowSize()
  const isDesktop = width >= 1024
  const isTablet = width >= 768 && width < 1024

  return (
    <section id="services" style={{ background: '#131926', position: 'relative', padding: '8rem 0 160px', overflow: 'hidden' }}>
      <AmbientParticles />
      <div style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={null}>
          <ServicesBackground />
        </Suspense>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>capabilities</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, color: '#ffffff', marginTop: '1rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Solutions that <span style={{ fontWeight: 900 }} className="gradient-text">move</span> the needle
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '1.25rem auto 0', lineHeight: 1.75, fontSize: '0.92rem', fontWeight: 300 }}>End-to-end software engineering for companies demanding absolute quality.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr', gap: '1.5rem' }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} isDesktop={isDesktop} isTablet={isTablet} />
          ))}
        </div>
      </div>
      <SectionWave fillColor="#0b0f19" />
    </section>
  )
}

import WorkCard, { type AccentColor } from './components/WorkCard'
const PROJECTS: { title: string; badge: string; description: string; techStack: string[]; imageUrl: string; accentColor: AccentColor; isReversed: boolean }[] = [
  { title: 'HealthTrack AI', badge: '40+ HOSPITALS', description: 'Real-time patient monitoring platform with ML anomaly detection, serving 40+ hospitals across 3 continents with 99.97% uptime.', techStack: ['REACT', 'PYTHON', 'TENSORFLOW', 'AWS'], imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80', accentColor: 'cyan', isReversed: false },
  { title: 'FinFlow Dashboard', badge: '2M+ TX/SEC', description: 'High-frequency trading analytics platform processing 2M+ transactions/sec with sub-5ms latency and real-time risk scoring.', techStack: ['NEXT.JS', 'RUST', 'POSTGRESQL', 'REDIS'], imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80', accentColor: 'fuchsia', isReversed: true },
]

export function WorkSection() {
  return (
    <section id="work" style={{ background: '#0b0f19', position: 'relative', padding: '8rem 0 160px', overflow: 'hidden' }}>
      <AmbientParticles />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>case studies</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#ffffff', marginTop: '0.85rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Products we're <span style={{ fontWeight: 900 }} className="gradient-text">proud of</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {PROJECTS.map((project) => (
            <WorkCard key={project.title} title={project.title} badge={project.badge} description={project.description} techStack={project.techStack} imageUrl={project.imageUrl} accentColor={project.accentColor} isReversed={project.isReversed} />
          ))}
        </div>
      </div>
      <SectionWave fillColor="#131926" />
    </section>
  )
}

const TECH_ITEMS = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
]

function TechCard({ tech }: { tech: typeof TECH_ITEMS[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      style={{
        flexShrink: 0, width: '140px', background: 'rgba(11, 15, 25, 0.45)', border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '1rem', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem', cursor: 'default', transition: 'all 0.3s ease', margin: '0 0.5rem',
      }}
    >
      <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'grayscale(1) opacity(0.65)' }}>
        <img src={tech.logo} alt={tech.name} width={40} height={40} style={{ objectFit: 'contain', width: '40px', height: '40px', filter: tech.name === 'Next.js' ? 'invert(1)' : 'none' }} loading="lazy" />
      </div>
      <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center' }}>{tech.name}</span>
    </motion.div>
  )
}

export function TechStackSection() {
  const doubled = [...TECH_ITEMS, ...TECH_ITEMS]
  return (
    <section id="tech" style={{ background: '#131926', position: 'relative', padding: '8rem 0 160px', overflow: 'hidden' }}>
      <AmbientParticles />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', marginBottom: '4rem', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>toolkit</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#ffffff', marginTop: '0.85rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Built with <span style={{ fontWeight: 900 }} className="gradient-text">battle-tested</span> tech
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '1.25rem auto 0', lineHeight: 1.75, fontSize: '0.92rem', fontWeight: 300 }}>We leverage modern, production-proven technologies to ship reliable, scalable software.</p>
        </div>
      </div>

      <div className="tech-scroll-container" style={{ padding: '0.5rem 0', position: 'relative', zIndex: 2 }}>
        <div className="tech-scroll-track animate-marquee" style={{ display: 'flex', alignItems: 'center' }}>
          {doubled.map((tech, i) => <TechCard key={`${tech.name}-${i}`} tech={tech} />)}
        </div>
      </div>

      <div className="tech-scroll-container" style={{ padding: '0.5rem 0', marginTop: '1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', width: 'max-content', animation: 'marquee 30s linear infinite reverse' }}>
          {[...doubled].reverse().map((tech, i) => <TechCard key={`rev-${tech.name}-${i}`} tech={tech} />)}
        </div>
      </div>
      <SectionWave fillColor="#0b0f19" />
    </section>
  )
}

export function AboutSection() {
  const STATS = [
    { val: '8+', label: 'Years of experience', desc: 'In the trenches since 2018' },
    { val: '150+', label: 'Projects shipped', desc: 'Across 12 countries' },
    { val: '40+', label: 'Expert engineers', desc: 'Full-time, no outsourcing' },
    { val: '99.9%', label: 'Uptime SLA', desc: 'We stand behind our work' },
  ]
  const VALUES = [
    'Radical transparency on timelines and costs',
    'Code quality enforced via CI/CD and thorough reviews',
    'Documentation-first engineering culture',
    'Agile sprints with real-time client visibility',
    'No lock-in — you own your codebase 100%',
  ]

  return (
    <section id="about" style={{ background: '#0b0f19', position: 'relative', padding: '8rem 0 160px', overflow: 'hidden' }}>
      <AmbientParticles />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Who we are</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1.5rem', marginTop: '1rem', lineHeight: 1.15 }}>
              A team of builders,<br />not just <span style={{ fontWeight: 900 }} className="gradient-text">coders</span>
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.92rem', fontWeight: 300 }}>CRUX was founded by engineers who were frustrated with the gap between beautiful mockups and mediocre implementations. We hire T-shaped engineers who care deeply about product thinking, not just ticket-pushing.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {VALUES.map(v => (
                <div key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginTop: '3px', strokeWidth: 2 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, fontWeight: 300 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: 'rgba(19, 25, 38, 0.65)', borderRadius: '1.25rem', padding: '1.75rem 1.5rem', border: '1px solid rgba(255, 255, 255, 0.04)', boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.4)' }}>
                <div className="stat-number gradient-text" style={{ paddingBottom: '0.5rem' }}>{s.val}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 650, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionWave fillColor="#131926" />
    </section>
  )
}

const TESTIMONIALS = [
  {
    quote: "CRUX delivered our trading analytics platform in 10 weeks — clean architecture, zero critical bugs at launch. Genuinely the best engineering team we've worked with.",
    name: 'Marcus Chen',
    title: 'CTO, FinFlow Capital',
    rating: 5,
  },
  {
    quote: "They turned our healthcare MVP into a production-grade system serving 40 hospitals. Radical transparency throughout — we always knew exactly where things stood.",
    name: 'Dr. Sarah Okonkwo',
    title: 'Co-founder, HealthTrack AI',
    rating: 5,
  },
  {
    quote: "Our Core Web Vitals went from red to green in two sprints. CRUX's performance engineers are the real deal — every optimization was measured and explained.",
    name: 'James Whitfield',
    title: 'VP Engineering, Retailo',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: '#131926', position: 'relative', padding: '8rem 0 160px', overflow: 'hidden' }}>
      <AmbientParticles />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>testimonials</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#ffffff', marginTop: '0.85rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Clients who <span style={{ fontWeight: 900 }} className="gradient-text">trust us</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '1.25rem auto 0', lineHeight: 1.75, fontSize: '0.92rem', fontWeight: 300 }}>
            Don't take our word for it — here's what the teams we've built with have to say.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.1)' }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(11, 15, 25, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '1.25rem',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: '0.92rem', fontWeight: 300, fontStyle: 'italic', flexGrow: 1 }}>
                "{t.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', flexShrink: 0,
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SectionWave fillColor="#0b0f19" />
    </section>
  )
}

export function ContactFooter() {
  return (
    <section id="contact" style={{ background: '#0b0f19', position: 'relative', padding: '8rem 0 6rem', overflow: 'hidden' }}>
      <AmbientParticles />
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 2.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
          Start a project
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#ffffff', marginTop: '0.85rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Ready to build something <span style={{ fontWeight: 900 }} className="gradient-text">exceptional?</span>
        </h2>
        <p style={{ color: '#94a3b8', maxWidth: '520px', margin: '1.5rem auto 0', lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 300 }}>
          Tell us about your project. We'll respond within 24 hours with a clear plan of action.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.75rem', flexWrap: 'wrap' }}>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#ffffff', fontWeight: 700, fontSize: '0.9rem',
              padding: '0.85rem 2.25rem', borderRadius: '0.75rem',
              textDecoration: 'none', letterSpacing: '0.01em',
              boxShadow: '0 8px 32px -8px rgba(99,102,241,0.55)',
            }}
          >
            Let's Talk
          </motion.a>
          <motion.a
            href="mailto:hello@crux.dev"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
              color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem',
              padding: '0.85rem 2.25rem', borderRadius: '0.75rem',
              textDecoration: 'none', letterSpacing: '0.01em',
            }}
          >
            hello@crux.dev
          </motion.a>
        </div>
        <div style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: '#334155', fontSize: '0.8rem' }}>© {new Date().getFullYear()} CRUX. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Careers'].map(link => (
              <a key={link} href="#" style={{ color: '#475569', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <InteractiveShowcase />
        <WorkSection />
        <TechStackSection />
        <MetricsGrid />
        <AboutSection />
        <TestimonialsSection />
        <ContactFooter />
      </main>
    </>
  )
}

export default App;
