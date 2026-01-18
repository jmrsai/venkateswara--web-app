import React, { useState, useEffect, Suspense } from 'react'
import {
    Bell,
    User as UserIcon,
    Calendar,
    Heart,
    MapPin,
    Phone,
    Mail,
    History,
    Globe,
    Clock,
    Info,
    ShieldCheck,
    ArrowRight,
    LogOut,
    Menu,
    X,
    Image,
    Video,
    BookOpen,
    Box,
    Plus,
    Save,
    Trash2,
    Edit,
    Loader2,
    AlertTriangle,
    Sparkles,
    TrendingUp,
    LayoutDashboard,
    Package,
    Users,
    Layout,
    Settings,
    Youtube,
    IndianRupee
} from 'lucide-react'
import { SevaBooking } from './SevaBooking'
import { Donations } from './Donations'
import { AdminDashboard } from './AdminDashboard'
import { Login } from './Login'
const ThreeDDarshan = React.lazy(() => import('./ThreeDDarshan'))
import { INITIAL_SITE_CONFIG, calculateTimeOfDay, templeService } from './templeService'
import { Panchangam } from './Panchangam'
import { AudioPlayer } from './AudioPlayer'
import { VideoGallery } from './VideoGallery'
import { DigitalLibrary } from './DigitalLibrary'
import { HistoryPage } from './History'
import { BackgroundMusic } from './BackgroundMusic'
import { SiteConfig, Seva, DynamicPage, Announcement } from './types'
import { TRANSLATIONS, Language } from './translations'

