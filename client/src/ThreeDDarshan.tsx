import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars, Float, PerspectiveCamera, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { Maximize, Flame, Heart, Eye, Target } from 'lucide-react'

// Texture Generator Helper
function createTexture(type: 'petal' | 'flame'): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    if (type === 'petal') {
        const pGrad = ctx.createLinearGradient(0, 0, 0, 64)
        pGrad.addColorStop(0, '#f472b6')
        pGrad.addColorStop(1, '#db2777')
        ctx.fillStyle = pGrad
        ctx.beginPath()
        ctx.ellipse(32, 32, 12, 28, 0, 0, 2 * Math.PI)
        ctx.fill()
    } else {
        const gradient = ctx.createRadialGradient(32, 48, 0, 32, 32, 32)
        gradient.addColorStop(0, 'rgba(255, 255, 200, 1)')
        gradient.addColorStop(0.3, 'rgba(255, 150, 0, 0.9)')
        gradient.addColorStop(0.7, 'rgba(255, 50, 0, 0.5)')
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(32, 32, 15, 30, 0, 0, 2 * Math.PI)
        ctx.fill()
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
}

function FlowerRain({ active }: { active: boolean }) {
    const texture = useMemo(() => createTexture('petal'), [])
    const groupRef = useRef<THREE.Group>(null)
    const flowers = useMemo(() => {
        return Array.from({ length: 40 }).map(() => ({
            pos: new THREE.Vector3((Math.random() - 0.5) * 12, 10 + Math.random() * 10, (Math.random() - 0.5) * 5),
            speed: 0.05 + Math.random() * 0.1,
            sway: Math.random() * Math.PI * 2,
            scale: 0.15 + Math.random() * 0.15
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
                child.position.x += Math.sin(state.clock.elapsedTime * 2 + f.sway) * 0.02
                if (child.position.y < -8) child.position.y = 8 + Math.random() * 4
            }
        })
    })

    return (
        <group ref={groupRef}>
            {flowers.map((f, i) => (
                <sprite key={i} position={f.pos} scale={[f.scale, f.scale, 1]}>
                    {texture && <spriteMaterial map={texture} transparent opacity={0.8} />}
                </sprite>
            ))}
        </group>
    )
}

function Harathi({ active }: { active: boolean }) {
    const lightRef = useRef<THREE.PointLight>(null)
    const spriteRef = useRef<THREE.Sprite>(null)
    const texture = useMemo(() => createTexture('flame'), [])

    useFrame((state) => {
        if (!lightRef.current || !spriteRef.current) return
        lightRef.current.visible = active
        spriteRef.current.visible = active
        if (!active) return

        const time = state.clock.getElapsedTime()
        const angle = time * 2.5
        const radius = 4.5
        const height = Math.sin(angle * 0.5) * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius + 3

        lightRef.current.position.set(x, height, z)
        spriteRef.current.position.set(x, height, z)
        lightRef.current.intensity = 3 + Math.random() * 2
    })

    return (
        <>
            <pointLight ref={lightRef} color="#ffaa00" distance={10} decay={2} />
            <sprite ref={spriteRef} scale={[1.8, 1.8, 1]}>
                {texture && <spriteMaterial map={texture} transparent blending={THREE.AdditiveBlending} />}
            </sprite>
        </>
    )
}

function RadianceHalo() {
    const haloRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (haloRef.current) {
            haloRef.current.rotation.z += 0.005
            const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + 1.0
            haloRef.current.scale.set(pulse, pulse, pulse)
        }
    })

    return (
        <group ref={haloRef} position={[0, 0.5, -3]}>
            <mesh>
                <ringGeometry args={[4.8, 5.0, 64]} />
                <meshBasicMaterial color="#ffd700" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
            <mesh scale={[1.1, 1.1, 1]}>
                <ringGeometry args={[4.8, 5.2, 64]} />
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <Sparkles count={40} scale={10} size={1.5} speed={0.15} color="#ffd700" />
        </group>
    )
}

function CelestialNebula() {
    const groupRef = useRef<THREE.Group>(null)
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005
        }
    })

    return (
        <group ref={groupRef}>
            <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} size={1} speed={0.2} opacity={0.15} scale={25} color="#4f46e5" />
            <Sparkles count={150} size={1.5} speed={0.4} opacity={0.25} scale={30} color="#fbbf24" />
        </group>
    )
}

