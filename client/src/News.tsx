import { useState, useEffect } from 'react'
import { Calendar, ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { Language } from './translations'
import { templeService } from './templeService'
import { NewsItem } from './types'

export function News({ lang, t }: { lang: Language, t: any }) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await templeService.getNews();
            setNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-gray-400 font-bold italic uppercase tracking-widest">Gathering Divine Updates...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 animate-divine">
            <div className="mb-16 text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-4 shadow-sm">
                    Temple News
                </span>
                <h2 className="text-5xl font-black text-gray-900 mb-4 heading-divine gold-text-glow">Announcements & Updates</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto lg:mx-0 mb-6" />
                <p className="text-gray-500 max-w-2xl text-xl font-serif opacity-80 leading-relaxed mx-auto lg:mx-0">
                    Stay connected with the latest happenings, festivals, and spiritual discourses at Venkathadri Pendurthi.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {news.map((item, index) => (
                    <div key={item.id} className="group flex flex-col md:flex-row bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100">
                        <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                            <img src={item.imageUrl || `https://picsum.photos/seed/${item.id}/800/600`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 p-8 flex flex-col">
                            <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-orange-600">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                {item.content}
                            </p>
                            <div className="mt-auto pt-6 border-t border-gray-50">
                                <button className="text-orange-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                                    Read Full Story
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {news.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold italic">No news updates at the moment. Check back soon for divine blessings.</p>
                </div>
            )}
        </div>
    );
}