function App() {
    const [view, setView] = useState('home')
    const [user, setUser] = useState<any>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG)
    const [sevas, setSevas] = useState<Seva[]>([])
    const [gallery, setGallery] = useState<any[]>([])
    const [pages, setPages] = useState<DynamicPage[]>([])
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [timeOfDay, setTimeOfDay] = useState(calculateTimeOfDay())
    const [lang, setLang] = useState<Language>('en')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showInstallBanner, setShowInstallBanner] = useState(false)
    const [heroSlideIndex, setHeroSlideIndex] = useState(0)

    // Slideshow Auto-Rotation
    useEffect(() => {
        if (gallery.length > 0) {
            const interval = setInterval(() => {
                setHeroSlideIndex(prev => (prev + 1) % Math.min(gallery.filter(i => i.type === 'image').length, 5));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [gallery]);

    const t = TRANSLATIONS[lang]

    useEffect(() => {
        // Fetch Initial Config
        const initApp = async () => {
            setLoading(true);
            try {
                const [liveConfig, liveGallery, liveAnnouncements, livePages] = await Promise.all([
                    templeService.getSiteConfig(),
                    templeService.getGallery(),
                    templeService.getAnnouncements(true),
                    templeService.getPages()
                ]);
                setConfig(liveConfig);
                setGallery(liveGallery);
                setAnnouncements(liveAnnouncements);
                setPages(livePages);

                const session = await templeService.getSession();
                if (session.data.session) {
                    handleUser(session.data.session.user);
                }
            } catch (error) {
                console.error("Initialization failed:", error);
            }
            setLoading(false);
        };
        initApp();

        // Listen for Auth Changes
        const { data: authListener } = templeService.onAuthStateChange((session) => {
            handleUser(session?.user ?? null);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    // Dynamic Theme Injector
    useEffect(() => {
        if (!config || !config.theme) return;
        const root = document.documentElement;
        root.style.setProperty('--primary-color', config.theme.primaryColor);
        root.style.setProperty('--secondary-color', config.theme.secondaryColor);
        root.style.setProperty('--accent-color', config.theme.accentColor);
        root.style.setProperty('--bg-color', config.theme.backgroundColor);
        root.style.setProperty('--heading-font', config.theme.headingFont);
        root.style.setProperty('--body-font', config.theme.bodyFont);
    }, [config.theme]);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallBanner(true);
        });

        window.addEventListener('appinstalled', () => {
            setShowInstallBanner(false);
            setDeferredPrompt(null);
        });
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowInstallBanner(false);
        }
    };

    const AnnouncementBanner = () => {
        const activeBanner = announcements.find(a => a.is_active && a.type === 'Banner');
        const activeTicker = announcements.find(a => a.is_active && a.type === 'Ticker');

        if (!activeBanner && !activeTicker) return null;

        return (
            <div className="z-[60] relative">
                {activeBanner && (
                    <div className={`py-3 px-4 text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 animate-in slide-in-from-top duration-700 ${activeBanner.priority === 'Urgent' ? 'bg-red-600 text-white' : activeBanner.priority === 'High' ? 'bg-orange-600 text-white' : 'bg-gray-900 text-white'}`}>
                        <Bell className="w-4 h-4" />
                        <span>{activeBanner.message}</span>
                    </div>
                )}
                {activeTicker && (
                    <div className="bg-gray-100 py-2 border-b border-gray-200 overflow-hidden">
                        <div className="whitespace-nowrap flex animate-ticker">
                            {[...Array(10)].map((_, i) => (
                                <span key={i} className="px-10 text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-orange-400" /> {activeTicker.message}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const handleUser = (userData: any) => {
        setUser(userData)
        // Specific Admin UID requested by user
        if (userData?.uid === 'zAq3p2QRugN1PIgF9apyylEWTpH3') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }

    const handleLogin = (userData: { email: string }) => {
        // For now, keep the mock login logic or link to signIn
        handleUser(userData);
        setView('home')
    }

    const handleLogout = async () => {
        await templeService.signOut();
        setUser(null)
        setIsAdmin(false)
        setView('home')
    }

    const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon?: any }) => (
        <button
            onClick={() => { setView(id); setIsMenuOpen(false); }}
            className={`group relative px-4 py-2 transition-all duration-300 ${view === id
                ? 'text-orange-600'
                : 'text-gray-500 hover:text-orange-500'
                }`}
        >
            <span className="text-[11px] font-black uppercase tracking-[0.15em] relative z-10">
                {label}
            </span>
            {view === id && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-orange-500 rounded-full animate-in fade-in zoom-in duration-500" />
            )}
            <div className={`absolute inset-0 bg-transparent group-hover:bg-orange-50/50 rounded-lg transition-colors duration-300 -z-0 ${view === id ? 'bg-orange-50/30' : ''}`} />
        </button>
    )

    return (
        <div className={`min-h-screen bg-[#fffaf5] text-gray-900 font-sans selection:bg-orange-600 selection:text-white`}>
            {/* Background Audio (Conditional) */}
            {config.enableAudio && <BackgroundMusic />}

            <AnnouncementBanner />

            {/* Top Bar (Divine Branding) */}
            <div className="divine-topbar py-1.5 px-6 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 gold-text-glow animate-pulse">
                            Om Namo Venkatesaya
                        </span>
                        <div className="h-3 w-px bg-white/20" />
                        <button onClick={() => setView('darshan3d')} className="text-[9px] font-bold uppercase tracking-widest text-white/70 hover:text-orange-300 transition-colors">
                            3D Digital Darshan
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isAdmin && (
                            <button onClick={() => setView('login')} className="text-[9px] font-bold uppercase tracking-widest text-white/70 hover:text-orange-300 transition-colors">
                                Admin Login
                            </button>
                        )}
                        <span className="text-[9px] font-bold uppercase tracking-widest text-orange-500/80">
                            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 glass-morphism border-b-2 border-orange-500/10 px-6 py-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-5 cursor-pointer group" onClick={() => setView('home')}>
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-orange-900/5 overflow-hidden border border-orange-100/50 group-hover:scale-105 transition-transform duration-500">
                            <img src="https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/images/Logo/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-black text-[#5d0e14] heading-divine leading-none tracking-tight">
                                {lang === 'te' ? t.templeName : config.templeName}
                            </h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600/80 mt-1.5">
                                {lang === 'te' ? 'ఉత్తరాంధ్ర తిరుమల దివ్య క్షేత్రం' : config.subTitle}
                            </p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <NavItem label={t.home} id="home" icon={null} />
                        <NavItem label={t.history} id="history" icon={null} />
                        <NavItem label={t.sevas} id="seva" icon={null} />
                        <NavItem label={t.gallery} id="gallery" icon={null} />
                        <NavItem label={t.videoGallery} id="video" icon={null} />
                        <NavItem label={t.library} id="library" icon={null} />
                        <NavItem label={t.threeDDarshan} id="darshan3d" icon={null} />
                        <NavItem label={t.donation} id="donation" icon={null} />
                        {isAdmin && <NavItem label={t.dashboard} id="admin" icon={null} />}
                        {pages.filter(p => p.is_active && p.show_in_nav).map(page => (
                            <NavItem key={page.slug} label={page.title} id={page.slug} icon={null} />
                        ))}

                        <div className="h-6 w-px bg-gray-200 mx-2" />

                        {/* Language Toggle */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-200 hover:bg-orange-50 transition-all text-orange-700 bg-orange-50/20"
                        >
                            {lang === 'en' ? 'తెలుగు' : 'English'}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 text-xs font-bold">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">{user.email}</span>
                                </div>
                                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setView('login')}
                                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
                            >
                                <UserIcon className="w-4 h-4" />
                                {t.login}
                            </button>
                        )}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-2 border-orange-500/20 p-6 space-y-4 animate-in slide-in-from-top-4 duration-300 shadow-2xl z-50">
                        <div className="grid grid-cols-2 gap-3">
                            <NavItem label={t.home} id="home" icon={null} />
                            <NavItem label={t.history} id="history" icon={null} />
                            <NavItem label={t.sevas} id="seva" icon={null} />
                            <NavItem label={t.gallery} id="gallery" icon={null} />
                            <NavItem label={t.library} id="library" icon={null} />
                            <NavItem label={t.threeDDarshan} id="darshan3d" icon={null} />
                            {pages.filter(p => p.is_active && p.show_in_nav).map(page => (
                                <NavItem key={page.slug} label={page.title} id={page.slug} icon={null} />
                            ))}
                        </div>

                        <div className="h-px bg-orange-100 my-4" />

                        {!user && (
                            <button onClick={() => setView('login')} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all">
                                {t.login}
                            </button>
                        )}

                        {user && (
                            <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-red-100 active:scale-95 transition-all">
                                {t.logout}
                            </button>
                        )}

                        {/* Mobile Language Toggle */}
                        <button
                            onClick={() => { setLang(lang === 'en' ? 'te' : 'en'); setIsMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-orange-50 text-orange-700 font-black rounded-2xl border border-orange-100 text-[11px] uppercase tracking-widest"
                        >
                            <Globe className="w-4 h-4" />
                            {lang === 'en' ? 'తెలుగు' : 'English'}
                        </button>
                    </div>
                )}
            </header>

            {/* PWA Install Banner */}
            {showInstallBanner && (
                <div className="bg-orange-600 text-white px-6 py-3 flex items-center justify-between animate-in slide-in-from-top duration-500 sticky top-[89px] z-40 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Image className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest">{lang === 'te' ? 'యాప్‌ను ఇన్‌స్టాల్ చేయండి' : 'Install Temple App'}</p>
                            <p className="text-[10px] opacity-80 font-bold">{lang === 'te' ? 'వేగవంతమైన అనుభవం కోసం హోమ్ స్క్రీన్‌కు జోడించండి' : 'Add to home screen for a faster, divine experience'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleInstallClick}
                            className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-orange-50 transition-colors shadow-sm"
                        >
                            {lang === 'te' ? 'ఇన్‌స్టాల్' : 'Install'}
                        </button>
                        <button onClick={() => setShowInstallBanner(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <main className="py-8">
                {view === 'home' && (
                    <div className="max-w-7xl mx-auto px-4 space-y-16">
                        {/* Hero Section */}
                        {/* Hero Section with Slideshow */}
                        <section className="relative rounded-[48px] overflow-hidden bg-gray-950 h-[600px] shadow-2xl animate-divine group">
                            {/* Slideshow Logic */}
                            {gallery.filter(item => item.type === 'image').length > 0 ? (
                                gallery.filter(item => item.type === 'image').slice(0, 5).map((item, index) => {
                                    // Simple CSS-based slideshow using opacity and animation
                                    // In a real app, we might use a dedicated library or state-based rotation
                                    // For now, we will use a keyframe animation approach or just display the first one dynamicly and let user know it supports slideshow
                                    // Better approach: Use a small state in App.tsx to rotate indices or Use CSS animations
                                    // Let's implement a CSS animation cycle using nth-child if we can, or just loop them. 
                                    // Since we are in React, state is cleaner. I will assume we add a state index top level or just map them absolute and use CSS animation.

                                    // Let's go with a pure React state approach for the slideshow index
                                    // Wait, I need state for this. I will use a simple auto-rotating index.
                                    return (
                                        <div
                                            key={item.id}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroSlideIndex ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <img
                                                src={item.url}
                                                className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[10000ms]"
                                                alt={item.caption || "Temple Slideshow"}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <img
                                    src={config.heroBannerUrl}
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 hover:scale-100 transition-transform duration-[10000ms]"
                                    alt="Temple Banner"
                                />
                            )}

                            {/* Golden Overlay Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 flex flex-col justify-end pb-16 px-4 md:px-20 z-10">
                                <div className="container mx-auto animate-fade-in-up">
                                    <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-sm mb-2 leading-tight">
                                        {lang === 'te' ? 'ఉత్తరాంధ్ర తిరుపతి' : 'Uttarandhra Tirupati'}
                                    </h2>
                                    <p className="text-white text-xl md:text-2xl font-light tracking-widest uppercase mb-8 pl-1 border-l-0 opacity-90">
                                        {lang === 'te' ? 'కలియుగ వైకుంఠం • పెందుర్తి' : 'Kali Yuga Vaikuntham • Pendurthi'}
                                    </p>
                                    <div className="flex flex-wrap gap-6">
                                        <button onClick={() => setView('seva')} className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-orange-500 transition-all group active:scale-95 shadow-xl shadow-orange-900/20">
                                            {t.bookSeva} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                        </button>
                                        <a href={config.liveLink} target="_blank" rel="noreferrer" className="glass-morphism text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-white/10 transition-all active:scale-95 border-white/10">
                                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                            {t.watchLive}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Slide Indicators */}
                            {gallery.filter(item => item.type === 'image').length > 0 && (
                                <div className="absolute bottom-8 right-16 flex gap-3 z-20">
                                    {gallery.filter(item => item.type === 'image').slice(0, 5).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setHeroSlideIndex(idx); }}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === heroSlideIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-12">
                                {/* Temple Schedule */}
                                <section id="schedule" className="glass-morphism rounded-[40px] p-10 shadow-xl shadow-orange-900/5 border border-white/50 animate-divine">
                                    <div className="flex items-center gap-5 mb-10">
                                        <div className="p-4 bg-orange-100/50 rounded-2xl shadow-inner">
                                            <Clock className="w-8 h-8 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-gray-900 heading-divine">{t.dailyRituals}</h3>
                                            <p className="text-orange-600/60 text-xs font-black uppercase tracking-[0.2em] mt-1">{t.templeSchedule}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Object.entries(config.timings).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center p-5 bg-white/40 rounded-2xl border border-orange-100/20 hover:border-orange-500/30 transition-all group hover:shadow-lg hover:shadow-orange-900/5">
                                                <span className="text-gray-600 font-black text-sm uppercase tracking-wide capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                <span className="text-orange-900 font-extrabold text-lg group-hover:text-orange-600 transition-colors">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* History */}
                                <section id="history" className="glass-morphism rounded-[40px] overflow-hidden shadow-xl shadow-orange-900/5 border border-white/50 animate-divine" style={{ animationDelay: '200ms' }}>
                                    <div className="md:flex">
                                        <div className="md:w-2/5 relative">
                                            <img src={config.historyImageUrl} alt="Temple Statue" className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 md:to-transparent" />
                                        </div>
                                        <div className="p-10 md:w-3/5">
                                            <div className="flex items-center gap-5 mb-8">
                                                <div className="p-4 bg-amber-100/50 rounded-2xl">
                                                    <History className="w-8 h-8 text-amber-600" />
                                                </div>
                                                <h3 className="text-3xl font-black text-gray-900 heading-divine">{t.sthalaPuranam}</h3>
                                            </div>
                                            <p className="text-gray-600 leading-loose text-lg italic border-l-4 border-orange-500/20 pl-8 bg-orange-50/30 py-4 rounded-r-2xl">
                                                {lang === 'te' ? config.historyContent : config.historyContent}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-8">
                                <Panchangam lang={lang} t={t} />

                                {/* Live Stats Card */}
                                <div className="divine-gradient rounded-[40px] p-10 text-white shadow-2xl shadow-orange-900/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                                        <Bell className="w-32 h-32" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-10 relative">
                                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                            <Bell className="w-6 h-6 animate-bounce" />
                                        </div>
                                        <h4 className="font-black text-xl heading-divine tracking-widest">{t.templeInsights}</h4>
                                    </div>
                                    <div className="space-y-8 relative">
                                        <div className="border-b border-white/10 pb-6 group/item hover:translate-x-2 transition-transform">
                                            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] mb-2">{t.crowdStatus}</p>
                                            <p className="text-3xl font-black uppercase text-orange-300">{lang === 'te' ? 'సాధారణం' : 'Moderate'}</p>
                                        </div>
                                        <div className="border-b border-white/10 pb-6 group/item hover:translate-x-2 transition-transform">
                                            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] mb-2">{t.waitTime}</p>
                                            <p className="text-4xl font-black mt-1">~45 <span className="text-lg opacity-70">{lang === 'te' ? 'నిమిషాలు' : 'Mins'}</span></p>
                                        </div>
                                        <div className="group/item hover:translate-x-2 transition-transform">
                                            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] mb-2">{t.annadanam}</p>
                                            <p className="text-3xl font-black text-green-400">{lang === 'te' ? 'అందుబాటులో ఉన్నాయి' : 'Available'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact & Location */}
                                <div id="location" className="bg-white rounded-[32px] p-8 shadow-sm border border-orange-50">
                                    <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                        <MapPin className="w-6 h-6 text-red-500" />
                                        {t.arrivalDetails}
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-2xl text-sm font-medium text-gray-600 border border-gray-100 italic">
                                            {config.address}
                                        </div>
                                        <iframe
                                            src={config.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237.41112734036318!2d83.21121301276729!3d17.811517714706405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39671fbc497e33%3A0xfb3d22187ebdc15!2sUTTHARANDHRA%20TIRUPATI%20(%20Venkateswara%20Swamy%20Temple%20)!5e0!3m2!1sen!2sin!4v1768306031383!5m2!1sen!2sin'}
                                            className="w-full h-48 rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 border-0"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'gallery' && (
                    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">{t.templeGallery}</span>
                            <h2 className="text-5xl font-black text-gray-900 mb-4">{lang === 'te' ? 'దివ్య' : 'Divine'} <span className="text-orange-600">{lang === 'te' ? 'దర్శనం' : 'Glimpses'}</span></h2>
                            <p className="text-gray-500 max-w-2xl mx-auto font-medium">{t.exploreBeauty}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gallery.length > 0 ? gallery.map((item, idx) => (
                                <div key={item.id || idx} className="group relative rounded-[32px] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all border border-orange-50 aspect-[4/5]">
                                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                                        <p className="text-white text-xl font-black mb-2">{item.caption}</p>
                                        <div className="h-1 w-12 bg-orange-500 rounded-full mb-4" />
                                        <p className="text-orange-100/80 text-xs font-bold uppercase tracking-widest">{item.type || 'Sacred Image'}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full py-32 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-bold">{lang === 'te' ? 'దివ్య చిత్రపటాలు త్వరలో అందుబాటులోకి వస్తాయి.' : 'The divine gallery is being updated. Please check back soon.'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {view === 'seva' && <SevaBooking lang={lang} t={t} />}
                {view === 'video' && <VideoGallery lang={lang} t={t} />}
                {view === 'library' && <DigitalLibrary lang={lang} t={t} />}
                {view === 'donation' && <Donations lang={lang} t={t} />}
                {view === 'history' && <HistoryPage lang={lang} t={t} config={config} />}
                {view === 'darshan3d' && (
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <Suspense fallback={
                            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5]">
                                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4" />
                                <p className="text-orange-600 font-black uppercase tracking-widest animate-pulse">Invoking Divine 3D Vision...</p>
                            </div>
                        }>
                            <ThreeDDarshan />
                        </Suspense>
                    </div>
                )}
                {view === 'admin' && isAdmin && <AdminDashboard lang={lang} t={t} />}
                {view === 'login' && <Login onLogin={handleLogin} lang={lang} t={t} />}

                {/* Dynamic Pages Logic */}
                {!['home', 'history', 'seva', 'gallery', 'video', 'library', 'darshan3d', 'donation', 'admin', 'login'].includes(view) && (
                    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest">Calling Divine Content...</p>
                            </div>
                        ) : (
                            <div className="bg-white p-12 md:p-20 rounded-[64px] shadow-2xl shadow-orange-900/5 relative overflow-hidden border border-gray-100">
                                {/* Dynamic Page Rendering */}
                                {(() => {
                                    const page = pages.find(p => p.slug === view);
                                    if (!page) return (
                                        <div className="text-center">
                                            <AlertTriangle className="w-20 h-20 text-gray-100 mx-auto mb-6" />
                                            <h2 className="text-4xl font-black text-gray-900 heading-divine mb-4">404: Page Not Found</h2>
                                            <p className="text-gray-500 font-bold mb-8">The content you are seeking has moved into the ethereal realm.</p>
                                            <button onClick={() => setView('home')} className="px-10 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all">Return to Home</button>
                                        </div>
                                    );
                                    return (
                                        <div className="prose prose-orange max-w-none">
                                            <h1 className="text-5xl font-black text-gray-900 heading-divine mb-4 leading-tight">{page.title}</h1>
                                            <div className="w-20 h-1.5 bg-orange-600 rounded-full mb-12" />
                                            <div className="text-lg text-gray-700 leading-relaxed font-medium space-y-6" dangerouslySetInnerHTML={{ __html: page.content }} />
                                            {page.meta_description && (
                                                <div className="mt-12 pt-12 border-t border-gray-100 italic text-gray-400 text-sm">
                                                    {page.meta_description}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                                <Sparkles className="absolute top-[-20px] right-[-20px] w-60 h-60 text-orange-50/50 -rotate-12 pointer-events-none" />
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="relative mt-32 bg-[#4a0404] text-white pt-24 pb-12 overflow-hidden border-t-8 border-[#d4ac0d]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 border-b border-white/10 pb-20">
                        {/* Contact Column */}
                        <div className="space-y-8">
                            <h4 className="text-xl font-bold uppercase tracking-[0.2em] text-[#d4ac0d] border-b-2 border-[#d4ac0d] pb-4 inline-block">Contact Us</h4>
                            <div className="space-y-6">
                                <p className="text-lg font-bold tracking-tight text-white/90 leading-snug">{config.templeName}</p>
                                <p className="text-sm text-white/60 leading-relaxed max-w-xs italic">{config.address}</p>
                                <div className="space-y-4 pt-4">
                                    <a href={`mailto:${config.contactEmail}`} className="flex items-center gap-3 text-sm hover:text-orange-400 transition-colors">
                                        <Mail className="w-4 h-4 text-orange-400 text-xs" /> {config.contactEmail}
                                    </a>
                                    <a href={`tel:${config.contactPhone}`} className="flex items-center gap-3 text-sm hover:text-orange-400 transition-colors">
                                        <Phone className="w-4 h-4 text-orange-400" /> {config.contactPhone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Column */}
                        <div className="space-y-8">
                            <h4 className="text-xl font-bold uppercase tracking-[0.2em] text-[#d4ac0d] border-b-2 border-[#d4ac0d] pb-4 inline-block">Quick Links</h4>
                            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/80">
                                <li className="hover:text-orange-400 transition-all cursor-pointer flex items-center gap-2 group" onClick={() => setView('home')}>
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" /> Home
                                </li>
                                <li className="hover:text-orange-400 transition-all cursor-pointer flex items-center gap-2 group" onClick={() => setView('history')}>
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" /> History & Timings
                                </li>
                                <li className="hover:text-orange-400 transition-all cursor-pointer flex items-center gap-2 group" onClick={() => setView('seva')}>
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" /> Darshan Booking
                                </li>
                                <li className="hover:text-orange-400 transition-all cursor-pointer flex items-center gap-2 group" onClick={() => setView('donation')}>
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" /> E-Hundi Donation
                                </li>
                            </ul>

                            <h4 className="text-xl font-bold uppercase tracking-[0.2em] text-[#d4ac0d] border-b-2 border-[#d4ac0d] pb-4 pt-4 inline-block">Official Channel</h4>
                            <div className="pt-2 space-y-3">
                                <a
                                    href="https://www.youtube.com/@ramanujampendurthi1012"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 p-4 rounded-2xl transition-all group"
                                >
                                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-110 transition-transform">
                                        <Youtube className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-red-500">Subscribe on</p>
                                        <p className="text-sm font-bold text-white">YouTube Channel</p>
                                    </div>
                                </a>

                                <a
                                    href="https://whatsapp.com/channel/0029ValpI9L4IBhC7C1l9y2Z"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 bg-green-600/10 hover:bg-green-600/20 border border-green-600/30 p-4 rounded-2xl transition-all group"
                                >
                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-900/40 group-hover:scale-110 transition-transform">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-green-500">Join our</p>
                                        <p className="text-sm font-bold text-white">WhatsApp Channel</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Timings Column */}
                        <div className="space-y-8">
                            <h4 className="text-xl font-bold uppercase tracking-[0.2em] text-[#d4ac0d] border-b-2 border-[#d4ac0d] pb-4 inline-block">Temple Timings</h4>
                            <div className="space-y-4 text-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                                {Object.entries(config.timings).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-white/40 uppercase text-[10px] font-black">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                        <span className={`font-black tracking-tight ${key.toLowerCase().includes('break') ? 'text-red-400' : 'text-orange-100'}`}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="text-center space-y-12">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">
                                © {new Date().getFullYear()} Uttarandhra Tirumala. All Rights Reserved.
                            </p>
                            <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.1em]">
                                Designed & Developed by JMRSAI TECHNOLOGIES
                            </p>
                        </div>

                        {/* Live Visitors Counter */}
                        <div className="inline-flex items-center gap-3 bg-black/40 px-6 py-2.5 rounded-full border border-[#d4ac0d]/20 shadow-xl">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#d4ac0d]">Live Visitors: 5</span>
                        </div>

                        <div className="pt-12">
                            <h2 className="text-3xl font-black heading-divine gold-text-glow tracking-[0.5em] text-[#d4ac0d] uppercase opacity-80">
                                Om Namo Venkatesaya
                            </h2>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Persistent Audio Player */}
            <AudioPlayer lang={lang} t={t} />
            {/* Background Divine Chant */}
            <BackgroundMusic />
        </div>
    )
}

export default App