function Model({ url }: { url: string }) {
    const geom = useLoader(STLLoader, url)
    useEffect(() => {
        if (geom) {
            geom.computeBoundingBox()
            geom.center()
        }
    }, [geom])

    return (
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <primitive object={geom} attach="geometry" />
            <meshStandardMaterial
                color="#f1c40f"
                metalness={0.8}
                roughness={0.2}
                emissive="#221100"
                emissiveIntensity={0.1}
            />
        </mesh>
    )
}

export default function ThreeDDarshan() {
    const [viewPreset, setViewPreset] = useState<'face' | 'feet' | 'full'>('full')
    const [isArathi, setIsArathi] = useState(false)
    const [isPushpanjali, setIsPushpanjali] = useState(false)

    const stlUrl = '/tirupati.stl'

    const cameraSettings = {
        face: { pos: [0, 4, 10], target: [0, 4, 0] },
        feet: { pos: [0, -4, 10], target: [0, -4, 0] },
        full: { pos: [0, 0, 18], target: [0, 0, 0] }
    }

    return (
        <div className="w-full h-[650px] md:h-[800px] rounded-[48px] overflow-hidden relative glass-morphism border border-white/20 shadow-2xl bg-[#050508]">
            {/* UI Overlays */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                <div className="p-5 pl-7 bg-black/60 backdrop-blur-3xl border-l-4 border-orange-500 rounded-2xl shadow-2xl">
                    <h3 className="text-2xl font-black text-white heading-divine gold-text-glow uppercase tracking-tighter mb-1">
                        Divya Darshanam
                    </h3>
                    <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-80">
                        Lord Venkateswara Swamy
                    </p>
                </div>
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 p-3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl">
                {(['face', 'feet', 'full'] as const).map((v) => (
                    <button
                        key={v}
                        onClick={() => setViewPreset(v)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${viewPreset === v ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-white/5 text-orange-200 hover:bg-white/10'}`}
                    >
                        {v === 'face' && <Eye className="w-6 h-6" />}
                        {v === 'feet' && <Target className="w-6 h-6" />}
                        {v === 'full' && <Maximize className="w-6 h-6" />}
                    </button>
                ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-10 items-center">
                <button
                    onClick={() => { setIsArathi(true); setTimeout(() => setIsArathi(false), 8000); }}
                    disabled={isArathi}
                    className="flex flex-col items-center gap-3 transition-opacity disabled:opacity-50"
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${isArathi ? 'bg-orange-600 border-orange-400 shadow-[0_0_40px_rgba(234,88,12,0.8)]' : 'bg-black/60 border-orange-900'}`}>
                        <Flame className={`w-8 h-8 ${isArathi ? 'text-white animate-pulse' : 'text-orange-500'}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200">Harathi</span>
                </button>

                <button
                    onClick={() => { setIsPushpanjali(true); setTimeout(() => setIsPushpanjali(false), 5000); }}
                    disabled={isPushpanjali}
                    className="flex flex-col items-center gap-3 transition-opacity disabled:opacity-50"
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${isPushpanjali ? 'bg-rose-600 border-rose-400 shadow-[0_0_40px_rgba(225,29,72,0.8)]' : 'bg-black/60 border-rose-900'}`}>
                        <Heart className={`w-8 h-8 ${isPushpanjali ? 'text-white animate-bounce' : 'text-rose-500'}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200">Pushpanjali</span>
                </button>
            </div>

            <Canvas shadows gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <CelestialNebula />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd700" castShadow />
                    <spotLight position={[-10, 20, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />

                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Model url={stlUrl} />
                    </Float>

                    <RadianceHalo />
                    <Harathi active={isArathi} />
                    <FlowerRain active={isPushpanjali} />

                    <Environment preset="night" />

                    <OrbitControls
                        enablePan={false}
                        minDistance={5}
                        maxDistance={25}
                        makeDefault
                        target={cameraSettings[viewPreset].target as [number, number, number]}
                    />
                    <PerspectiveCamera
                        makeDefault
                        fov={45}
                        position={cameraSettings[viewPreset].pos as [number, number, number]}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}
