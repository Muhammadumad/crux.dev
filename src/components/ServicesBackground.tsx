import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function BlobShape({ position, color, scale }: {
  position: [number, number, number]
  color: string
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={0.5}
          speed={1.5}
          roughness={0.2}
          metalness={0.2}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  )
}

export default function ServicesBackground() {
  return (
    <div className="canvas-wrapper" style={{ opacity: 0.5 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} color="#1b2a47" />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />
        <directionalLight position={[-5, -5, 5]} intensity={0.8} color="#ff6b8a" />
        <BlobShape position={[-3, 1, 0]} color="#00d4ff" scale={2.2} />
        <BlobShape position={[3, -1, -2]} color="#ff6b8a" scale={1.8} />
        <BlobShape position={[0, 0, -3]} color="#a78bfa" scale={1.4} />
      </Canvas>
    </div>
  )
}
