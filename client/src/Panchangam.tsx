import { Sun, Moon, MapPin, Calendar as CalendarIcon } from 'lucide-react'
import { Language } from './translations'
import { INITIAL_PANCHANGAM } from './templeService';


interface PanchangamProps {
    lang: Language;
    t: any;
}

export function Panchangam({ lang, t }: PanchangamProps) {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

    const data = {
        tithi: INITIAL_PANCHANGAM.tithi,
        nakshatra: INITIAL_PANCHANGAM.nakshatra,
        sunrise: INITIAL_PANCHANGAM.sunrise,
        sunset: INITIAL_PANCHANGAM.sunset,
        rahu: INITIAL_PANCHANGAM.rahuKalam,
        yamagandam: INITIAL_PANCHANGAM.yamagandam
    };

    // Telugu Mappings
    const teTithis: any = { 'Saptami': 'సప్తమి', 'Ashtami': 'అష్టమి', 'Navami': 'నవమి', 'Dashami': 'దశమి', 'Ekadashi': 'ఏకాదశి', 'Dwadashi': 'ద్వాదశి', 'Trayodashi': 'త్రయోదశి', 'Purnima': 'పూర్ణిమ' };
    const teNaks: any = { 'Ashwini': 'అశ్విని', 'Bharani': 'భరణి', 'Krittika': 'కృత్తిక', 'Rohini': 'రోహిణి', 'Mrigashira': 'మృగశిర', 'Ardra': 'ఆరుద్ర', 'Punarvasu': 'పునర్వసు', 'Pushya': 'పుష్య' };

    const displayTithi = lang === 'te' ? (teTithis[data.tithi] || data.tithi) : data.tithi;
    const displayNak = lang === 'te' ? (teNaks[data.nakshatra] || data.nakshatra) : data.nakshatra;

    return (
        <div className="glass-morphism rounded-[40px] p-8 shadow-2xl shadow-orange-900/10 border border-white/50 space-y-8 animate-divine" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100/50 rounded-2xl text-orange-600 shadow-inner">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-xl text-gray-900 heading-divine tracking-tighter gold-text-glow">{t.panchangam}</h4>
                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none mt-1">Daily Sacred Oracle</p>
                    </div>
                </div>
                <div className="text-[10px] font-black bg-orange-600 text-white px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-orange-900/20">
                    {t.today}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-white/40 rounded-3xl border border-orange-100/20 hover:border-orange-500/30 transition-all group">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t.tithi}</span>
                    <span className="text-lg font-black text-orange-900 group-hover:text-orange-600 transition-colors">{displayTithi}</span>
                </div>
                <div className="p-5 bg-white/40 rounded-3xl border border-orange-100/20 hover:border-orange-500/30 transition-all group">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t.nakshatra}</span>
                    <span className="text-lg font-black text-orange-900 group-hover:text-orange-600 transition-colors">{displayNak}</span>
                </div>
            </div>

            <div className="space-y-4 bg-orange-50/30 p-6 rounded-3xl border border-orange-100/20">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-500 font-black uppercase tracking-tighter">
                        <Sun className="w-5 h-5 text-orange-500" />
                        {t.sunrise}
                    </div>
                    <span className="font-black text-gray-900 text-base">{data.sunrise} AM</span>
                </div>
                <div className="h-px bg-orange-100/50 w-full" />
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-500 font-black uppercase tracking-tighter">
                        <Moon className="w-5 h-5 text-blue-500" />
                        {t.sunset}
                    </div>
                    <span className="font-black text-gray-900 text-base">{data.sunset} PM</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="p-5 bg-red-50/50 rounded-3xl border border-red-100/30 flex justify-between items-center group hover:bg-red-50 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{t.rahuKalam} 🔥</span>
                        <span className="text-gray-400 text-[8px] font-bold uppercase">Avoid auspicious work</span>
                    </div>
                    <span className="text-base font-black text-red-900">{data.rahu}</span>
                </div>

                <div className="p-5 bg-indigo-50/50 rounded-3xl border border-indigo-100/30 flex justify-between items-center group hover:bg-indigo-50 transition-colors">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{t.yamagandam}</span>
                    <span className="text-base font-black text-indigo-900">{data.yamagandam}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 px-2 uppercase tracking-widest opacity-60">
                <MapPin className="w-4 h-4 text-orange-500" />
                Pendurthi Sanctuary
            </div>
        </div>
    );
}
