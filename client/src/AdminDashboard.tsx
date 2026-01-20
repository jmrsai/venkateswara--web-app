import { useState, useEffect } from 'react'
import {
    Users,
    IndianRupee,
    Package,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    Calendar,
    Loader2,
    BarChart3,
    PieChart as PieChartIcon,
    ArrowUpRight,
    MessageSquare,
    Sparkles,
    BrainCircuit,
    Lightbulb,
    Plus,
    Trash2,
    Save,
    LayoutDashboard,
    BookOpen,
    Video,
    Music,
    Globe,
    ShieldCheck,
    Bell,
    FileText,
    Heart,
    HandHelping,
    UserPlus,
    Building2,
    Store,
    Layout,
    Image as ImageIcon,
    Edit,
    X,
    Settings,
    Menu,
    Box
} from 'lucide-react'
import { templeService, INITIAL_INSIGHTS, MOCK_INVENTORY, MOCK_BOOKINGS, INITIAL_SITE_CONFIG } from './templeService'
import { TempleInsights, InventoryItem, FeedbackItem, SiteConfig, Seva, LibraryItem, VideoItem, NewsItem, Donation, Booking, TempleEvent, DynamicPage, Announcement } from './types'
import { Language } from './translations'

export function AdminDashboard({ lang, t }: { lang: Language, t: any }) {
    const [insights, setInsights] = useState<TempleInsights>(INITIAL_INSIGHTS)
    const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY)
    const [bookings, setBookings] = useState<any[]>(MOCK_BOOKINGS)
    const [gallery, setGallery] = useState<any[]>([])
    const [feedback, setFeedback] = useState<FeedbackItem[]>([])
    const [aiAnalysis, setAiAnalysis] = useState<any>(null)
    const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG)
    const [sevas, setSevas] = useState<Seva[]>([])
    const [library, setLibrary] = useState<LibraryItem[]>([])
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [news, setNews] = useState<NewsItem[]>([])
    const [pages, setPages] = useState<DynamicPage[]>([])
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'insights' | 'rituals' | 'finance' | 'inventory' | 'events' | 'community' | 'broadcast' | 'gallery' | 'feedback' | 'content' | 'settings' | 'pages' | 'announcements'>('insights')
    const [contentSubTab, setContentSubTab] = useState<'sevas' | 'videos' | 'library' | 'news'>('sevas')
    const [settingsSubTab, setSettingsSubTab] = useState<'general' | 'appearance' | 'home' | 'history' | 'features' | 'logistics' | 'darshan'>('general')
    const [allDonations, setAllDonations] = useState<Donation[]>([])
    const [allEvents, setAllEvents] = useState<TempleEvent[]>([])
    const [allNotifications, setAllNotifications] = useState<any[]>([])
    const [uploading, setUploading] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showPageModal, setShowPageModal] = useState(false)
    const [showAnnModal, setShowAnnModal] = useState(false)
    const [showInventoryModal, setShowInventoryModal] = useState(false)
    const [showEventModal, setShowEventModal] = useState(false)
    const [selectedPage, setSelectedPage] = useState<Partial<DynamicPage> | null>(null)
    const [selectedAnn, setSelectedAnn] = useState<Partial<Announcement> | null>(null)
    const [selectedInventory, setSelectedInventory] = useState<Partial<InventoryItem> | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<Partial<TempleEvent> | null>(null)
    const [newItem, setNewItem] = useState<any>({ type: 'audio' })
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [
                    liveInsights,
                    liveGallery,
                    liveFeedback,
                    liveConfig,
                    liveSevas,
                    liveLibrary,
                    liveVideos,
                    liveNews,
                    liveInventory,
                    liveBookings,
                    liveDonations,
                    liveEvents,
                    liveNotifications,
                    livePages,
                    liveAnnouncements
                ] = await Promise.all([
                    templeService.getInsights(),
                    templeService.getGallery(),
                    templeService.getFeedback(),
                    templeService.getSiteConfig(),
                    templeService.getSevas(),
                    templeService.getLibrary(),
                    templeService.getVideos(),
                    templeService.getNews(),
                    templeService.getInventory(),
                    templeService.getAllBookings(),
                    templeService.getAllDonations(),
                    templeService.getEvents(),
                    templeService.getNotifications(),
                    templeService.getPages(),
                    templeService.getAnnouncements()
                ]);
                setInsights(liveInsights);
                setGallery(liveGallery);
                setFeedback(liveFeedback);
                setConfig(liveConfig);
                setSevas(liveSevas);
                setLibrary(liveLibrary);
                setVideos(liveVideos);
                setNews(liveNews);
                setInventory(liveInventory);
                setBookings(liveBookings);
                setAllDonations(liveDonations);
                setAllEvents(liveEvents);
                setAllNotifications(liveNotifications);
                setPages(livePages);
                setAnnouncements(liveAnnouncements);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await templeService.uploadImage(file);
            if (result.success && result.url) {
                await templeService.addGalleryItem({
                    url: result.url,
                    caption: file.name.split('.')[0],
                    type: 'image'
                });
                const updatedGallery = await templeService.getGallery();
                setGallery(updatedGallery);
            } else {
                alert(`Upload failed: ${result.message}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (id: string, url: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const result = await templeService.deleteGalleryItem(id, url);
            if (result.success) {
                setGallery(gallery.filter(item => item.id !== id));
            } else {
                alert(`Delete failed: ${result.message}`);
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleAiAnalysis = async () => {
        setIsAnalyzing(true);
        try {
            const analysis = await templeService.analyzeFeedback(feedback);
            setAiAnalysis(analysis);
        } catch (error) {
            console.error("AI Analysis failed:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSaveConfig = async () => {
        setIsSaving(true);
        const result = await templeService.updateSiteConfig(config);
        if (result.success) {
            alert("Site configuration updated successfully!");
        } else {
            alert(`Failed to save: ${result.message}`);
        }
        setIsSaving(false);
    };

    const handleDeleteSeva = async (id: string) => {
        if (!confirm("Delete this seva permanently?")) return;
        const result = await templeService.deleteSeva(id);
        if (result.success) {
            setSevas(sevas.filter(s => s.id !== id));
        }
    };

    const handleDeleteLibraryItem = async (id: string) => {
        if (!confirm("Delete this library item?")) return;
        const result = await templeService.deleteLibraryItem(id);
        if (result.success) {
            setLibrary(library.filter(item => item.id !== id));
        }
    };

    const handleDeleteVideo = async (id: string) => {
        if (!confirm("Delete this video?")) return;
        const result = await templeService.deleteVideo(id);
        if (result.success) {
            setVideos(videos.filter(v => v.id !== id));
        }
    };

    const handleDeleteNews = async (id: string) => {
        if (!confirm("Delete this news article?")) return;
        const result = await templeService.deleteNews(id);
        if (result.success) {
            setNews(news.filter(n => n.id !== id));
        }
    };

    const handleLibraryUpload = async (file: File) => {
        setUploading(true);
        try {
            const bucket = newItem.type === 'audio' ? 'audio' : 'ebooks';
            const result = await templeService.uploadFile(file, bucket, 'library');

            if (result.success && result.url) {
                const libraryItem: Partial<LibraryItem> = {
                    ...newItem,
                    url: result.url,
                    thumbnailUrl: newItem.type === 'ebook' ? 'https://picsum.photos/seed/book/200/300' : undefined
                };

                const saveResult = await templeService.addLibraryItem(libraryItem);
                if (saveResult.success) {
                    const updated = await templeService.getLibrary();
                    setLibrary(updated);
                    setShowAddModal(false);
                    setNewItem({ type: 'audio' });
                } else {
                    alert(`Save failed: ${saveResult.message}`);
                }
            } else {
                alert(`Upload failed: ${result.message}`);
            }
        } catch (error) {
            console.error("Library upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleAddSeva = async () => {
        setIsSaving(true);
        const result = await templeService.addSeva(newItem);
        if (result.success) {
            const updated = await templeService.getSevas();
            setSevas(updated);
            setShowAddModal(false);
            setNewItem({});
        }
        setIsSaving(false);
    };

    const handleAddVideo = async () => {
        setIsSaving(true);
        const result = await templeService.addVideo(newItem);
        if (result.success) {
            const updated = await templeService.getVideos();
            setVideos(updated);
            setShowAddModal(false);
            setNewItem({});
        }
        setIsSaving(false);
    };

    const handleAddNews = async () => {
        setIsSaving(true);
        const result = await templeService.saveNews(newItem);
        if (result.success) {
            const updated = await templeService.getNews();
            setNews(updated);
            setShowAddModal(false);
            setNewItem({});
        }
        setIsSaving(false);
    };

    const handleDeleteInventory = async (id: string) => {
        if (!confirm("Delete this inventory item?")) return;
        const result = await templeService.deleteInventory(id);
        if (result.success) {
            setInventory(inventory.filter(i => i.id !== id));
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!confirm("Delete this event?")) return;
        const result = await templeService.deleteEvent(id);
        if (result.success) {
            setAllEvents(allEvents.filter(e => e.id !== id));
        }
    };

    const visitorStats = templeService.getWeeklyVisitorStats()
    const donationStats = templeService.getDonationCategoryStats()

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-gray-500 font-bold">Accessing Temple Records...</p>
            </div>
        )
    }

    const StatCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string | number, icon: any, color: string, trend?: string }) => (
        <div className="bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${color}`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                {trend && (
                    <span className="flex items-center gap-1 text-green-600 text-[10px] md:text-xs font-black bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" /> {trend}
                    </span>
                )}
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-xl md:text-3xl font-black text-gray-900 group-hover:text-orange-600 transition-colors truncate">{value}</h4>
        </div>
    )

    const navigation = [
        { id: 'insights', label: lang === 'te' ? 'డాష్‌బోర్డ్' : 'Dashboard', icon: LayoutDashboard },
        { id: 'rituals', label: lang === 'te' ? 'క్రతువులు' : 'Rituals', icon: ShieldCheck },
        { id: 'finance', label: lang === 'te' ? 'విరాళాలు' : 'Donations', icon: IndianRupee },
        { id: 'inventory', label: lang === 'te' ? 'ఇన్వెంటరీ' : 'Inventory', icon: Package },
        { id: 'events', label: lang === 'te' ? 'ఈవెంట్స్' : 'Events', icon: Calendar },
        { id: 'pages', label: lang === 'te' ? 'పేజీలు' : 'Web Pages', icon: BookOpen },
        { id: 'announcements', label: lang === 'te' ? 'ప్రకటనలు' : 'Announcements', icon: Bell },
        { id: 'community', label: lang === 'te' ? 'కమ్యూనిటీ' : 'Community', icon: Users },
        { id: 'broadcast', label: lang === 'te' ? 'ప్రసారం' : 'Broadcast', icon: Globe },
        { id: 'gallery', label: lang === 'te' ? 'గ్యాలరీ' : 'Gallery', icon: ImageIcon },
        { id: 'feedback', label: lang === 'te' ? 'అభిప్రాయం' : 'Feedback', icon: MessageSquare },
        { id: 'content', label: lang === 'te' ? 'కంటెంట్' : 'CMS', icon: Layout },
        { id: 'settings', label: lang === 'te' ? 'సెట్టింగులు' : 'Customizer', icon: Settings },
    ]

    return (
        <div className="flex bg-gray-50 min-h-screen overflow-hidden font-sans relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-sm font-black text-gray-900 uppercase">Admin</h2>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-gray-50 rounded-xl text-gray-600 active:scale-95 transition-all">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen transition-all duration-300 z-50 bg-white border-r border-gray-100 flex flex-col
                ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 w-20 lg:w-72'}
            `}>
                <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-100">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div className={`${mobileMenuOpen ? 'block' : 'hidden lg:block'} overflow-hidden whitespace-nowrap`}>
                        <h2 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Admin Portal</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Master Control</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {navigation.map((item) => {
                        const Icon = item.icon as any;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id as any);
                                    setMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all group ${activeTab === item.id
                                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-100 scale-[1.02]'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-orange-600'}`}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`} />
                                <span className={`${mobileMenuOpen ? 'block' : 'hidden lg:block'} font-black text-xs uppercase tracking-widest`}>{item.label}</span>
                                {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse transition-all" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <div className="hidden lg:block bg-gray-50 p-4 rounded-2xl mb-4">
                        <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Authenticated As</p>
                        <p className="text-xs font-black text-gray-900 truncate">System Administrator</p>
                    </div>
                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-widest">
                        <ArrowUpRight className="w-5 h-5 rotate-45" />
                        <span className="hidden lg:block">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pt-24 md:pt-12 custom-scrollbar transition-all">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
                    <div className="animate-in slide-in-from-left-4 duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live System Active</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter">
                            {navigation.find(n => n.id === activeTab)?.label}
                        </h1>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                        <div className="flex flex-col text-left md:text-right">
                            <span className="text-[10px] font-black text-gray-400 uppercase">Local Time</span>
                            <span className="text-sm font-black text-gray-900">{new Date().toLocaleTimeString()}</span>
                        </div>
                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm relative active:scale-95 transition-all">
                            <Bell className="w-6 h-6 text-gray-400" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-white" />
                        </div>
                    </div>
                </header>

                {activeTab === 'insights' ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                            <StatCard title="Today's Donations" value={`₹${donationStats.reduce((a, b) => a + b.value, 0).toLocaleString()}`} icon={IndianRupee} color="bg-green-500" trend="+12%" />
                            <StatCard title="Laddu Stock" value={insights.ladduStock} icon={Package} color="bg-blue-500" />
                            <StatCard title="Live Visitors" value={5} icon={Users} color="bg-green-500" />
                            <StatCard title="Total Visits" value={insights.totalVisitors || 0} icon={TrendingUp} color="bg-orange-500" />
                            <StatCard title="Wait Time" value={`${insights.darshanWaitTime}m`} icon={Clock} color="bg-purple-500" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Inventory Alerts */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black text-gray-900">Inventory Status</h3>
                                        <button className="text-orange-600 text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {inventory.filter(i => i.stock < i.lowStockThreshold).length > 0 ? (
                                            inventory.filter(i => i.stock < i.lowStockThreshold).map(item => (
                                                <div key={item.id} className="flex justify-between items-center p-4 bg-red-50 border border-red-100 rounded-2xl">
                                                    <div>
                                                        <p className="font-bold text-red-900">{item.name}</p>
                                                        <p className="text-xs text-red-700 opacity-70">Critically Low Stock</p>
                                                    </div>
                                                    <span className="font-black text-red-900">{item.stock} {item.unit}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm italic">All stock levels are optimal.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 rounded-3xl shadow-lg text-white">
                                    <h3 className="text-xl font-bold mb-2">Live Crowd Status</h3>
                                    <p className="opacity-80 text-sm mb-6">Real-time occupancy and wait times for queue management.</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-4xl font-black">{insights.darshanWaitTime}m</p>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Darshan Wait Time</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold">{insights.crowdStatus}</p>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Capacity Use</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeTab === 'rituals' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Live Bookings</h4>
                                <p className="text-3xl font-black text-gray-900">{bookings.length}</p>
                                <p className="text-[10px] text-green-600 font-bold mt-1">Pending Processing</p>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Active Sevas</h4>
                                <p className="text-3xl font-black text-gray-900">{sevas.length}</p>
                                <p className="text-[10px] text-blue-600 font-bold mt-1">Managed in CMS</p>
                            </div>
                            <button
                                onClick={() => { setActiveTab('content'); setContentSubTab('sevas'); }}
                                className="bg-orange-600 p-6 rounded-[32px] text-white shadow-xl shadow-orange-100 flex items-center justify-between group"
                            >
                                <div className="text-left">
                                    <h4 className="text-xs font-black opacity-70 uppercase tracking-widest mb-1">Quick Action</h4>
                                    <p className="text-lg font-black">Edit Seva List</p>
                                </div>
                                <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>

                        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-xl font-black text-gray-900">Recent Booking Log</h3>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase hover:bg-gray-100 transition-all">Export PDF</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Devotee</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Seva Type</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-black text-gray-900">{booking.devotee_name || booking.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold">{booking.mobile || booking.phone}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-black uppercase rounded-full border border-orange-100">
                                                        {booking.sevas?.name || booking.type}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-gray-600">{new Date(booking.date).toLocaleDateString()}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${booking.status === 'Booked' || booking.status === 'Confirmed' ? 'bg-green-50 text-green-700' :
                                                        booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-orange-600 text-xs font-black uppercase hover:underline">Verify</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'finance' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard title="Total Donations" value={`₹${allDonations.reduce((a, b) => a + b.amount, 0).toLocaleString()}`} icon={IndianRupee} color="bg-green-600" />
                            <StatCard title="Verified" value={allDonations.filter(d => d.status === 'Verified').length} icon={CheckCircle} color="bg-blue-600" />
                            <StatCard title="Pending" value={allDonations.filter(d => d.status === 'Pending').length} icon={Clock} color="bg-orange-600" />
                            <StatCard title="Donors" value={new Set(allDonations.map(d => d.donorName)).size} icon={Users} color="bg-purple-600" />
                        </div>

                        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-xl font-black text-gray-900">Donation Ledger</h3>
                                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 hover:underline">
                                    <FileText className="w-4 h-4" /> Download Audit Report
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Donor</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {allDonations.map((donation) => (
                                            <tr key={donation.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-black text-gray-900">{donation.donorName}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{donation.gothram || 'N/A'}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs font-bold text-gray-600">{donation.category}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="font-black text-gray-900">₹{donation.amount.toLocaleString()}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <code className="text-[10px] bg-gray-100 px-2 py-1 rounded-md text-gray-500">{donation.transactionId}</code>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${donation.status === 'Verified' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                                        }`}>
                                                        {donation.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    {donation.status === 'Pending' && (
                                                        <button
                                                            onClick={async () => {
                                                                await templeService.updateDonationStatus(donation.id, 'Verified');
                                                                const updated = await templeService.getAllDonations();
                                                                setAllDonations(updated);
                                                            }}
                                                            className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all"
                                                        >
                                                            Verify
                                                        </button>
                                                    )}
                                                    <button className="ml-2 p-2 text-gray-400 hover:text-orange-600 transition-colors">
                                                        <FileText className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'inventory' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Total SKUs</h4>
                                <p className="text-3xl font-black text-gray-900">{inventory.length}</p>
                                <p className="text-[10px] text-gray-400 font-bold mt-1">Managed Assets</p>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-red-100 shadow-sm">
                                <h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-4">Low Stock Alerts</h4>
                                <p className="text-3xl font-black text-red-600">{inventory.filter(i => i.stock < i.lowStockThreshold).length}</p>
                                <p className="text-[10px] text-red-600 font-bold mt-1">Requires immediate attention</p>
                            </div>
                            <button onClick={() => { setSelectedInventory({}); setShowInventoryModal(true); }} className="bg-gray-900 p-6 rounded-[32px] text-white shadow-xl flex items-center justify-between group">
                                <div className="text-left">
                                    <h4 className="text-xs font-black opacity-70 uppercase tracking-widest mb-1">Stock Control</h4>
                                    <p className="text-lg font-black">Add Inventory</p>
                                </div>
                                <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50">
                                <h3 className="text-xl font-black text-gray-900">Temple Asset Inventory</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Name</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Level</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Threshold</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {inventory.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-black text-gray-900">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.id}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase rounded-full">{item.category}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-[100px] overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${item.stock < item.lowStockThreshold ? 'bg-red-500' : 'bg-green-500'}`}
                                                                style={{ width: `${Math.min(100, (item.stock / (item.lowStockThreshold * 2)) * 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className={`font-black text-sm ${item.stock < item.lowStockThreshold ? 'text-red-600' : 'text-gray-900'}`}>
                                                            {item.stock} {item.unit}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-gray-500">{item.lowStockThreshold} {item.unit}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => { setSelectedInventory(item); setShowInventoryModal(true); }} className="text-orange-600 text-xs font-black uppercase hover:underline">Edit</button>
                                                        <button onClick={() => handleDeleteInventory(item.id)} className="text-red-500 text-xs font-black uppercase hover:underline">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'events' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Festival & Event Calendar</h3>
                                <p className="text-gray-500 font-medium">Coordinate upcoming celebrations and temple gatherings.</p>
                            </div>
                            <button onClick={() => { setSelectedEvent({}); setShowEventModal(true); }} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/10">
                                <Calendar className="w-5 h-5" /> Schedule Event
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="h-48 relative overflow-hidden">
                                        <img src={event.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-orange-600">
                                            {event.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-2">
                                            <Clock className="w-3 h-3" />
                                            {event.start_date ? new Date(event.start_date).toLocaleDateString() : 'Date TBA'}
                                        </div>
                                        <h4 className="text-xl font-black text-gray-900 mb-2 truncate">{event.title}</h4>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-medium">{event.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black text-gray-900 uppercase tracking-widest">
                                                {event.registration_required ? 'Registration Open' : 'Free Entry'}
                                            </span>
                                            <div className="flex gap-2">
                                                <button onClick={() => { setSelectedEvent(event); setShowEventModal(true); }} className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteEvent(event.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'community' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard title="Total Devotees" value="1,240" icon={Users} color="bg-indigo-600" />
                            <StatCard title="Active Volunteers" value="45" icon={HandHelping} color="bg-pink-600" />
                            <StatCard title="Priests & Staff" value="12" icon={UserPlus} color="bg-amber-600" />
                        </div>

                        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50">
                                <h3 className="text-xl font-black text-gray-900">Staff & Devotee Directory</h3>
                            </div>
                            <div className="p-24 text-center">
                                <Users className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                                <h4 className="text-lg font-black text-gray-900 mb-2">Advanced CRM Loading...</h4>
                                <p className="text-gray-400 font-bold max-w-sm mx-auto text-sm">We are synchronizing user roles and profiles with the secure identity vault.</p>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'broadcast' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Send Notification */}
                            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                        <Bell className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900">Broadcast Center</h3>
                                        <p className="text-gray-500 font-medium">Push alerts to devotees and staff.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="block">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Message Subject</span>
                                        <input type="text" placeholder="e.g. Special Darshan Timing Update" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Message Content</span>
                                        <textarea rows={4} placeholder="Type your divine message here..." className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                                            <Globe className="w-5 h-5" /> Push to App
                                        </button>
                                        <button className="py-4 bg-orange-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 active:scale-95">
                                            <MessageSquare className="w-5 h-5" /> Send SMS
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Alerts */}
                            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-8">Sent Notifications</h3>
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {allNotifications.map((notif, i) => (
                                        <div key={notif.id || i} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-black text-gray-900">{notif.title}</h4>
                                                <span className="text-[10px] bg-white px-2 py-1 rounded-full font-bold text-gray-400 uppercase">{new Date(notif.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 font-medium">{notif.body || notif.message}</p>
                                        </div>
                                    ))}
                                    {allNotifications.length === 0 && (
                                        <div className="text-center py-12 opacity-50">
                                            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                            <p className="font-bold text-gray-400">No broadcast history.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'gallery' ? (
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Gallery Management</h3>
                                <p className="text-gray-500 font-medium">Upload and manage temple photos for the public gallery.</p>
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="gallery-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                <label
                                    htmlFor="gallery-upload"
                                    className={`px-8 py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center gap-2 cursor-pointer hover:bg-orange-600 transition-all shadow-xl active:scale-95 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUpRight className="w-5 h-5" />}
                                    {uploading ? 'Uploading...' : 'Upload New Image'}
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {gallery.map(item => (
                                <div key={item.id} className="group relative rounded-3xl overflow-hidden aspect-square border border-gray-100 bg-gray-50 shadow-sm hover:shadow-xl transition-all">
                                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <p className="text-white text-xs font-black truncate mb-2">{item.caption}</p>
                                        <button
                                            onClick={() => handleDeleteImage(item.id, item.url)}
                                            className="w-full bg-red-600/90 hover:bg-red-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-sm transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {gallery.length === 0 && (
                            <div className="text-center py-24 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold">No images in gallery yet.</p>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'feedback' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-black text-gray-900 mb-8">{t.devoteeFeedback}</h3>
                                <div className="space-y-4">
                                    {feedback.map((item) => (
                                        <div key={item.id} className="p-6 bg-gray-50 rounded-[32px] border border-transparent hover:border-orange-100 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-black text-gray-900">{item.name}</h4>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(item.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">{item.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-white/10 rounded-xl">
                                            <BrainCircuit className="w-6 h-6 text-purple-300" />
                                        </div>
                                        <h3 className="text-xl font-black">{t.aiInsights}</h3>
                                    </div>
                                    <p className="text-purple-100/70 text-sm mb-8 leading-relaxed">
                                        {t.aiExplanation}
                                    </p>

                                    {!aiAnalysis ? (
                                        <button
                                            onClick={handleAiAnalysis}
                                            disabled={isAnalyzing}
                                            className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                            {isAnalyzing ? 'Analyzing...' : t.generateAiReport}
                                        </button>
                                    ) : (
                                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                <p className="text-xs font-black text-purple-300 uppercase tracking-widest mb-2">{t.divineInsights}</p>
                                                <p className="text-sm font-medium leading-relaxed italic">
                                                    "{lang === 'te' ? aiAnalysis.te_summary : aiAnalysis.summary}"
                                                </p>
                                            </div>
                                            <div className="space-y-3">
                                                {(lang === 'te' ? aiAnalysis.te_suggestions : aiAnalysis.suggestions).map((s: string, i: number) => (
                                                    <div key={i} className="flex gap-3 items-start">
                                                        <div className="p-1 bg-green-500/20 rounded mt-1">
                                                            <Lightbulb className="w-3 h-3 text-green-400" />
                                                        </div>
                                                        <p className="text-xs font-bold text-gray-300">{s}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setAiAnalysis(null)}
                                                className="w-full py-2 text-xs font-bold text-purple-300 hover:text-white transition-colors"
                                            >
                                                Reset Analysis
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Sparkles className="absolute bottom-[-20px] right-[-20px] w-40 h-40 text-white/5 rotate-12" />
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'settings' ? (
                    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                        {/* Settings Sub-tabs */}
                        <div className="flex overflow-x-auto gap-2 p-1 bg-gray-100 rounded-3xl w-full md:w-fit no-scrollbar select-none">
                            <button onClick={() => setSettingsSubTab('general')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'general' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Identity</button>
                            <button onClick={() => setSettingsSubTab('appearance')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'appearance' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Appearance</button>
                            <button onClick={() => setSettingsSubTab('home')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'home' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Home Page</button>
                            <button onClick={() => setSettingsSubTab('history')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'history' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>History Page</button>
                            <button onClick={() => setSettingsSubTab('features')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'features' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Features</button>
                            <button onClick={() => setSettingsSubTab('logistics')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'logistics' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Logistics</button>
                            <button onClick={() => setSettingsSubTab('darshan')} className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settingsSubTab === 'darshan' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>3D Darshan</button>
                        </div>

                        <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900 heading-divine capitalize">{settingsSubTab} Customization</h3>
                                    <p className="text-gray-500">Master control for {settingsSubTab} level experiences.</p>
                                </div>
                                <button
                                    onClick={handleSaveConfig}
                                    disabled={isSaving}
                                    className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/10 active:scale-95 disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                            {settingsSubTab === 'general' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Temple Name</span>
                                            <input type="text" value={config.templeName} onChange={(e) => setConfig({ ...config, templeName: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-orange-500 outline-none transition-all" />
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Subtitle (English)</span>
                                            <input type="text" value={config.subTitle} onChange={(e) => setConfig({ ...config, subTitle: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-orange-500 outline-none transition-all" />
                                        </label>
                                        <div className="p-6 bg-orange-50/50 rounded-3xl border border-orange-100">
                                            <h4 className="text-sm font-black text-orange-900 uppercase tracking-widest mb-4">Temple Timings</h4>
                                            <div className="grid grid-cols-1 gap-4">
                                                {Object.entries(config.timings).map(([key, value]) => (
                                                    <div key={key} className="flex items-center gap-4">
                                                        <span className="w-32 text-[10px] font-black uppercase text-gray-500 tracking-tighter">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                        <input type="text" value={value} onChange={(e) => setConfig({ ...config, timings: { ...config.timings, [key]: e.target.value } })} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Logo URL</span>
                                            <div className="flex gap-4 items-center">
                                                <img src={config.logoUrl} className="w-16 h-16 rounded-2xl object-contain border border-gray-100 p-2" alt="Logo" />
                                                <input type="text" value={config.logoUrl} onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })} className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-sm" />
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Contact Info</span>
                                            <div className="space-y-3">
                                                <input type="text" placeholder="Phone" value={config.contactPhone} onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 font-bold text-sm" />
                                                <input type="text" placeholder="Email" value={config.contactEmail} onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 font-bold text-sm" />
                                                <textarea placeholder="Address" value={config.address} onChange={(e) => setConfig({ ...config, address: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 font-bold text-sm" rows={3} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {settingsSubTab === 'darshan' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-8">
                                        <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
                                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <Layout className="w-4 h-4 text-orange-600" />
                                                Model Configuration
                                            </h4>
                                            <div className="space-y-6">
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">3D Model (STL URL)</span>
                                                    <input type="text" value={config.threeDConfig?.stlUrl || ''} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, stlUrl: e.target.value } })} placeholder="/tirupati.stl" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 font-bold text-sm" />
                                                </label>
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Model Scale ({config.threeDConfig?.modelScale})</span>
                                                    <input type="range" min="0.01" max="1" step="0.01" value={config.threeDConfig?.modelScale || 0.15} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, modelScale: parseFloat(e.target.value) } })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                                                </label>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Initial Rotation ([X, Y, Z])</span>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {[0, 1, 2].map((i) => (
                                                            <input key={i} type="number" step="0.1" value={config.threeDConfig?.initialRotation[i] || 0} onChange={(e) => {
                                                                const newRot = [...(config.threeDConfig?.initialRotation || [0, 0, 0])];
                                                                newRot[i] = parseFloat(e.target.value);
                                                                setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, initialRotation: newRot as [number, number, number] } });
                                                            }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-8 bg-orange-50/30 rounded-[40px] border border-orange-100/50">
                                            <h4 className="text-sm font-black text-orange-950 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-orange-600" />
                                                Divine Lighting
                                            </h4>
                                            <div className="space-y-6">
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Ambient Intensity ({config.threeDConfig?.ambientIntensity})</span>
                                                    <input type="range" min="0" max="2" step="0.1" value={config.threeDConfig?.ambientIntensity || 0.8} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, ambientIntensity: parseFloat(e.target.value) } })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                                                </label>
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Point Light Intensity ({config.threeDConfig?.pointIntensity})</span>
                                                    <input type="range" min="0" max="5" step="0.1" value={config.threeDConfig?.pointIntensity || 1.5} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, pointIntensity: parseFloat(e.target.value) } })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                                                </label>
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Spot Light Intensity ({config.threeDConfig?.spotIntensity})</span>
                                                    <input type="range" min="0" max="10" step="0.1" value={config.threeDConfig?.spotIntensity || 2.5} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, spotIntensity: parseFloat(e.target.value) } })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                                                </label>
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Light Color</span>
                                                    <div className="flex items-center gap-4">
                                                        <input type="color" value={config.threeDConfig?.lightColor || '#ffffff'} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, lightColor: e.target.value } })} className="w-12 h-12 rounded-xl border-0 p-0 overflow-hidden cursor-pointer shadow-sm" />
                                                        <input type="text" value={config.threeDConfig?.lightColor || '#ffffff'} onChange={(e) => setConfig({ ...config, threeDConfig: { ...config.threeDConfig!, lightColor: e.target.value } })} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold uppercase" />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-indigo-50/30 rounded-[40px] border border-indigo-100/50">
                                            <h4 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <Box className="w-4 h-4 text-indigo-600" />
                                                Model Catalog
                                            </h4>
                                            <div className="space-y-4">
                                                {config.threeDConfig?.models?.map((model) => (
                                                    <div key={model.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-indigo-100">
                                                        <div className="flex-1">
                                                            <p className="text-xs font-black text-gray-900">{model.name}</p>
                                                            <p className="text-[10px] font-bold text-gray-400">{model.url}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setConfig({
                                                                ...config,
                                                                threeDConfig: {
                                                                    ...config.threeDConfig!,
                                                                    activeModelId: model.id,
                                                                    stlUrl: model.url // Keep for legacy compatibility
                                                                }
                                                            })}
                                                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${config.threeDConfig?.activeModelId === model.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                                        >
                                                            {config.threeDConfig?.activeModelId === model.id ? 'Active' : 'Set Active'}
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className="pt-4 border-t border-indigo-100/50">
                                                    <p className="text-[10px] font-bold text-indigo-600/60 uppercase tracking-widest text-center">Managed via templeService configuration</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {settingsSubTab === 'appearance' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Color Palette</h4>
                                            <div className="grid grid-cols-2 gap-6">
                                                {(['primaryColor', 'secondaryColor', 'accentColor', 'backgroundColor'] as const).map((colorKey) => (
                                                    <label key={colorKey} className="block">
                                                        <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">{colorKey.replace(/([A-Z])/g, ' $1')}</span>
                                                        <div className="flex items-center gap-3">
                                                            <input type="color" value={config.theme[colorKey]} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, [colorKey]: e.target.value } })} className="w-12 h-12 rounded-xl border-0 p-0 overflow-hidden cursor-pointer" />
                                                            <input type="text" value={config.theme[colorKey]} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, [colorKey]: e.target.value } })} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold uppercase" />
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Typography</h4>
                                            <div className="grid grid-cols-2 gap-6">
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Heading Font</span>
                                                    <select value={config.theme.headingFont} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, headingFont: e.target.value } })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm">
                                                        <option value="Cinzel">Cinzel (Divine)</option>
                                                        <option value="Outfit">Outfit (Modern)</option>
                                                        <option value="Roboto">Roboto (Clean)</option>
                                                    </select>
                                                </label>
                                                <label className="block">
                                                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">Body Font</span>
                                                    <select value={config.theme.bodyFont} onChange={(e) => setConfig({ ...config, theme: { ...config.theme, bodyFont: e.target.value } })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm">
                                                        <option value="Lato">Lato</option>
                                                        <option value="Outfit">Outfit</option>
                                                        <option value="Inter">Inter</option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-[32px] p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
                                            <Sparkles className="w-8 h-8 text-orange-600" />
                                        </div>
                                        <h4 className="text-xl font-black text-gray-900 mb-2">Live Preview Available Soon</h4>
                                        <p className="text-gray-400 text-sm font-bold max-w-xs transition-all">Changes will be visible to all devotees instantly after saving.</p>
                                    </div>
                                </div>
                            )}

                            {settingsSubTab === 'home' && (
                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Hero Banner Image</span>
                                            <div className="relative group rounded-3xl overflow-hidden border-2 border-orange-100">
                                                <img src={config.heroBannerUrl} className="w-full aspect-video object-cover" alt="Hero" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-black text-xs uppercase shadow-xl hover:scale-105 transition-all">Change Banner</button>
                                                </div>
                                            </div>
                                            <input type="text" value={config.heroBannerUrl} onChange={(e) => setConfig({ ...config, heroBannerUrl: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 mt-4 text-xs font-bold" />
                                        </label>
                                        <div className="space-y-6">
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Section Visibility</h4>
                                            <div className="grid grid-cols-1 gap-4">
                                                {[
                                                    { key: 'enableBooking', label: 'E-Darshan Booking' },
                                                    { key: 'enableHundi', label: 'Online Hundi' },
                                                    { key: 'maintenanceMode', label: 'Maintenance Mode' },
                                                ].map((feature) => (
                                                    <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                        <span className="text-sm font-black text-gray-700">{feature.label}</span>
                                                        <button onClick={() => setConfig({ ...config, [feature.key]: !config[feature.key as keyof SiteConfig] })} className={`w-14 h-8 rounded-full transition-all relative ${config[feature.key as keyof SiteConfig] ? 'bg-orange-600' : 'bg-gray-300'}`}>
                                                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${config[feature.key as keyof SiteConfig] ? 'right-1' : 'left-1'}`} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {settingsSubTab === 'logistics' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="p-8 bg-orange-50/50 rounded-[40px] border border-orange-100">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                                        <TrendingUp className="w-6 h-6 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black text-orange-950 uppercase tracking-widest">Bank Information</h4>
                                                        <p className="text-orange-600/60 text-[10px] font-bold uppercase tracking-widest">Details for Hundi & Donations</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="block">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 mb-2 block">Account Name</span>
                                                        <input type="text" value={config.bankInfo.accountName} onChange={(e) => setConfig({ ...config, bankInfo: { ...config.bankInfo, accountName: e.target.value } })} className="w-full bg-white border border-orange-100 rounded-2xl px-5 py-3 font-bold text-sm outline-none focus:border-orange-500 transition-all" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 mb-2 block">Account Number</span>
                                                        <input type="text" value={config.bankInfo.accountNumber} onChange={(e) => setConfig({ ...config, bankInfo: { ...config.bankInfo, accountNumber: e.target.value } })} className="w-full bg-white border border-orange-100 rounded-2xl px-5 py-3 font-bold text-sm outline-none focus:border-orange-500 transition-all" />
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <label className="block">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 mb-2 block">Bank Name</span>
                                                            <input type="text" value={config.bankInfo.bankName} onChange={(e) => setConfig({ ...config, bankInfo: { ...config.bankInfo, bankName: e.target.value } })} className="w-full bg-white border border-orange-100 rounded-2xl px-5 py-3 font-bold text-sm outline-none focus:border-orange-500 transition-all" />
                                                        </label>
                                                        <label className="block">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 mb-2 block">IFSC Code</span>
                                                            <input type="text" value={config.bankInfo.ifsc} onChange={(e) => setConfig({ ...config, bankInfo: { ...config.bankInfo, ifsc: e.target.value } })} className="w-full bg-white border border-orange-100 rounded-2xl px-5 py-3 font-bold text-sm outline-none focus:border-orange-500 transition-all" />
                                                        </label>
                                                    </div>
                                                    <label className="block">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 mb-2 block">Payment QR Code URL</span>
                                                        <input type="text" value={config.bankInfo.qrCodeUrl} onChange={(e) => setConfig({ ...config, bankInfo: { ...config.bankInfo, qrCodeUrl: e.target.value } })} className="w-full bg-white border border-orange-100 rounded-2xl px-5 py-3 font-bold text-sm outline-none focus:border-orange-500 transition-all" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                                        <Clock className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black text-blue-950 uppercase tracking-widest">Temple Timings</h4>
                                                        <p className="text-blue-600/60 text-[10px] font-bold uppercase tracking-widest">Divine Schedule Configuration</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    {Object.entries(config.timings).map(([key, value]) => (
                                                        <label key={key} className="block">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-900/40 mb-2 block">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                            <input type="text" value={value} onChange={(e) => setConfig({ ...config, timings: { ...config.timings, [key]: e.target.value } })} className="w-full bg-white border border-blue-100 rounded-2xl px-5 py-3 font-bold text-sm outline-none focus:border-blue-500 transition-all" />
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {settingsSubTab === 'history' && (
                                <div className="space-y-8">
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">History Page Main Content</span>
                                        <textarea value={config.historyContent} onChange={(e) => setConfig({ ...config, historyContent: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-[32px] px-8 py-8 font-bold text-gray-900 leading-relaxed outline-none focus:border-orange-500 focus:bg-white transition-all" rows={10} />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 block">History Featured Image</span>
                                        <div className="flex gap-6 items-center">
                                            <img src={config.historyImageUrl} className="w-48 aspect-video rounded-3xl object-cover border border-gray-100 shadow-sm" alt="History" />
                                            <input type="text" value={config.historyImageUrl} onChange={(e) => setConfig({ ...config, historyImageUrl: e.target.value })} className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-sm" />
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'content' ? (
                    <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 heading-divine">Service Management (CMS)</h3>
                                <div className="flex overflow-x-auto pb-1 gap-3 md:gap-4 mt-4 no-scrollbar select-none">
                                    <button onClick={() => setContentSubTab('sevas')} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'sevas' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>Sevas</button>
                                    <button onClick={() => setContentSubTab('videos')} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'videos' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>Videos</button>
                                    <button onClick={() => setContentSubTab('library')} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'library' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>Library</button>
                                    <button onClick={() => setContentSubTab('news')} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === 'news' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>News</button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setNewItem(contentSubTab === 'library' ? { type: 'audio' } : {});
                                    setShowAddModal(true);
                                }}
                                className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-lg"
                            >
                                <Plus className="w-4 h-4" /> Add {contentSubTab === 'sevas' ? 'Seva' : contentSubTab === 'videos' ? 'Video' : contentSubTab === 'news' ? 'News' : 'Item'}
                            </button>
                            {contentSubTab === 'videos' && (
                                <button
                                    onClick={async () => {
                                        setLoading(true);
                                        const res = await templeService.syncYouTubeVideos();
                                        if (res.success) {
                                            const updated = await templeService.getVideos();
                                            setVideos(updated);
                                            alert(`Synced ${res.count} videos from YouTube!`);
                                        } else {
                                            alert('Sync Failed: ' + res.message);
                                        }
                                        setLoading(false);
                                    }}
                                    className="bg-red-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-red-700 transition-all active:scale-95 shadow-lg ml-0 md:ml-2"
                                >
                                    <TrendingUp className="w-4 h-4" /> Sync YouTube
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {contentSubTab === 'sevas' && sevas.map((seva) => (
                                <div key={seva.id} className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gray-50 rounded-[32px] border border-transparent hover:border-orange-200 transition-all group text-center md:text-left">
                                    <img src={seva.imageUrl} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt={seva.name} />
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-1 mb-1">
                                            <h4 className="text-xl font-black text-gray-900">{seva.name}</h4>
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase rounded-full">{seva.day}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{seva.description}</p>
                                        <p className="text-orange-600 font-black">₹{seva.price}</p>
                                    </div>
                                    <div className="flex gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:text-orange-600 hover:border-orange-500 transition-all">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteSeva(seva.id)} className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {contentSubTab === 'library' && library.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gray-50 rounded-[32px] border border-transparent hover:border-orange-200 transition-all group text-center md:text-left">
                                    <div className="w-24 h-24 rounded-2xl bg-orange-100 flex items-center justify-center shadow-inner shrink-0">
                                        {item.type === 'audio' ? <Music className="w-10 h-10 text-orange-600" /> : <BookOpen className="w-10 h-10 text-orange-600" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 mb-1">{lang === 'te' && item.teTitle ? item.teTitle : item.title}</h4>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{lang === 'te' && item.teDescription ? item.teDescription : item.description}</p>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-black uppercase rounded-full">{item.type}</span>
                                            {item.author && <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full">{item.author}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:text-orange-600 hover:border-orange-500 transition-all">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteLibraryItem(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {contentSubTab === 'videos' && videos.map((video) => (
                                <div key={video.id} className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gray-50 rounded-[32px] border border-transparent hover:border-orange-200 transition-all group text-center md:text-left">
                                    <div className="relative w-full md:w-32 aspect-video rounded-2xl overflow-hidden shadow-md shrink-0">
                                        <img src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} className="w-full h-full object-cover" alt={video.title} />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Video className="w-6 h-6 text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 mb-1">{lang === 'te' && video.teTitle ? video.teTitle : video.title}</h4>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{lang === 'te' && video.teDescription ? video.teDescription : video.description}</p>
                                        <p className="text-xs font-bold text-gray-400">ID: {video.videoId}</p>
                                    </div>
                                    <div className="flex gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:text-orange-600 hover:border-orange-500 transition-all">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteVideo(video.id)} className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {contentSubTab === 'videos' && videos.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-bold italic">No videos found. Add one from the button above.</p>
                                </div>
                            )}

                            {contentSubTab === 'news' && news.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-[32px] border border-transparent hover:border-orange-200 transition-all group">
                                    <div className="relative w-32 aspect-video rounded-2xl overflow-hidden shadow-md">
                                        <img src={item.imageUrl || 'https://picsum.photos/seed/news/400/300'} className="w-full h-full object-cover" alt={item.title} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{item.content}</p>
                                        <p className="text-xs font-bold text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:text-orange-600 hover:border-orange-500 transition-all">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteNews(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {contentSubTab === 'news' && news.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-bold italic">No news articles found. Add one from the button above.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'pages' ? (
                    <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-gray-100 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 heading-divine">Dynamic Web Pages</h3>
                                <p className="text-gray-500">Manage custom pages and site-wide content structures.</p>
                            </div>
                            <button onClick={() => { setSelectedPage({}); setShowPageModal(true); }} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-xl">
                                <Plus className="w-5 h-5" /> Create New Page
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pages.map(page => (
                                <div key={page.id} className="group p-6 bg-gray-50 rounded-[32px] border border-gray-100 hover:border-orange-200 hover:bg-white transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${page.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                            {page.is_published ? 'Live' : 'Draft'}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setSelectedPage(page); setShowPageModal(true); }} className="p-2 hover:text-orange-600 transition-colors"><ShieldCheck className="w-4 h-4" /></button>
                                            <button onClick={async () => { if (confirm('Delete page?')) await templeService.deletePage(page.id); setPages(pages.filter(p => p.id !== page.id)); }} className="p-2 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 mb-1">{page.title}</h4>
                                    <p className="text-xs font-bold text-orange-600 mb-4">/{page.slug}</p>
                                    <p className="text-gray-500 text-xs line-clamp-3 mb-6 font-medium leading-relaxed">{page.content.substring(0, 150)}...</p>
                                    <button onClick={() => { setSelectedPage(page); setShowPageModal(true); }} className="w-full py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all">Edit Content</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'announcements' ? (
                    <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-gray-100 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 heading-divine">Announcements Editor</h3>
                                <p className="text-gray-500">Broadcast important updates, alerts, and news to all devotees.</p>
                            </div>
                            <button onClick={() => { setSelectedAnn({}); setShowAnnModal(true); }} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-700 transition-all active:scale-95 shadow-xl">
                                <Bell className="w-5 h-5 shadow-sm" /> New Announcement
                            </button>
                        </div>
                        <div className="space-y-4">
                            {announcements.map(ann => (
                                <div key={ann.id} className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gray-50 rounded-[32px] border border-transparent hover:border-orange-200 transition-all group text-center md:text-left">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${ann.priority === 'Urgent' ? 'bg-red-100 text-red-600' : ann.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                        <Bell className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-xl font-black text-gray-900">{ann.title}</h4>
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${ann.type === 'Banner' ? 'bg-purple-100 text-purple-700' : ann.type === 'Ticker' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>{ann.type}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium">{ann.message}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => { setAnnouncements(announcements.map(a => a.id === ann.id ? { ...a, is_active: !a.is_active } : a)); templeService.saveAnnouncement({ ...ann, is_active: !ann.is_active }); }} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ann.is_active ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            {ann.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedAnn(ann); setShowAnnModal(true); }} className="p-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:text-orange-600 transition-all"><Globe className="w-4 h-4" /></button>
                                            <button onClick={async () => { if (confirm('Delete?')) await templeService.deleteAnnouncement(ann.id); setAnnouncements(announcements.filter(a => a.id !== ann.id)); }} className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[48px] border-2 border-dashed border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Module Under Construction</h3>
                        <p className="text-gray-400 max-w-sm mx-auto font-bold">This management module is currently being synchronized with the divine database.</p>
                    </div>
                )
                }
            </main >
            {/* Add Content Modal */}
            {
                showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-2xl rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 capitalize">Add New {contentSubTab}</h3>
                                    <p className="text-gray-500 text-xs md:text-sm font-bold">Divine expansion of temple content.</p>
                                </div>
                                <button onClick={() => setShowAddModal(false)} className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto custom-scrollbar">
                                {contentSubTab === 'sevas' ? (
                                    <>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Seva Name</span>
                                            <input type="text" onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className="block">
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Price (₹)</span>
                                                <input type="number" onChange={e => setNewItem({ ...newItem, price: parseInt(e.target.value) })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                            </label>
                                            <label className="block">
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Day</span>
                                                <input type="text" placeholder="Daily / Friday / Weekly" onChange={e => setNewItem({ ...newItem, day: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                            </label>
                                        </div>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Seva Image</span>
                                            <div className="flex gap-4 items-center">
                                                {newItem.imageUrl && <img src={newItem.imageUrl} className="w-16 h-16 rounded-xl object-cover border border-gray-100" alt="Preview" />}
                                                <div className="relative flex-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setUploading(true);
                                                                const res = await templeService.uploadImage(file, 'images', 'sevas');
                                                                if (res.success && res.url) setNewItem({ ...newItem, imageUrl: res.url });
                                                                setUploading(false);
                                                            }
                                                        }}
                                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl py-4 px-6 text-center font-bold text-gray-500 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                                        {uploading ? <Loader2 className="w-4 h-4 animate-spin text-orange-600" /> : <ImageIcon className="w-4 h-4" />}
                                                        {uploading ? 'Uploading...' : 'Upload Image'}
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="text" placeholder="Or paste Image URL" value={newItem.imageUrl || ''} onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-2 mt-2 font-bold text-sm outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</span>
                                            <textarea rows={3} onChange={e => setNewItem({ ...newItem, description: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                    </>
                                ) : contentSubTab === 'videos' ? (
                                    <>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Video Title</span>
                                            <input type="text" onChange={e => setNewItem({ ...newItem, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">YouTube Video ID</span>
                                            <input type="text" placeholder="e.g. L0rE4-K7z_M" onChange={e => setNewItem({ ...newItem, videoId: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</span>
                                            <textarea rows={3} onChange={e => setNewItem({ ...newItem, description: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                    </>
                                ) : contentSubTab === 'news' ? (
                                    <>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Article Title</span>
                                            <input type="text" onChange={e => setNewItem({ ...newItem, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Featured Image</span>
                                            <div className="flex gap-4 items-center">
                                                {newItem.imageUrl && <img src={newItem.imageUrl} className="w-16 h-16 rounded-xl object-cover border border-gray-100" alt="Preview" />}
                                                <div className="relative flex-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setUploading(true);
                                                                const res = await templeService.uploadImage(file, 'images', 'news');
                                                                if (res.success && res.url) setNewItem({ ...newItem, imageUrl: res.url });
                                                                setUploading(false);
                                                            }
                                                        }}
                                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl py-4 px-6 text-center font-bold text-gray-500 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                                        {uploading ? <Loader2 className="w-4 h-4 animate-spin text-orange-600" /> : <ImageIcon className="w-4 h-4" />}
                                                        {uploading ? 'Uploading...' : 'Upload Image'}
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Content</span>
                                            <textarea rows={6} onChange={e => setNewItem({ ...newItem, content: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex gap-4 mb-6 p-2 bg-gray-50 rounded-2xl">
                                            <button onClick={() => setNewItem({ ...newItem, type: 'audio' })} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${newItem.type === 'audio' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500'}`}>Audio</button>
                                            <button onClick={() => setNewItem({ ...newItem, type: 'ebook' })} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${newItem.type === 'ebook' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500'}`}>E-Book</button>
                                        </div>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Title</span>
                                            <input type="text" onChange={e => setNewItem({ ...newItem, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className="block">
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Author (Optional)</span>
                                                <input type="text" onChange={e => setNewItem({ ...newItem, author: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                            </label>
                                            <label className="block">
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Duration/Pages</span>
                                                <input type="text" onChange={e => setNewItem({ ...newItem, duration: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                            </label>
                                        </div>
                                        <label className="block">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Select {newItem.type === 'audio' ? 'MP3' : 'PDF'} File</span>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    accept={newItem.type === 'audio' ? 'audio/*' : 'application/pdf'}
                                                    onChange={e => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleLibraryUpload(file);
                                                    }}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center group-hover:bg-orange-100 transition-all">
                                                    {uploading ? (
                                                        <div className="flex flex-col items-center">
                                                            <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-2" />
                                                            <p className="text-sm font-black text-orange-900 uppercase">Uploading Divine Media...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Plus className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                                            <p className="text-sm font-black text-orange-900 uppercase">Click to Choose File</p>
                                                            <p className="text-[10px] text-orange-600/70 font-bold mt-1">Upload will start immediately</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    </>
                                )}
                            </div>

                            <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                                <button onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-4 rounded-2xl font-black text-gray-400 hover:bg-gray-100 transition-all">Cancel</button>
                                <button
                                    onClick={() => {
                                        if (contentSubTab === 'sevas') handleAddSeva();
                                        else if (contentSubTab === 'videos') handleAddVideo();
                                        else if (contentSubTab === 'news') handleAddNews();
                                    }}
                                    disabled={isSaving}
                                    className="flex-[2] bg-orange-600 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-700 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Record
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Page Modal */}
            {
                showPageModal && selectedPage && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-4xl rounded-3xl md:rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 heading-divine">{selectedPage.id ? 'Edit Web Page' : 'Create New Web Page'}</h3>
                                    <p className="text-gray-500 text-xs md:text-sm font-bold">Design and deploy site-wide content instantly.</p>
                                </div>
                                <button onClick={() => setShowPageModal(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="p-6 md:p-10 space-y-6 max-h-[60vh] md:max-h-[75vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Page Title</span>
                                        <input type="text" value={selectedPage.title || ''} onChange={e => setSelectedPage({ ...selectedPage, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Slug (URL path)</span>
                                        <div className="relative">
                                            <span className="absolute left-5 top-4 text-gray-400 font-bold">/</span>
                                            <input type="text" value={selectedPage.slug || ''} onChange={e => setSelectedPage({ ...selectedPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pl-8 pr-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                        </div>
                                    </label>
                                </div>
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Page Content (Markdown/HTML supported)</span>
                                    <textarea value={selectedPage.content || ''} onChange={e => setSelectedPage({ ...selectedPage, content: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-[32px] px-8 py-8 font-bold outline-none focus:border-orange-500 min-h-[300px]" />
                                </label>
                            </div>
                            <div className="p-10 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                                <label className="flex items-center gap-3 mr-auto">
                                    <button onClick={() => setSelectedPage({ ...selectedPage, is_published: !selectedPage.is_published })} className={`w-12 h-6 rounded-full transition-all relative ${selectedPage.is_published ? 'bg-orange-600' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${selectedPage.is_published ? 'right-1' : 'left-1'}`} />
                                    </button>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Is Published</span>
                                </label>
                                <button onClick={() => setShowPageModal(false)} className="px-8 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                <button onClick={async () => {
                                    setIsSaving(true);
                                    const res = await templeService.savePage(selectedPage);
                                    if (res.success) {
                                        const updated = await templeService.getPages();
                                        setPages(updated);
                                        setShowPageModal(false);
                                    }
                                    setIsSaving(false);
                                }} className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/10">Save Page</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Announcement Modal */}
            {
                showAnnModal && selectedAnn && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-2xl rounded-3xl md:rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 heading-divine">{selectedAnn.id ? 'Edit Announcement' : 'New Broadcast'}</h3>
                                    <p className="text-gray-500 text-xs md:text-sm font-bold">Reach every visitor instantly.</p>
                                </div>
                                <button onClick={() => setShowAnnModal(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="p-6 md:p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Title</span>
                                    <input type="text" value={selectedAnn.title || ''} onChange={e => setSelectedAnn({ ...selectedAnn, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Message</span>
                                    <textarea value={selectedAnn.message || ''} onChange={e => setSelectedAnn({ ...selectedAnn, message: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" rows={3} />
                                </label>
                                <div className="grid grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Broadcast Type</span>
                                        <select value={selectedAnn.type || 'Banner'} onChange={e => setSelectedAnn({ ...selectedAnn, type: e.target.value as any })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all">
                                            <option value="Banner">Top Banner</option>
                                            <option value="Ticker">Scrolling Ticker</option>
                                            <option value="Modal">Popup Modal</option>
                                        </select>
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Priority</span>
                                        <select value={selectedAnn.priority || 'Normal'} onChange={e => setSelectedAnn({ ...selectedAnn, priority: e.target.value as any })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all">
                                            <option value="Normal">Normal</option>
                                            <option value="High">Important (High)</option>
                                            <option value="Urgent">Emergency (Urgent)</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="p-10 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                                <button onClick={() => setShowAnnModal(false)} className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                <button onClick={async () => {
                                    setIsSaving(true);
                                    const res = await templeService.saveAnnouncement(selectedAnn);
                                    if (res.success) {
                                        const updated = await templeService.getAnnouncements();
                                        setAnnouncements(updated);
                                        setShowAnnModal(false);
                                    }
                                    setIsSaving(false);
                                }} className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/10">Broadcast Now</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Inventory Modal */}
            {
                showInventoryModal && selectedInventory && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-2xl rounded-3xl md:rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 heading-divine">{selectedInventory.id ? 'Edit Inventory' : 'Add Item'}</h3>
                                    <p className="text-gray-500 text-xs md:text-sm font-bold">Manage temple assets and stock levels.</p>
                                </div>
                                <button onClick={() => setShowInventoryModal(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="p-6 md:p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Item Name</span>
                                    <input type="text" value={selectedInventory.name || ''} onChange={e => setSelectedInventory({ ...selectedInventory, name: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                </label>
                                <div className="grid grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</span>
                                        <input type="text" value={selectedInventory.category || ''} onChange={e => setSelectedInventory({ ...selectedInventory, category: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Unit (e.g. Kg, Pcs)</span>
                                        <input type="text" value={selectedInventory.unit || ''} onChange={e => setSelectedInventory({ ...selectedInventory, unit: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Current Stock</span>
                                        <input type="number" value={selectedInventory.stock || 0} onChange={e => setSelectedInventory({ ...selectedInventory, stock: parseInt(e.target.value) })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Low Stock Threshold</span>
                                        <input type="number" value={selectedInventory.lowStockThreshold || 0} onChange={e => setSelectedInventory({ ...selectedInventory, lowStockThreshold: parseInt(e.target.value) })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                </div>
                            </div>
                            <div className="p-10 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                                <button onClick={() => setShowInventoryModal(false)} className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                <button onClick={async () => {
                                    setIsSaving(true);
                                    const res = selectedInventory.id
                                        ? await templeService.updateInventory(selectedInventory.id, selectedInventory)
                                        : await templeService.addInventory(selectedInventory);
                                    if (res.success) {
                                        const updated = await templeService.getInventory();
                                        setInventory(updated);
                                        setShowInventoryModal(false);
                                    }
                                    setIsSaving(false);
                                }} className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/10">Save Item</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Event Modal */}
            {
                showEventModal && selectedEvent && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-3xl rounded-3xl md:rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 heading-divine">{selectedEvent.id ? 'Edit Event' : 'Schedule Event'}</h3>
                                    <p className="text-gray-500 text-xs md:text-sm font-bold">Coordinate upcoming temple festivals and celebrations.</p>
                                </div>
                                <button onClick={() => setShowEventModal(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="p-6 md:p-10 space-y-6 max-h-[65vh] md:max-h-[80vh] overflow-y-auto custom-scrollbar">
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Event Title</span>
                                    <input type="text" value={selectedEvent.title || ''} onChange={e => setSelectedEvent({ ...selectedEvent, title: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</span>
                                    <textarea value={selectedEvent.description || ''} onChange={e => setSelectedEvent({ ...selectedEvent, description: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" rows={3} />
                                </label>
                                <div className="grid grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</span>
                                        <input type="text" value={selectedEvent.category || ''} onChange={e => setSelectedEvent({ ...selectedEvent, category: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Start Date</span>
                                        <input type="datetime-local" value={selectedEvent.start_date ? new Date(selectedEvent.start_date).toISOString().slice(0, 16) : ''} onChange={e => setSelectedEvent({ ...selectedEvent, start_date: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                    </label>
                                </div>
                                <label className="block">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Featured Image URL</span>
                                    <input type="text" value={selectedEvent.image_url || ''} onChange={e => setSelectedEvent({ ...selectedEvent, image_url: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-orange-500 transition-all" />
                                </label>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <button onClick={() => setSelectedEvent({ ...selectedEvent, registration_required: !selectedEvent.registration_required })} className={`w-12 h-6 rounded-full transition-all relative ${selectedEvent.registration_required ? 'bg-orange-600' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${selectedEvent.registration_required ? 'right-1' : 'left-1'}`} />
                                    </button>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Registration Required</span>
                                </div>
                            </div>
                            <div className="p-10 border-t border-gray-50 bg-gray-50/50 flex gap-4">
                                <button onClick={() => setShowEventModal(false)} className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                <button onClick={async () => {
                                    setIsSaving(true);
                                    const res = selectedEvent.id
                                        ? await templeService.updateEvent(selectedEvent.id, selectedEvent)
                                        : await templeService.addEvent(selectedEvent);
                                    if (res.success) {
                                        const updated = await templeService.getEvents();
                                        setAllEvents(updated);
                                        setShowEventModal(false);
                                    }
                                    setIsSaving(false);
                                }} className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/10">Save Event</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}
