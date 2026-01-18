import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars, Float, PerspectiveCamera, Environment, Sparkles, ContactShadows, Text, Center } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { Maximize, Flame, Heart, Eye, Target, Sparkle, RotateCcw, Box, Info } from 'lucide-react'
import { SiteConfig } from './types'

// Texture Generator Helper for sacred effects
function createSacredTexture(type: 'petal' | 'flame' | 'aura'): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    if (type === 'petal') {
        const pGrad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
        pGrad.addColorStop(0, '#f9a8d4')
        pGrad.addColorStop(0.5, '#f472b6')
        pGrad.addColorStop(1, 'rgba(219, 39, 119, 0)')
        ctx.fillStyle = pGrad
        ctx.beginPath()
        ctx.ellipse(64, 64, 20, 50, 0, 0, 2 * Math.PI)
        ctx.fill()
    } else if (type === 'flame') {
        const gradient = ctx.createRadialGradient(64, 96, 0, 64, 64, 64)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.2, 'rgba(255, 255, 150, 0.9)')
        gradient.addColorStop(0.5, 'rgba(255, 150, 0, 0.6)')
        gradient.addColorStop(0.8, 'rgba(255, 50, 0, 0.2)')
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(64, 64, 30, 60, 0, 0, 2 * Math.PI)
        ctx.fill()
    } else {
        const auraGrad = ctx.createRadialGradient(64, 64, 20, 64, 64, 60)
        auraGrad.addColorStop(0, 'rgba(255, 215, 0, 0.4)')
        auraGrad.addColorStop(1, 'rgba(255, 215, 0, 0)')
        ctx.fillStyle = auraGrad
        ctx.beginPath()
        ctx.arc(64, 64, 60, 0, Math.PI * 2)
        ctx.fill()
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
}

function DivineAura() {
    const auraRef = useRef<THREE.Group>(null)
    const texture = useMemo(() => createSacredTexture('aura'), [])

    useFrame((state) => {
        if (auraRef.current) {
            auraRef.current.rotation.z += 0.002
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
            auraRef.current.scale.set(pulse, pulse, pulse)
        }
    })

    return (
        <group ref={auraRef} position={[0, 0, -2]}>
            {texture && (
                <sprite scale={[15, 15, 1]}>
                    <spriteMaterial map={texture} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
                </sprite>
            )}
            <Sparkles count={40} scale={10} size={1.5} speed={0.2} color="#ffd700" />
        </group>
    )
}

function FlowerRain({ active }: { active: boolean }) {
    const texture = useMemo(() => createSacredTexture('petal'), [])
    const groupRef = useRef<THREE.Group>(null)
    const flowers = useMemo(() => {
        return Array.from({ length: 60 }).map(() => ({
            pos: new THREE.Vector3((Math.random() - 0.5) * 15, 15 + Math.random() * 10, (Math.random() - 0.5) * 8),
            speed: 0.04 + Math.random() * 0.08,
            sway: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            scale: 0.2 + Math.random() * 0.2
        }))
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return
        groupRef.current.visible = active
        if (!active) return

        groupRef.current.children.forEach((child, i) => {
            const f = flowers[i]
            if (f) {
                child.position.y -= f.speed
                child.position.x += Math.sin(state.clock.elapsedTime * 1.5 + f.sway) * 0.03
                child.rotation.z += f.rotSpeed
                if (child.position.y < -10) {
                    child.position.y = 15 + Math.random() * 5
                    child.position.x = (Math.random() - 0.5) * 15
                }
            }
        })
    })

    return (
        <group ref={groupRef}>
            {texture && flowers.map((f, i) => (
                <sprite key={i} position={f.pos} scale={[f.scale, f.scale, 1]}>
                    <spriteMaterial map={texture} transparent opacity={0.8} depthWrite={false} />
                </sprite>
            ))}
        </group>
    )
}

