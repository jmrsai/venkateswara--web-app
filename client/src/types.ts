export interface TempleTimings {
    suprabhatam: string;
    morningDarshan: string;
    breakTime: string;
    eveningDarshan: string;
    ekanthaSeva: string;
}

export interface BankInfo {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
    branch: string;
    qrCodeUrl: string;
}

export interface ThemeConfig {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    headingFont: string;
    bodyFont: string;
    headingFontWeight: number;
    bodyFontWeight: number;
    borderRadius: number; // in px
}

export interface SeoConfig {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
}

export interface SocialLinks {
    youtube?: string;
    facebook?: string;
}

export interface ThreeDModel {
    id: string;
    name: string;
    url: string;
}

export interface ThreeDConfig {
    stlUrl: string;
    models?: ThreeDModel[];
    activeModelId?: string;
    modelScale: number;
    initialRotation: [number, number, number];
    ambientIntensity: number;
    pointIntensity: number;
    spotIntensity: number;
    lightColor: string;
}

export interface SiteConfig {
    templeName: string;
    subTitle: string;
    logoUrl: string;
    heroBannerUrl: string;
    liveLink: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
    mapEmbedUrl?: string;
    whatsappChannel?: string;
    stlUrl?: string;
    panchangamImageUrl?: string;
    historyContent?: string;
    historyImageUrl?: string;
    bankInfo: BankInfo;
    timings: TempleTimings;
    theme: ThemeConfig;
    enableBooking: boolean;
    enableHundi: boolean;
    enableAudio: boolean;
    maintenanceMode: boolean;
    darshanPrice: number;
    darshanSlotCapacity: number;
    donationAmounts: number[];
    donationCategories: string[];
    threeDConfig: ThreeDConfig;
    seo?: SeoConfig;
    socialLinks?: SocialLinks;
}

export interface TempleInsights {
    ladduStock: number;
    laddusDistributed: number;
    darshanWaitTime: number; // in minutes
    crowdStatus: 'Low' | 'Moderate' | 'High';
    annadanamCount: number;
    nextAarathiTime: string;
    totalVisitors?: number;
}

export interface WeatherData {
    temp: number;
    condition: string;
    isDay: boolean;
}

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    content: string;
    attachmentUrl?: string;
    imageUrl?: string;
}

export interface GalleryItem {
    id: string;
    type: 'image' | 'video';
    url: string;
    caption: string;
}

export interface FeedbackItem {
    id: string;
    name: string;
    message: string;
    date: string;
    read?: boolean;
}

export interface Donation {
    id: string;
    donorName: string;
    gothram?: string;
    category: string;
    amount: number;
    date: string;
    pan?: string;
    email?: string;
    user_id?: string;
    transactionId: string;
    status?: 'Verified' | 'Pending';
    created_at?: string;
}

export interface LibraryItem {
    id: string;
    type: 'audio' | 'ebook';
    title: string;
    teTitle?: string;
    url: string;
    description?: string;
    teDescription?: string;
    thumbnailUrl?: string;
    duration?: string;
    author?: string;
    teAuthor?: string;
}

export interface VideoItem {
    id: string;
    videoId: string;
    title: string;
    teTitle?: string;
    description: string;
    teDescription?: string;
    thumbnailUrl?: string;
    created_at?: string;
}

export interface Booking {
    id?: string;
    date: string;
    slot?: string;
    devoteeName: string;
    mobile: string;
    email?: string;
    user_id?: string;
    ticketCode?: string;
    status?: 'Booked' | 'Cancelled' | 'Completed';
    timestamp?: string;
}

export interface Seva {
    id: string;
    name: string;
    description: string;
    price: number;
    timing: string;
    day: 'Daily' | 'Friday' | 'Saturday';
    imageUrl: string;
}

export interface SlotAvailability {
    time: string;
    booked: number;
    capacity: number;
    status: 'AVAILABLE' | 'FULL' | 'FAST_FILLING';
}

export interface Panchangam {
    date: string;
    tithi: string;
    nakshatra: string;
    yogam: string;
    karanam: string;
    rahuKalam: string;
    yamagandam: string;
    sunrise: string;
    sunset: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    stock: number;
    unit: string;
    lowStockThreshold: number;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'Super Admin' | 'Admin' | 'Priest' | 'Staff' | 'Devotee';
    lastActive?: string;
}

export interface TempleEvent {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    type: string;
    status: string;
    // Mapped or optional properties to fix build errors
    image_url?: string; // used in AdminDashboard
    category?: string; // used in AdminDashboard
    start_date?: string; // used in AdminDashboard
    registration_required?: boolean; // used in AdminDashboard
}

export interface DynamicPage {
    id: string;
    title: string;
    slug: string;
    content: string;
    meta_description?: string;
    is_published: boolean;
    created_at?: string;
    updated_at?: string;
    // Optional properties for navigation usage
    is_active?: boolean;
    show_in_nav?: boolean;
}

export interface Announcement {
    id: string;
    title: string;
    message: string;
    type: 'Banner' | 'Ticker' | 'Modal';
    priority: 'Normal' | 'High' | 'Urgent';
    is_active: boolean;
    starts_at?: string;
    ends_at?: string;
}
