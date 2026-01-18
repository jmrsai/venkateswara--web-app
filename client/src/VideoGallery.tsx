import { useState, useEffect } from 'react'
import { Play, Calendar, MapPin, ExternalLink, Loader2 } from 'lucide-react'
import { Language } from './translations'
import { templeService } from './templeService'
import { VideoItem } from './types'

export function VideoGallery({ lang, t }: { lang: Language, t: any }) {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await templeService.getVideos();
            setVideos(data);
            setLoading(false);
        };
        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-gray-500 font-bold italic">Loading Divine Visuals...</p>
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto p-4 animate-divine">
            <div className="mb-16 text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-4 shadow-sm">
                    {t.videoGallery}
                </span>
                <h2 className="text-5xl font-black text-gray-900 mb-4 heading-divine gold-text-glow">{t.ritualsAndFestivals}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto lg:mx-0 mb-6" />
                <p className="text-gray-500 max-w-2xl text-xl font-serif opacity-80 leading-relaxed mx-auto lg:mx-0">
                    "{t.watchRituals}"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {videos.map((video) => (
                    <div key={video.id} className="group glass-morphism rounded-[48px] overflow-hidden border border-white/50 hover:shadow-[0_40px_80px_-20_rgba(154,52,18,0.2)] transition-all duration-700 hover:-translate-y-2">
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 bg-white rounded-full text-orange-600 shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-500 hover:bg-orange-600 hover:text-white"
                                >
                                    <Play className="w-10 h-10 fill-current" />
                                </a>
                            </div>
                            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border border-white/10">
                                Featured Ritual
                            </div>
                            <div className="absolute bottom-4 right-4 divine-gradient text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                <ExternalLink className="w-3.5 h-3.5" />
                                WATCH ON YouTube
                            </div>
                        </div>
                        <div className="p-10">
                            <h3 className="text-2xl font-black text-gray-900 mb-3 truncate leading-tight group-hover:text-orange-600 transition-colors">
                                {lang === 'te' && video.teTitle ? video.teTitle : video.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 h-10 mb-8 opacity-70">
                                {lang === 'te' && video.teDescription ? video.teDescription : video.description}
                            </p>
                            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-orange-100/30 pt-8">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-orange-400" />
                                    Visual Archives
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-orange-400" />
                                    Pendurthi
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
