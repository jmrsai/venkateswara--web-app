import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch(err => {
                    console.log("Autoplay prevented:", err)
                })
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Attempt autoplay if allowed (usually needs user interaction)
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (audioRef.current && !isPlaying) {
                // We don't force play on first interaction to avoid scaring the user,
                // but we keep the audio ready.
            }
        }
        window.addEventListener('click', handleFirstInteraction, { once: true })
        return () => window.removeEventListener('click', handleFirstInteraction)
    }, [isPlaying])

    return (
        <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-center gap-2">
            <audio
                ref={audioRef}
                loop
                src="https://www.tirumala.org/music/slogan.mp3"
            />
            <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isPlaying
                        ? 'bg-orange-600 text-white animate-pulse'
                        : 'bg-white text-gray-400 hover:text-orange-600 border border-gray-100'
                    }`}
                title={isPlaying ? "Mute Chant" : "Play Divine Chant"}
            >
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity duration-500 ${isPlaying ? 'text-orange-600 opacity-100' : 'opacity-0'}`}>
                Divine Chant
            </span>
        </div>
    )
}
