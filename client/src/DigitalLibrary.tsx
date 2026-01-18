import { useState, useEffect } from 'react'
import { Book, Download, FileText, ChevronRight, Loader2 } from 'lucide-react'
import { Language } from './translations'
import { templeService } from './templeService'
import { LibraryItem } from './types'

export function DigitalLibrary({ lang, t }: { lang: Language, t: any }) {
    const [ebooks, setEbooks] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEbooks = async () => {
            const data = await templeService.getLibrary();
            setEbooks(data.filter(item => item.type === 'ebook'));
            setLoading(false);
        };
        fetchEbooks();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-gray-500 font-bold italic">Opening Sacred Archives...</p>
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto p-4 animate-divine">
            <div className="mb-16 text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-4 shadow-sm">
                    {t.library}
                </span>
                <h2 className="text-5xl font-black text-gray-900 mb-4 heading-divine gold-text-glow">{t.sacredBooks}</h2>
                <p className="text-gray-500 max-w-2xl text-xl font-serif opacity-80 leading-relaxed mx-auto lg:mx-0">
                    "{t.readEbooks}"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ebooks.map((book) => (
                    <div key={book.id} className="group glass-morphism rounded-[48px] p-10 border border-white/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-[100px] flex items-start justify-end p-8 -mr-8 -mt-8 group-hover:bg-orange-600 group-hover:shadow-lg transition-all duration-500">
                            <Book className="w-8 h-8 text-orange-200 group-hover:text-white group-hover:scale-110 transition-transform" />
                        </div>

                        <div className="relative z-10">
                            <div className="p-4 bg-orange-100/30 rounded-2xl w-fit mb-8 shadow-inner">
                                <FileText className="w-7 h-7 text-orange-600" />
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-3 pr-8 leading-tight">
                                {lang === 'te' && book.teTitle ? book.teTitle : book.title}
                            </h3>
                            <p className="text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest opacity-60">
                                {lang === 'te' && book.teAuthor ? book.teAuthor : (book.author || 'Temple Archive')} {book.duration ? `• ${book.duration}` : ''}
                            </p>

                            <a
                                href={book.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-orange-600 font-black text-sm group/btn divine-gradient px-6 py-3 rounded-2xl text-white shadow-xl shadow-orange-900/10 hover:shadow-orange-600/30 transition-all active:scale-95 w-fit"
                            >
                                <Download className="w-5 h-5" />
                                <span className="uppercase tracking-widest">{t.pdfDownload}</span>
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-[60px] p-16 text-white overflow-hidden relative shadow-2xl group">
                <div className="relative z-10 max-w-2xl">
                    <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Legacy & Heritage</span>
                    <h3 className="text-4xl font-black mb-6 heading-divine">{t.historyOfTemple}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10 font-serif italic">
                        {lang === 'te'
                            ? 'పెందుర్తిలోని శ్రీ వేంకటేశ్వర స్వామి ఆలయానికి శతాబ్దాల చరిత్ర ఉంది. ఈ ఆలయం ఆధ్యాత్మిక కేంద్రంగానే కాకుండా సాంస్కృతిక వారసత్వానికి చిహ్నంగా నిలిచింది.'
                            : 'The Lord Venkateswara temple in Pendurthi has a history spanning centuries. It stands not just as a spiritual hub but as a symbol of cultural heritage, radiating divine light to thousands of devotees.'
                        }
                    </p>
                    <button className="px-10 py-5 divine-gradient text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-orange-600/40 transition-all shadow-xl active:scale-95 text-sm uppercase tracking-widest">
                        {lang === 'te' ? 'పూర్తి చరిత్ర చదవండి' : 'Read Full History'}
                    </button>
                </div>
                <Book className="absolute bottom-[-60px] right-[-60px] w-96 h-96 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
            </div>
        </div>
    );
}
