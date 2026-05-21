"use client"

import { useRef, useEffect, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows, Center, Html } from "@react-three/drei"
import * as THREE from "three"

useGLTF.preload("/models/mesa3d.glb")

function Loader() {
  return (
    <Html center>
      <div
        style={{
          width: "60px",
          aspectRatio: "1",
          display: "flex",
          color: "rgba(255,255,255,0.3)",
          border: "4px solid",
          boxSizing: "border-box",
          borderRadius: "50%",
          background: `
            radial-gradient(circle 5px, currentColor 95%, #0000),
            linear-gradient(currentColor 50%, #0000 0) 50% / 4px 60% no-repeat
          `,
          animation: "spin-loader 2s infinite linear",
        }}
      >
        <div
          style={{
            flex: "1",
            background: "linear-gradient(currentColor 50%, #0000 0) 50% / 4px 80% no-repeat",
            animation: "inherit",
          }}
        />
      </div>
      <style>{`@keyframes spin-loader { 100% { transform: rotate(1turn); } }`}</style>
    </Html>
  )
}

function Model({ spinRef, onReady }: { spinRef?: { current: number }; onReady?: () => void }) {
  const { scene } = useGLTF("/models/mesa3d.glb")
  const groupRef = useRef<THREE.Group>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })
  const curRef = useRef({ x: 0, y: 0, rotX: 0, time: 0 })
  const readyFired = useRef(false)

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseRef.current = { x, y }
    }
    window.addEventListener("mousemove", onMouse, { passive: true })

    let frame = 0
    function checkReady() {
      if (frame++ >= 2) {
        if (!readyFired.current) {
          readyFired.current = true
          onReady?.()
        }
        return
      }
      requestAnimationFrame(checkReady)
    }
    requestAnimationFrame(checkReady)

    return () => window.removeEventListener("mousemove", onMouse)
  }, [onReady])

  useFrame(() => {
    const t = mouseRef.current
    const c = curRef.current
    c.time += 0.02

    const autoRotY = c.time * 0.15 + (spinRef?.current ?? 0)

    c.x += (t.x * 0.4 - c.x) * 0.05
    c.y += (t.y * 0.25 - c.y) * 0.05
    c.rotX += (t.y * -0.2 - c.rotX) * 0.05

    const floatY = Math.sin(c.time) * 0.12
    const breathe = 1 + Math.sin(c.time * 0.4) * 0.015

    if (groupRef.current) {
      groupRef.current.position.x = c.x
      groupRef.current.position.y = c.y + floatY
      groupRef.current.rotation.x = c.rotX
      groupRef.current.rotation.y = autoRotY + t.x * 0.4
      groupRef.current.scale.setScalar(breathe * 1.9)
    }
  })

  const clonedScene = useMemo(() => scene.clone(), [scene])

  useMemo(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  )
}

export default function DJPult3D({ spinRef, onReady }: { spinRef?: { current: number }; onReady?: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.5], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{
        width: "clamp(260px, 45vw, 550px)",
        height: "clamp(260px, 45vw, 550px)",
        display: "block",
        filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.5))",
      }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} />
        <spotLight position={[0, 8, 0]} intensity={0.3} angle={0.5} penumbra={0.5} />
        <Model spinRef={spinRef} onReady={onReady} />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.45} scale={5} blur={2.5} far={3} />
        <Environment files="/models/studio_small_03_1k.hdr" />
      </Suspense>
    </Canvas>
  )
}
