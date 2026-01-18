import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Language } from './translations'
import { templeService } from './templeService'
import { LibraryItem } from './types'

export function AudioPlayer({ lang, t }: { lang: Language, t: any }) {
    const [playlist, setPlaylist] = useState<LibraryItem[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchAudio = async () => {
            const data = await templeService.getLibrary();
            const audioTracks = data.filter(item => item.type === 'audio');
            setPlaylist(audioTracks);
            setLoading(false);
        };
        fetchAudio();
    }, []);

    const track = playlist[currentTrackIndex];

    const togglePlay = () => {
        if (!track) return;
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isPlaying && track) {
            audioRef.current?.play();
        }
    }, [currentTrackIndex]);

    if (loading || playlist.length === 0) return null;

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-out transform ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-5rem)]'}`}>
            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={track.url}
                onEnded={nextTrack}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* Backdrop Blur Bar */}
            <div className="glass-morphism border-t border-white/40 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pb-safe">
                {/* Control Bar */}
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-3 hover:bg-orange-500/10 rounded-2xl text-orange-600 transition-all active:scale-95"
                        >
                            {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
                        </button>
                        <div className={`p-4 divine-gradient rounded-2xl text-white shadow-lg ${isPlaying ? 'animate-pulse' : ''} shadow-orange-600/20`}>
                            <Music className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-0.5">{t.nowPlaying}</span>
                            <span className="text-base font-black text-gray-900 truncate heading-divine tracking-tight gold-text-glow">
                                {lang === 'te' ? track.teTitle : track.title}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <button onClick={prevTrack} className="p-2.5 hover:bg-orange-500/10 rounded-full text-gray-500 hover:text-orange-600 transition-all">
                            <SkipBack className="w-6 h-6 fill-current" />
                        </button>
                        <button
                            onClick={togglePlay}
                            className="p-5 divine-gradient text-white rounded-full shadow-[0_10px_30px_-5px_rgba(234,88,12,0.5)] hover:scale-110 active:scale-90 transition-all group"
                        >
                            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                        </button>
                        <button onClick={nextTrack} className="p-2.5 hover:bg-orange-500/10 rounded-full text-gray-500 hover:text-orange-600 transition-all">
                            <SkipForward className="w-6 h-6 fill-current" />
                        </button>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
                        <Volume2 className="w-5 h-5 text-gray-400" />
                        <div className="w-32 h-2 bg-gray-200/50 rounded-full overflow-hidden shadow-inner">
                            <div className="w-2/3 h-full divine-gradient rounded-full shadow-lg" />
                        </div>
                    </div>
                </div>

                {/* Expanded Content */}
                <div className={`max-w-7xl mx-auto px-6 pb-12 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 translate-y-10 h-0 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                        <div className="space-y-6">
                            <h4 className="text-xl font-black text-gray-900 border-b-2 border-orange-100/30 pb-4 heading-divine uppercase tracking-widest">{t.audioPlayer}</h4>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {playlist.map((t_item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                                        className={`w-full flex items-center justify-between p-4 rounded-[24px] transition-all group ${idx === currentTrackIndex ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' : 'hover:bg-white/60 text-gray-600 border border-transparent hover:border-orange-100'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs font-black w-6 ${idx === currentTrackIndex ? 'text-white' : 'opacity-30'}`}>{String(idx + 1).padStart(2, '0')}</span>
                                            <div className="flex flex-col items-start">
                                                <span className="font-black text-sm">{lang === 'te' && t_item.teTitle ? t_item.teTitle : t_item.title}</span>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${idx === currentTrackIndex ? 'text-orange-100' : 'text-gray-400'}`}>
                                                    {lang === 'te' && t_item.teAuthor ? t_item.teAuthor : (t_item.author || 'Temple Archive')}
                                                </span>
                                            </div>
                                        </div>
                                        {idx === currentTrackIndex && isPlaying && <div className="flex gap-0.5 items-end h-4"><div className="w-1 bg-white animate-[music-bar_0.6s_ease-in-out_infinite_alternate]" /><div className="w-1 bg-white animate-[music-bar_0.8s_ease-in-out_infinite_alternate_0.2s]" /><div className="w-1 bg-white animate-[music-bar_0.7s_ease-in-out_infinite_alternate_0.1s]" /></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:flex bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-[48px] p-12 flex-col items-center justify-center text-center border border-white/50 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(234,88,12,0.3)] mb-8 relative z-10 group-hover:scale-105 transition-transform duration-700">
                                <div className={`absolute inset-[-10px] border-[6px] border-orange-600 border-t-transparent border-l-transparent rounded-full ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
                                <Music className="w-16 h-16 text-orange-600" />
                            </div>
                            <h5 className="text-2xl font-black text-gray-900 mb-2 heading-divine relative z-10">{lang === 'te' && track.teTitle ? track.teTitle : track.title}</h5>
                            <p className="text-sm font-black text-orange-600 uppercase tracking-[0.2em] opacity-60 relative z-10">
                                {lang === 'te' && track.teAuthor ? track.teAuthor : (track.author || 'Temple Archive')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
