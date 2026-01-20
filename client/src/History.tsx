import { MapPin, Clock, History as HistoryIcon, Map, Phone, Mail } from 'lucide-react'
import { SiteConfig } from './types'
import { Language } from './translations'

export function HistoryPage({ lang, t, config }: { lang: Language, t: any, config: SiteConfig }) {
    return (
        <div className="bg-orange-50 min-h-screen animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 overflow-hidden group">
                <img
                    src={config.historyImageUrl || 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_ujj4zlujj4zlujj4.png'}
                    alt="Temple History"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#800000] to-transparent opacity-90 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl text-white font-serif font-bold text-center px-4 drop-shadow-xl border-b-4 border-amber-500 pb-2 heading-divine">
                        {lang === 'te' ? 'చరిత్ర & ప్రాముఖ్యత' : 'History & Significance'}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content: History */}
                    <div className="lg:col-span-2 space-y-12 text-stone-700 leading-relaxed font-serif">

                        <section className="glass-morphism p-8 rounded-[32px] border border-orange-100/50 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-3xl font-bold text-[#800000] mb-6 border-l-4 border-amber-500 pl-4 heading-divine">
                                {lang === 'te' ? `${config.templeName} పురాణం` : `The Legend of ${config.templeName}`}
                            </h2>
                            <div className="prose prose-lg text-stone-700 whitespace-pre-wrap leading-loose">
                                <span>{config.historyContent || 'History content is being updated...'}</span>
                            </div>
                            <div className="bg-amber-100/50 border-l-4 border-amber-600 p-8 italic text-stone-800 my-8 shadow-inner rounded-r-[24px]">
                                <p className="mb-3 font-bold text-amber-900 uppercase tracking-widest text-sm">Sthala Purana:</p>
                                <p className="text-lg">
                                    <span>
                                        {lang === 'te'
                                            ? 'పెందుర్తి కొండలపై శతాబ్దాలుగా ఋషులు తపస్సు చేసిన పుణ్యస్థలంగా స్థానిక పురాణాలు చెబుతున్నాయి, ఇది ఒక శక్తివంతమైన క్షేత్రం.'
                                            : 'Local legends state that the hills of Pendurthi have been a site of penance for sages for centuries, making it a powerful Kshetram.'
                                        }
                                    </span>
                                </p>
                            </div>
                        </section>

                        <section className="glass-morphism p-8 rounded-[32px] border border-orange-100/50 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-3xl font-bold text-[#800000] mb-6 border-l-4 border-amber-500 pl-4 heading-divine">
                                {lang === 'te' ? 'ఆలయ కాలక్రమం' : 'Temple Timeline'}
                            </h2>
                            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-lg">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-stone-100 text-stone-800 uppercase text-xs font-black tracking-widest">
                                            <th className="p-6 border-b border-stone-200">Milestone</th>
                                            <th className="p-6 border-b border-stone-200">Date</th>
                                            <th className="p-6 border-b border-stone-200">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100 bg-white font-sans text-sm font-medium">
                                        <tr className="hover:bg-orange-50/30 transition-colors">
                                            <td className="p-6 font-black text-amber-800"><span>Foundation Stone</span></td>
                                            <td className="p-6"><span>1995</span></td>
                                            <td className="p-6"><span>Laid by H.H. Sri Chinna Jeeyar Swamy.</span></td>
                                        </tr>
                                        <tr className="hover:bg-orange-50/30 transition-colors">
                                            <td className="p-6 font-black text-amber-800"><span>Consecration</span></td>
                                            <td className="p-6"><span>May 17, 1997</span></td>
                                            <td className="p-6"><span>Formal idol installation (Pratishta) and sanctification according to Vaikhanasa Agama.</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Visitor Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[40px] shadow-2xl border-t-8 border-[#800000] sticky top-28 transition-transform hover:-translate-y-1 duration-500">
                            <h3 className="text-2xl font-serif font-black text-stone-900 mb-8 flex items-center gap-3">
                                <MapPin className="w-8 h-8 text-amber-600 animate-pulse" />
                                {lang === 'te' ? 'మీ సందర్శన ప్రణాళిక' : 'Plan Your Visit'}
                            </h3>

                            <div className="mb-10">
                                <h4 className="font-black text-amber-800 uppercase text-[10px] mb-4 tracking-[0.2em]">{t.templeSchedule}</h4>
                                <div className="space-y-4 text-sm bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner">
                                    {Object.entries(config.timings).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-stone-200/50 pb-3 last:border-0 last:pb-0">
                                            <span className="text-stone-500 font-bold uppercase text-[10px]">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <span className={`font-black tracking-tight ${key === 'breakTime' ? 'text-red-700' : 'text-stone-900'}`}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-0">
                                <h4 className="font-black text-amber-800 uppercase text-[10px] mb-4 tracking-[0.2em]">{lang === 'te' ? 'ఆలయానికి ఎలా చేరుకోవాలి' : 'How to Reach'}</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                                        <strong className="block text-stone-900 mb-1 flex items-center gap-2"><Map className="w-4 h-4 text-amber-600" /> <span>Address:</span></strong>
                                        <p className="text-stone-600 font-medium leading-relaxed"><span>{config.address}</span></p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                                        <strong className="block text-stone-900 mb-1"><span>Road:</span></strong>
                                        <p className="text-stone-600 font-medium whitespace-pre-line"><span>Well connected from Vizag (20km).</span></p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                                        <strong className="block text-stone-900 mb-1"><span>Train:</span></strong>
                                        <p className="text-stone-600 font-medium"><span>Visakhapatnam Junction or Pendurthi Station.</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-20 divine-gradient text-white rounded-[48px] p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                        <HistoryIcon className="w-64 h-64" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black mb-4 heading-divine gold-text-glow">{t.connect}</h2>
                            <p className="text-orange-100/80 font-medium text-lg mb-8 max-w-md">{config.address}</p>
                            <div className="flex flex-col gap-4">
                                <a href={`tel:${config.contactPhone}`} className="flex items-center gap-3 font-black text-xl hover:text-orange-300 transition-colors">
                                    <Phone className="w-6 h-6" /> {config.contactPhone}
                                </a>
                                <a href={`mailto:${config.contactEmail}`} className="flex items-center gap-3 font-black text-xl hover:text-orange-300 transition-colors">
                                    <Mail className="w-6 h-6" /> {config.contactEmail}
                                </a>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="w-full md:w-1/2 h-80 bg-stone-900 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10 group-hover:border-orange-500/30 transition-all duration-500">
                            <iframe
                                src={config.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.5792542226905!2d83.2088485750837!3d17.811460590450366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39671fbc497e33%3A0xfb3d22187ebdc15!2sUTTHARANDHRA%20TIRUPATI%20(%20Venkateswara%20Swamy%20Temple%20)!5e0!3m2!1sen!2sin!4v1768918308742!5m2!1sen!2sin'}
                                style={{ border: 0, width: '100%', height: '100%' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
