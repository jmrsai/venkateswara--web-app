import React from 'react';
import { CameraOff, PhoneOff, Trash2, VolumeX, CigaretteOff, Footprints, Info, AlertOctagon } from 'lucide-react';

interface Guideline {
    icon: any;
    label: string;
    teLabel: string;
}

const GUIDELINES: Guideline[] = [
    { icon: PhoneOff, label: 'No Mobile Phones', teLabel: 'మొబైల్ ఫోన్లు అనుమతించబడవు' },
    { icon: CameraOff, label: 'No Photography', teLabel: 'ఫోటోగ్రఫీ అనుమతించబడదు' },
    { icon: VolumeX, label: 'Maintain Silence', teLabel: 'నిశ్శబ్దాన్ని పాటించండి' },
    { icon: Footprints, label: 'Deposit Footwear', teLabel: 'పాదరక్షలను బయట ఉంచండి' },
    { icon: CigaretteOff, label: 'No Smoking', teLabel: 'ధూమపానం నిషేధించబడింది' },
    { icon: Trash2, label: 'Keep Clean', teLabel: 'పరిసరాలను శుభ్రంగా ఉంచండి' },
];

export const VisitorGuidelines: React.FC<{ lang: 'en' | 'te' }> = ({ lang }) => {
    return (
        <section className="glass-morphism rounded-[40px] p-8 md:p-12 shadow-xl border border-orange-100/50 animate-divine overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Info size={120} className="text-orange-900" />
            </div>

            <div className="flex items-center gap-4 mb-10 relative">
                <div className="p-3 bg-red-100 rounded-2xl">
                    <AlertOctagon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-900 heading-divine">
                        {lang === 'te' ? 'నిబంధనలు & సూచనలు' : 'Know Before You Go'}
                    </h3>
                    <p className="text-orange-600/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                        {lang === 'te' ? 'ఆలయ మార్గదర్శకాలు' : 'Visitor Guidelines'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
                {GUIDELINES.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-6 bg-white/40 rounded-3xl border border-orange-50 hover:border-orange-200 transition-all group hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="w-14 h-14 bg-orange-100/50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-inner">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-700 leading-tight">
                            {lang === 'te' ? item.teLabel : item.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-10 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/30 flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-900/70 font-medium italic">
                    {lang === 'te'
                        ? 'ఆలయ మర్యాదను పాటించవలసిందిగా భక్తులను కోరుతున్నాము. ఆలయంలో ఎలక్ట్రానిక్ వస్తువులు అనుమతించబడవు.'
                        : 'Devotees are requested to maintain the sanctity of the temple. Electronic items and leather goods are strictly prohibited inside the main sanctum.'}
                </p>
            </div>
        </section>
    );
};