function DeepHarathi({ active }: { active: boolean }) {
    const lightRef = useRef<THREE.PointLight>(null)
    const spriteRef = useRef<THREE.Sprite>(null)
    const texture = useMemo(() => createSacredTexture('flame'), [])

    useFrame((state) => {
        if (!lightRef.current || !spriteRef.current) return
        lightRef.current.visible = active
        spriteRef.current.visible = active
        if (!active) return

        const time = state.clock.getElapsedTime()
        const angle = time * 2.0
        const radius = 5.5
        const height = Math.sin(angle * 0.4) * 2.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius + 5

        lightRef.current.position.set(x, height, z)
        spriteRef.current.position.set(x, height, z)
        lightRef.current.intensity = 4 + Math.random() * 3
        spriteRef.current.scale.setScalar(2 + Math.random() * 0.5)
    })

    return (
        <>
            <pointLight ref={lightRef} color="#ff8800" distance={15} decay={1.5} />
            {texture && (
                <sprite ref={spriteRef}>
                    <spriteMaterial map={texture} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
                </sprite>
            )}
        </>
    )
}

function Model({ url }: { url: string }) {
    const geom = useLoader(STLLoader, url)

    useMemo(() => {
        if (geom) {
            geom.computeBoundingBox()
            geom.center()
        }
    }, [geom])

    if (!geom) return (
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4, 8, 2]} />
            <meshStandardMaterial color="#333" wireframe opacity={0.3} transparent />
        </mesh>
    )

    return (
        <Center top>
            <group>
                {/* Main Statue */}
                <mesh castShadow receiveShadow geometry={geom}>
                    <meshStandardMaterial
                        color="#ffd700"
                        metalness={0.95}
                        roughness={0.05}
                        envMapIntensity={2}
                        emissive="#442200"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Divine Glow Layer */}
                <mesh scale={[1.01, 1.01, 1.01]} geometry={geom}>
                    <meshStandardMaterial
                        color="#fff"
                        transparent
                        opacity={0.05}
                        wireframe
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>
        </Center>
    )
}

interface Props {
    config: SiteConfig
}

