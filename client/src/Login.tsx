import { useState } from 'react'
import { Shield, Mail, Lock, LogIn, UserPlus } from 'lucide-react'
import { templeService } from './templeService'
import { Language } from './translations'

export function Login({ onLogin, lang, t }: { onLogin: (user: any) => void, lang: Language, t: any }) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isSignUp) {
                const cred = await templeService.signUp(email, password)
                onLogin(cred.user)
            } else {
                const cred = await templeService.signIn(email, password)
                onLogin(cred.user)
            }
        } catch (err: any) {
            console.error("Auth error:", err)
            setError(err.message || "Authentication failed. Please check your credentials.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-10 glass-morphism rounded-[48px] shadow-2xl border border-white/50 animate-divine relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

            <div className="text-center mb-10 relative z-10">
                <div className="w-20 h-20 divine-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-600/30 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                    <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 heading-divine gold-text-glow uppercase tracking-wider">
                    {isSignUp ? (lang === 'te' ? 'సైన్ అప్' : 'Devotee Sign Up') : t.login}
                </h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto mb-4 rounded-full" />
                <p className="text-gray-500 font-serif italic opacity-70">
                    {isSignUp
                        ? (lang === 'te' ? 'కొత్త భక్త ఖాతాను సృష్టించండి' : 'Create your sacred devotee account')
                        : (lang === 'te' ? 'మీ బుకింగ్‌లు మరియు విరాళాలను యాక్సెస్ చేయండి' : 'Access your sacred bookings and donations')
                    }
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl animate-shake">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{lang === 'te' ? 'ఈమెయిల్ చిరునామా' : 'Email Address'}</label>
                    <div className="relative group/input">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within/input:text-orange-600 transition-colors" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-6 py-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all font-bold shadow-inner"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{lang === 'te' ? 'పాస్‌వర్డ్' : 'Password'}</label>
                    <div className="relative group/input">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within/input:text-orange-600 transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-6 py-5 bg-white/50 border-2 border-orange-50 rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all font-bold shadow-inner"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full divine-gradient text-white font-black py-5 rounded-[32px] hover:shadow-2xl hover:shadow-orange-600/40 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl uppercase tracking-[0.2em] text-sm disabled:opacity-50"
                >
                    {isSignUp ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
                    {loading ? (lang === 'te' ? 'ప్రాసెస్ అవుతోంది...' : 'Authenticating...') : (isSignUp ? (lang === 'te' ? 'నమోదు చేయండి' : 'Register') : t.login)}
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#fffaf5] px-4 text-gray-500 font-black tracking-widest">{lang === 'te' ? 'లేదా' : 'Or continue with'}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={async () => {
                        setError('');
                        setLoading(true);
                        try {
                            const cred = await templeService.signInWithGoogle();
                            onLogin(cred.user);
                        } catch (err: any) {
                            setError(err.message || "Google Authentication failed.");
                        } finally {
                            setLoading(false);
                        }
                    }}
                    className="w-full bg-white border-2 border-orange-50 text-gray-700 font-black py-5 rounded-[32px] hover:bg-orange-50/50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm uppercase tracking-[0.2em] text-sm"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                    {lang === 'te' ? 'గూగుల్ తో లాగిన్' : 'Sign in with Google'}
                </button>
            </form>

            <div className="mt-8 text-center relative z-10">
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-orange-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                >
                    {isSignUp
                        ? (lang === 'te' ? 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి' : 'Already have an account? Login here')
                        : (lang === 'te' ? 'కొత్త ఖాతాను సృష్టించాలా? ఇక్కడ క్లిక్ చేయండి' : 'New pilgrim? Create an account here')
                    }
                </button>
            </div>

            <div className="mt-10 text-center relative z-10 opacity-30">
                <div className="flex items-center justify-center gap-2 grayscale hover:grayscale-0 transition-all duration-500 cursor-help">
                    <Shield className="w-4 h-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">{lang === 'te' ? 'ఫైర్‌బేస్ అథెంటికేషన్ ద్వారా రక్షించబడింది' : 'Protected by Firebase Secure Core'}</p>
                </div>
            </div>
        </div>
    )
}
