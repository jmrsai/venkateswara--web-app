import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, CheckCircle, ArrowRight, Loader2, IndianRupee } from 'lucide-react'
import { Seva } from './types'
import { templeService } from './templeService'

import { Language } from './translations'

export function SevaBooking({ lang, t }: { lang: Language, t: any }) {
    const [sevas, setSevas] = useState<Seva[]>([])
    const [loading, setLoading] = useState(true)
    const [bookingId, setBookingId] = useState<string | null>(null)
    const [ticketCode, setTicketCode] = useState<string | null>(null)

    useEffect(() => {
        const fetchSevas = async () => {
            const data = await templeService.getSevas();
            setSevas(data);
            setLoading(false);
        };
        fetchSevas();
    }, [])

    const handleBook = async (seva: Seva) => {
        setBookingId(seva.id)
        // In a real app, we might show a form here. For now, simulated booking with mock devotee info.
        const res = await templeService.bookSeva({
            id: seva.id,
            devoteeName: 'Demo Devotee',
            mobile: '9999999999',
            email: 'demo@example.com',
            date: new Date().toISOString().split('T')[0]
        });

        if (res.success) {
            setTicketCode(res.ticketCode || 'TKT-PENDING');
        } else {
            alert('Booking failed: ' + res.message);
            setBookingId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-gray-500 font-bold animate-pulse">{t.fetchingServices}</p>
            </div>
        )
    }

    if (ticketCode) {
        return (
            <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-[40px] shadow-2xl text-center border border-orange-100 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">{t.darshanConfirmed}</h2>
                <p className="text-gray-500 mb-8 font-medium">{t.bookingPrompt}</p>

                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 mb-8">
                    <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-1">{t.ticketRef}</p>
                    <p className="text-4xl font-black text-orange-900 tracking-tighter">{ticketCode}</p>
                </div>

                <button
                    onClick={() => { setTicketCode(null); setBookingId(null); }}
                    className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 active:scale-95"
                >
                    {t.done}
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-4 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest rounded-full mb-4">{t.omNamo}</span>
                <h2 className="text-5xl font-black text-gray-900 mb-4">{t.sevaBookings}</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    {t.sevaSubtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sevas.map((seva) => (
                    <div key={seva.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-orange-50 group">
                        <div className="relative h-56 overflow-hidden">
                            <img src={seva.imageUrl} alt={seva.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                                <span className="text-xl font-black text-orange-600 flex items-center gap-1">
                                    <IndianRupee className="w-4 h-4" /> {seva.price}
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">{seva.name}</h3>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                {seva.description || "Divine ceremony performed in the main temple premises."}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600">
                                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                                    {seva.timing}
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600">
                                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                                    {seva.day}
                                </div>
                            </div>

                            <button
                                onClick={() => handleBook(seva)}
                                disabled={bookingId === seva.id}
                                className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-[0.98] ${bookingId === seva.id
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100'
                                    }`}
                            >
                                {bookingId === seva.id ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t.processing}
                                    </>
                                ) : (
                                    <>
                                        {t.bookNow} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
