import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// ─── Animated Sphere ─────────────────────────────────────────────────────────
function AnimSphere({
  position, color, scale = 1, speed = 1,
}: { position: [number,number,number]; color: string; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.25 * speed
    ref.current.rotation.y = t * 0.4  * speed
  })
  return (
    <Float speed={speed * 1.5} floatIntensity={1.2} rotationIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.65} />
      </mesh>
    </Float>
  )
}

// ─── Animated Torus Knot ──────────────────────────────────────────────────────
function AnimKnot({
  position, color, scale = 1, speed = 1,
}: { position: [number,number,number]; color: string; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.3 * speed
    ref.current.rotation.y = t * 0.5 * speed
  })
  return (
    <Float speed={speed * 2} floatIntensity={1} rotationIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[0.7, 0.22, 128, 16]} />
        <meshStandardMaterial color={color} roughness={0.08} metalness={0.8} />
      </mesh>
    </Float>
  )
}

// ─── Animated Ring ────────────────────────────────────────────────────────────
function AnimRing({
  position, color, scale = 1, speed = 1,
}: { position: [number,number,number]; color: string; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = Math.PI / 3 + t * 0.2 * speed
    ref.current.rotation.z = t * 0.3 * speed
  })
  return (
    <Float speed={speed * 1.8} floatIntensity={0.8} rotationIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.18, 24, 80]} />
        <meshStandardMaterial color={color} roughness={0.05} metalness={0.9} />
      </mesh>
    </Float>
  )
}

// ─── Particle Cloud ───────────────────────────────────────────────────────────
function Particles() {
  const ref = useRef<THREE.Points>(null!)

  const { positions, colors } = useMemo(() => {
    const count = 280
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#ff6b8a'),
      new THREE.Color('#a78bfa'),
    ]
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.025
    ref.current.rotation.x = Math.sin(t * 0.015) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// ─── Scene with mouse tracking ────────────────────────────────────────────────
function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    groupRef.current.rotation.y += (mouseRef.current.x * 0.25 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (-mouseRef.current.y * 0.12 - groupRef.current.rotation.x) * 0.04
  })

  return (
    <group ref={groupRef}>
      {/* Centered composition */}
      <AnimSphere position={[0.0, 0.2,  0.0]} color="#00d4ff" scale={1.5} speed={0.7} />
      <AnimKnot   position={[-1.6, -1.0, -1.0]} color="#ff6b8a" scale={0.75} speed={0.6} />
      <AnimRing   position={[1.4, 1.6,  -0.5]} color="#ffffff" scale={0.8}  speed={1.1} />
      <AnimRing   position={[2.2, -1.5, -1.5]} color="#00d4ff" scale={0.5}  speed={0.85} />
      <AnimSphere position={[-1.2, 1.8, -2.0]} color="#a78bfa" scale={0.65} speed={1.2} />
      <AnimKnot   position={[2.4, 0.5,  -2.5]} color="#00d4ff" scale={0.4}  speed={0.9} />
      <AnimSphere position={[0.5, -2.0, -1.0]} color="#ff6b8a" scale={0.5}  speed={1.0} />
      <Particles />
    </group>
  )
}

// ─── Exported Canvas ──────────────────────────────────────────────────────────
export default function HeroCanvas({
  mouseRef,
}: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 58 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Lighting — no Environment preset so it works offline */}
        <ambientLight intensity={0.5} color="#cce8ff" />
        <directionalLight position={[8, 8, 5]}  intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, 5]} intensity={1.2} color="#00d4ff" />
        <pointLight position={[4, 4, 4]}  intensity={1.8} color="#ff6b8a" decay={2} />
        <pointLight position={[-3, 2, 3]} intensity={0.9} color="#a78bfa" decay={2} />

        <Scene mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
