import { useState, useEffect } from 'react'
import { Heart, CheckCircle, ArrowRight, Loader2, IndianRupee, ShieldCheck } from 'lucide-react'
import { Donation, SiteConfig } from './types'
import { templeService, INITIAL_SITE_CONFIG } from './templeService'

import { Language } from './translations'

export function Donations({ lang, t }: { lang: Language, t: any }) {
    const [amount, setAmount] = useState<number | ''>('')
    const [customAmount, setCustomAmount] = useState('')
    const [category, setCategory] = useState('')
    const [donorName, setDonorName] = useState('')
    const [gothram, setGothram] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG)

    useEffect(() => {
        const fetchConfig = async () => {
            const data = await templeService.getSiteConfig();
            if (data) setConfig(data);
            if (data.donationCategories.length > 0) setCategory(data.donationCategories[0]);
        };
        fetchConfig();
    }, [])

    const handleDonation = async (e: React.FormEvent) => {
        e.preventDefault()
        const finalAmount = amount || Number(customAmount)
        if (!finalAmount || !category || !donorName) return

        setLoading(true)
        const res = await templeService.addDonation({
            amount: finalAmount,
            category,
            donorName,
            gothram,
            email,
            date: new Date().toISOString()
        });

        if (res.success) {
            setSubmitted(true)
        } else {
            alert('Donation failed: ' + res.message)
        }
        setLoading(false)
    }

    if (submitted) {
        return (
            <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-[40px] shadow-2xl text-center border border-orange-100 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-orange-600 fill-orange-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">{t.thankYou}</h2>
                <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                    {t.contributionReceived.replace('{amount}', `₹${amount || customAmount}`)}
                    <br />
                    {t.divineBlessings}
                </p>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-8">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-left">{t.transactionId}</p>
                    <p className="text-sm font-bold text-gray-600 text-left truncate">TXN-{Date.now()}</p>
                </div>
                <button
                    onClick={() => setSubmitted(false)}
                    className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl hover:bg-orange-700 transition-all shadow-xl active:scale-95"
                >
                    {t.backToHome}
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4 animate-divine">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-4 shadow-sm">{t.divineContribution}</span>
                <h2 className="text-6xl font-black text-gray-900 mb-4 heading-divine gold-text-glow">{t.eHundi}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-6" />
                <p className="text-gray-500 max-w-2xl mx-auto text-xl italic font-serif opacity-80">
                    "{t.donationQuote}"
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="glass-morphism p-10 rounded-[48px] shadow-2xl shadow-orange-900/10 border border-white/50">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-8 text-center">{t.selectAmount}</label>
                        <div className="grid grid-cols-2 gap-4">
                            {config.donationAmounts.map((val) => (
                                <button
                                    key={val}
                                    onClick={() => { setAmount(val); setCustomAmount('') }}
                                    className={`py-5 rounded-3xl font-black text-2xl transition-all border-2 ${amount === val ? 'bg-orange-600 border-orange-600 text-white shadow-2xl shadow-orange-600/30 -translate-y-1' : 'bg-white/50 border-orange-100/50 text-orange-900 hover:border-orange-300'}`}
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>
                        <div className="relative mt-6">
                            <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                            <input
                                type="number"
                                placeholder={t.otherAmount}
                                value={customAmount}
                                onChange={(e) => { setCustomAmount(e.target.value); setAmount('') }}
                                className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all font-black text-xl shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                        <ShieldCheck className="absolute top-[-20px] right-[-20px] w-40 h-40 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10 heading-divine">
                            <ShieldCheck className="w-8 h-8 text-orange-400" /> {t.securePayment}
                        </h4>
                        <div className="space-y-4 opacity-70 text-base font-medium relative z-10 leading-relaxed">
                            {t.donationBenefits.map((benefit: string, idx: number) => (
                                <p key={idx} className="flex gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    {benefit}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleDonation} className="glass-morphism p-10 rounded-[48px] shadow-2xl shadow-orange-900/10 border border-white/50 space-y-8">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.purposeOfDonation}</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 outline-none font-bold text-gray-900 appearance-none shadow-sm"
                            required
                        >
                            {config.donationCategories.map(cat => (
                                <option key={cat} value={cat}>{t.categories[cat] || cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.donorNameLabel}</label>
                        <input
                            type="text"
                            required
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder={t.enterFullName}
                            className="w-full p-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 outline-none font-bold shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.gothramOptional}</label>
                            <input
                                type="text"
                                value={gothram}
                                onChange={(e) => setGothram(e.target.value)}
                                placeholder={t.enterGothram}
                                className="w-full p-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 outline-none font-bold shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.emailReceipt}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.enterEmail}
                                className="w-full p-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 outline-none font-bold shadow-inner"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full divine-gradient text-white font-black py-6 rounded-[32px] hover:shadow-2xl hover:shadow-orange-600/40 transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50 shadow-xl"
                    >
                        {loading ? (
                            <Loader2 className="w-7 h-7 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-3 text-lg uppercase tracking-widest">
                                {t.proceedToDonate} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                        )}
                    </button>
                    <div className="flex items-center justify-center gap-2 opacity-40">
                        <ShieldCheck className="w-4 h-4" />
                        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em]">{t.secureSSL}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}