export default function ThreeDDarshan({ config }: Props) {
    const [viewPreset, setViewPreset] = useState<'face' | 'feet' | 'full'>('full')
    const [isArathi, setIsArathi] = useState(false)
    const [isPushpanjali, setIsPushpanjali] = useState(false)
    const [autoRotate, setAutoRotate] = useState(true)

    // Dynamic configuration with defaults
    const threeD = config.threeDConfig || {
        stlUrl: config.stlUrl || '/tirupati.stl',
        modelScale: 0.15,
        initialRotation: [0, 0, 0],
        ambientIntensity: 0.8,
        pointIntensity: 1.5,
        spotIntensity: 2.5,
        lightColor: '#ffffff'
    }

    const stlUrl = threeD.stlUrl

    const cameraSettings = {
        face: { pos: [0, 5, 12], target: [0, 5, 0] },
        feet: { pos: [0, -5, 12], target: [0, -5, 0] },
        full: { pos: [0, 0, 20], target: [0, 1, 0] }
    }

    return (
        <div className="w-full h-[700px] md:h-[850px] rounded-[48px] overflow-hidden relative glass-morphism border border-white/20 shadow-2xl bg-[#020205]">
            {/* Header Overlay */}
            <div className="absolute top-10 left-10 z-20 pointer-events-none flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <Sparkle className="w-8 h-8 text-orange-400 animate-pulse" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-white heading-divine leading-none tracking-tight mb-2 flex items-center gap-3">
                        Divine <span className="text-orange-500">3D Darshan</span>
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30 text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">
                            Sacred Experience
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Live Presence</span>
                    </div>
                </div>
            </div>

            {/* View Controls */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5 p-4 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl">
                {(['face', 'feet', 'full'] as const).map((v) => (
                    <button
                        key={v}
                        onClick={() => { setViewPreset(v); setAutoRotate(false); }}
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all group ${viewPreset === v ? 'bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] scale-110' : 'bg-white/5 text-orange-200 hover:bg-white/10'}`}
                    >
                        {v === 'face' && <Eye className="w-6 h-6" />}
                        {v === 'feet' && <Target className="w-6 h-6" />}
                        {v === 'full' && <Maximize className="w-6 h-6" />}
                        <span className="text-[7px] font-black uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{v}</span>
                    </button>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-12 items-center px-10 py-6 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl">
                <button
                    onClick={() => { setIsArathi(true); setAutoRotate(false); setTimeout(() => setIsArathi(false), 8000); }}
                    disabled={isArathi}
                    className="group flex flex-col items-center gap-3"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isArathi ? 'bg-orange-600 border-orange-400 shadow-[0_0_50px_rgba(234,88,12,0.8)]' : 'bg-black/60 border-orange-900/50 hover:border-orange-500 hover:scale-110'}`}>
                        <Flame className={`w-10 h-10 ${isArathi ? 'text-white animate-pulse' : 'text-orange-500'}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200/60 group-hover:text-orange-400 transition-colors">Harathi</span>
                </button>

                <div className="h-10 w-px bg-white/10" />

                <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="flex flex-col items-center gap-3 group"
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${autoRotate ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'bg-black/60 border-gray-800 text-gray-500'}`}>
                        <RotateCcw className={`w-8 h-8 ${autoRotate ? 'animate-spin-slow' : ''}`} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60">Auto Rotation</span>
                </button>

                <div className="h-10 w-px bg-white/10" />

                <button
                    onClick={() => { setIsPushpanjali(true); setTimeout(() => setIsPushpanjali(false), 6000); }}
                    disabled={isPushpanjali}
                    className="group flex flex-col items-center gap-3"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isPushpanjali ? 'bg-rose-600 border-rose-400 shadow-[0_0_50px_rgba(225,29,72,0.8)]' : 'bg-black/60 border-rose-900/50 hover:border-rose-500 hover:scale-110'}`}>
                        <Heart className={`w-10 h-10 ${isPushpanjali ? 'text-white animate-bounce' : 'text-rose-500'}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200/60 group-hover:text-rose-400 transition-colors">Pushpanjali</span>
                </button>
            </div>

            <Canvas shadows gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <Stars radius={200} depth={60} count={6000} factor={6} saturation={0.5} fade speed={2} />
                    <Sparkles count={150} scale={30} size={2} speed={0.4} color="#4f46e5" opacity={0.2} />

                    <ambientLight intensity={threeD.ambientIntensity} />
                    <pointLight position={[10, 15, 10]} intensity={threeD.pointIntensity} color={threeD.lightColor} castShadow />
                    <spotLight position={[-15, 25, 15]} angle={0.25} penumbra={1} intensity={threeD.spotIntensity} color={threeD.lightColor} castShadow />

                    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
                        <group scale={threeD.modelScale} rotation={threeD.initialRotation}>
                            <Model url={stlUrl} />
                        </group>
                    </Float>

                    <DivineAura />
                    <DeepHarathi active={isArathi} />
                    <FlowerRain active={isPushpanjali} />

                    <Environment preset="night" />

                    <OrbitControls
                        enablePan={false}
                        autoRotate={autoRotate}
                        autoRotateSpeed={1.0}
                        minDistance={8}
                        maxDistance={35}
                        target={cameraSettings[viewPreset].target as [number, number, number]}
                        makeDefault
                    />
                    <PerspectiveCamera
                        makeDefault
                        fov={40}
                        position={cameraSettings[viewPreset].pos as [number, number, number]}
                    />
                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />
                </Suspense>
            </Canvas>

            {/* Interaction Tip */}
            <div className="absolute top-10 right-32 z-20">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <Info className="w-4 h-4 text-orange-400" />
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">Drag to Orbit • Scroll to Zoom</span>
                </div>
            </div>
        </div>
    )
}
