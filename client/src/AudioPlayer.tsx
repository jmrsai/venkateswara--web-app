import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume, Volume2, Music, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Language } from './translations'
import { templeService } from './templeService'
import { LibraryItem } from './types'

export function AudioPlayer({ lang, t }: { lang: Language, t: any }) {
    const [playlist, setPlaylist] = useState<LibraryItem[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
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

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
        }
        if (val > 0) setIsMuted(false);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            const nextMuted = !isMuted;
            setIsMuted(nextMuted);
            audioRef.current.muted = nextMuted;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (loading || playlist.length === 0) return null;

    return (
        <>
            {/* Floating Toggle Button */}
            <div className={`fixed bottom-6 right-6 z-[70] transition-all duration-500 scale-in ${!isHidden ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                <button
                    onClick={() => setIsHidden(false)}
                    className="group flex items-center gap-3 bg-white/90 backdrop-blur-xl border-2 border-orange-500/20 p-2 pr-6 rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
                >
                    <div className={`w-12 h-12 divine-gradient rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-[360deg] transition-all duration-700 ${isPlaying ? 'animate-pulse' : ''}`}>
                        <Music className={`w-6 h-6 ${isPlaying ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="flex flex-col items-start translate-y-[-1px]">
                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-0.5">
                            <span>{isPlaying ? 'Now Playing' : 'Divine Audio'}</span>
                        </span>
                        <span className="text-xs font-black text-gray-900 heading-divine truncate max-w-[120px]">
                            <span>{isPlaying ? (lang === 'te' ? track.teTitle : track.title) : 'Listen Now'}</span>
                        </span>
                    </div>
                    {isPlaying && (
                        <div className="flex gap-1 items-end h-3 ml-2">
                            <div className="w-1 h-2 bg-orange-600 animate-[music-bar_0.6s_ease-in-out_infinite_alternate]" />
                            <div className="w-1 h-3 bg-orange-600 animate-[music-bar_0.8s_ease-in-out_infinite_alternate_0.2s]" />
                            <div className="w-1 h-2 bg-orange-600 animate-[music-bar_0.7s_ease-in-out_infinite_alternate_0.1s]" />
                        </div>
                    )}
                </button>
            </div>

            <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-out transform ${isHidden ? 'translate-y-full opacity-0' : isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-5.5rem)] md:translate-y-[calc(100%-5rem)]'}`}>
                {/* Audio Element */}
                <audio
                    ref={audioRef}
                    src={track.url}
                    onEnded={nextTrack}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={(e) => {
                        handleTimeUpdate();
                        if (audioRef.current) {
                            audioRef.current.volume = volume;
                            audioRef.current.muted = isMuted;
                        }
                    }}
                />

                {/* Backdrop Blur Bar */}
                <div className="glass-morphism border-t-2 border-orange-500/10 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] pb-safe relative">
                    {/* Floating Close/Minimize Handle */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                        <button
                            onClick={() => setIsHidden(true)}
                            className="bg-gray-900 text-white p-2 rounded-full shadow-xl hover:bg-orange-600 transition-colors active:scale-90"
                            title="Hide"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Progress Bar (Mobile and Desktop) */}
                    <div className="absolute top-0 left-0 right-0 -translate-y-[1px]">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1 cursor-pointer accent-orange-600 bg-orange-100 hover:h-1.5 transition-all outline-none"
                        />
                    </div>

                    {/* Control Bar */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-20 flex items-center justify-between gap-4 md:gap-6">
                        <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`p-2.5 md:p-3 hover:bg-orange-500/10 rounded-2xl text-orange-600 transition-all active:scale-95 ${isExpanded ? 'bg-orange-500/10' : ''}`}
                            >
                                <ChevronUp className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`p-3 md:p-4 divine-gradient rounded-2xl text-white shadow-lg ${isPlaying ? 'animate-pulse shadow-orange-500/40 ring-4 ring-orange-500/10' : ''} shadow-orange-600/20 flex-shrink-0 transition-all duration-700`}>
                                <Music className={`w-4 h-4 md:w-5 md:h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-[9px] md:text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-0.5"><span>{t.nowPlaying}</span></span>
                                <span className="text-sm md:text-base font-black text-gray-900 truncate heading-divine tracking-tight gold-text-glow">
                                    <span>{lang === 'te' ? track.teTitle : track.title}</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-8">
                            <button onClick={prevTrack} className="p-2 md:p-2.5 hover:bg-orange-500/10 rounded-full text-gray-500 hover:text-orange-600 transition-all hidden sm:block">
                                <SkipBack className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </button>
                            <div className="flex items-center gap-1 md:gap-2">
                                <button
                                    onClick={togglePlay}
                                    className="p-4 md:p-5 divine-gradient text-white rounded-full shadow-[0_10px_30px_-5px_rgba(234,88,12,0.5)] hover:scale-110 active:scale-90 transition-all group"
                                >
                                    {isPlaying ? <Pause className="w-6 h-6 md:w-7 md:h-7 fill-current" /> : <Play className="w-6 h-6 md:w-7 md:h-7 fill-current ml-1" />}
                                </button>
                                <div className="sm:hidden flex flex-col items-center ml-2 border-l border-orange-100 pl-2">
                                    <span className="text-[8px] font-black text-orange-600"><span>{formatTime(currentTime)}</span></span>
                                    <div className="w-px h-2 bg-orange-100 my-0.5" />
                                    <span className="text-[8px] font-black text-gray-400"><span>{formatTime(duration)}</span></span>
                                </div>
                            </div>
                            <button onClick={nextTrack} className="p-2 md:p-2.5 hover:bg-orange-500/10 rounded-full text-gray-500 hover:text-orange-600 transition-all">
                                <SkipForward className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </button>
                        </div>

                        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
                            <div className="flex flex-col items-end mr-4">
                                <span className="text-[10px] font-black text-orange-500"><span>{formatTime(currentTime)} / {formatTime(duration)}</span></span>
                            </div>
                            <button onClick={toggleMute} className="text-gray-400 hover:text-orange-600 transition-colors">
                                {isMuted || volume === 0 ? <Volume className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                            <div className="w-32 group relative flex items-center">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-1.5 cursor-pointer accent-orange-600 bg-gray-200/50 rounded-full appearance-none hover:h-2 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Expanded Content */}
                    <div className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-700 ${isExpanded ? 'opacity-100 translate-y-0 h-auto py-8 md:py-12' : 'opacity-0 translate-y-10 h-0 pointer-events-none'}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pt-4 md:pt-8">
                            <div className="space-y-4 md:space-y-6">
                                <h4 className="text-lg md:text-xl font-black text-gray-900 border-b-2 border-orange-100/30 pb-4 heading-divine uppercase tracking-widest flex items-center gap-3">
                                    <Music className="w-5 h-5 text-orange-600" />
                                    <span>{t.audioPlayer}</span>
                                </h4>
                                <div className="space-y-2 max-h-[250px] md:max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                    {playlist.map((t_item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                                            className={`w-full flex items-center justify-between p-3 md:p-4 rounded-[20px] md:rounded-[24px] transition-all group ${idx === currentTrackIndex ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' : 'hover:bg-white/60 text-gray-600 border border-transparent hover:border-orange-100'}`}
                                        >
                                            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                                <span className={`text-[10px] font-black w-5 flex-shrink-0 ${idx === currentTrackIndex ? 'text-white' : 'opacity-30'}`}><span>{String(idx + 1).padStart(2, '0')}</span></span>
                                                <div className="flex flex-col items-start min-w-0">
                                                    <span className="font-black text-xs md:text-sm truncate w-full"><span>{lang === 'te' && t_item.teTitle ? t_item.teTitle : t_item.title}</span></span>
                                                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest truncate w-full ${idx === currentTrackIndex ? 'text-orange-100' : 'text-gray-400'}`}>
                                                        <span>{lang === 'te' && t_item.teAuthor ? t_item.teAuthor : (t_item.author || 'Temple Archive')}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            {idx === currentTrackIndex && isPlaying && <div className="flex gap-0.5 items-end h-4 ml-2 flex-shrink-0"><div className="w-1 bg-white animate-[music-bar_0.6s_ease-in-out_infinite_alternate]" /><div className="w-1 bg-white animate-[music-bar_0.8s_ease-in-out_infinite_alternate_0.2s]" /><div className="w-1 bg-white animate-[music-bar_0.7s_ease-in-out_infinite_alternate_0.1s]" /></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:flex bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-[48px] p-8 md:p-12 flex-col items-center justify-center text-center border border-white/50 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(234,88,12,0.3)] mb-6 md:mb-8 relative z-10 group-hover:scale-105 transition-transform duration-700">
                                    <div className={`absolute inset-[-10px] boder-[6px] border-orange-600 border-t-transparent border-l-transparent rounded-full ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
                                    <div className={`absolute inset-[-20px] border-[2px] border-orange-400/20 rounded-full ${isPlaying ? 'animate-pulse ring-8 ring-orange-500/5' : ''}`} />
                                    <Music className={`w-12 h-12 md:w-16 md:h-16 text-orange-600 ${isPlaying ? 'animate-bounce' : ''}`} />
                                </div>
                                <h5 className="text-xl md:text-2xl font-black text-gray-900 mb-2 heading-divine relative z-10"><span>{lang === 'te' && track.teTitle ? track.teTitle : track.title}</span></h5>
                                <p className="text-xs md:text-sm font-black text-orange-600 uppercase tracking-[0.2em] opacity-60 relative z-10">
                                    <span>{lang === 'te' && track.teAuthor ? track.teAuthor : (track.author || 'Temple Archive')}</span>
                                </p>

                                {/* Mobile/Tablet Volume Control in Expanded View */}
                                <div className="mt-8 lg:hidden flex items-center gap-4 w-full max-w-xs">
                                    <button onClick={toggleMute} className="text-orange-600">
                                        {isMuted || volume === 0 ? <Volume className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="flex-1 h-1.5 cursor-pointer accent-orange-600 bg-orange-100 rounded-full appearance-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
