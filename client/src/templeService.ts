import { supabase } from './supabaseClient';
import { auth } from './firebaseConfig';
// @ts-ignore
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { googleProvider } from './firebaseConfig';
import {
    SiteConfig,
    TempleInsights,
    WeatherData,
    NewsItem,
    GalleryItem,
    LibraryItem,
    Seva,
    Panchangam,
    InventoryItem,
    UserProfile,
    TempleEvent,
    Donation,
    Booking,
    SlotAvailability,
    VideoItem,
    DynamicPage,
    Announcement
} from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
    templeName: 'Venkathadri Pendurthi',
    subTitle: 'Uttarandhra Tirumala Divya Kshetram',
    logoUrl: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/images/Logo/logo.png',
    heroBannerUrl: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_ujj4zlujj4zlujj4.png',
    liveLink: 'https://www.youtube.com/embed/live_stream_id',
    contactPhone: '+91 99999 99999',
    contactEmail: 'helpdesk@uttarandhratirupati.org',
    address: 'UTTHARANDHRA TIRUPATI ( Venkateswara Swamy Temple ), Balaji Nagar, Pendurthi, Visakhapatnam, Pendurti, Andhra Pradesh 531173',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237.41112734036318!2d83.21121301276729!3d17.811517714706405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39671fbc497e33%3A0xfb3d22187ebdc15!2sUTTHARANDHRA%20TIRUPATI%20(%20Venkateswara%20Swamy%20Temple%20)!5e0!3m2!1sen!2sin!4v1768306031383!5m2!1sen!2sin',
    whatsappChannel: 'https://whatsapp.com/channel/0029Vap96ByFnSzG0KocMq1y',
    panchangamImageUrl: '',
    historyContent: 'The Lord of the Universe and Vaikuntha, Srimannarayana, takes many forms to protect his devotees. In this Kaliyuga, he incarnated as Lord Venkateswara to offer solace to mankind...',
    historyImageUrl: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_ujj4zlujj4zlujj4.png',
    bankInfo: {
        accountName: 'Uttarandhra Tirupati Devasthanam Trust',
        accountNumber: '123456789012',
        bankName: 'Union Bank of India',
        ifsc: 'UBIN0532101',
        branch: 'Pendurthi',
        qrCodeUrl: 'https://picsum.photos/id/20/200/200'
    },
    timings: {
        suprabhatam: '05:00 AM',
        morningDarshan: '06:00 AM - 01:00 PM',
        breakTime: '01:00 PM - 04:00 PM',
        eveningDarshan: '04:00 PM - 08:30 PM',
        ekanthaSeva: '09:00 PM'
    },
    theme: {
        primaryColor: '#721c24',
        secondaryColor: '#f1c40f',
        accentColor: '#d4ac0d',
        backgroundColor: '#fffbf0',
        headingFont: 'Cinzel',
        bodyFont: 'Lato',
        headingFontWeight: 700,
        bodyFontWeight: 400,
        borderRadius: 8
    },
    enableBooking: true,
    enableHundi: true,
    enableAudio: true,
    maintenanceMode: false,
    darshanPrice: 0,
    darshanSlotCapacity: 50,
    donationAmounts: [116, 516, 1116, 5000],
    donationCategories: ['General Hundi (Srivari Kanuka)', 'Annadanam Trust', 'Gosala Maintenance', 'Saswatha Puja Scheme', 'Temple Construction Fund'],
    seo: {
        metaTitle: 'Uttarandhra Tirupati',
        metaDescription: 'Official website of Shri Venkateswara Swamy Temple, Pendurthi',
        keywords: 'temple, tirupati, pendurthi, darshan, venkateswara'
    },
    socialLinks: {
        youtube: 'https://www.youtube.com/@ramanujampendurthi1012',
        facebook: ''
    },
    threeDConfig: {
        stlUrl: '/tirupati.stl',
        modelScale: 0.15,
        initialRotation: [0, 0, 0],
        ambientIntensity: 0.8,
        pointIntensity: 1.5,
        spotIntensity: 2.5,
        lightColor: '#ffffff'
    }
};

export const INITIAL_INSIGHTS: TempleInsights = {
    ladduStock: 15000,
    laddusDistributed: 8240,
    darshanWaitTime: 45,
    crowdStatus: 'Moderate',
    annadanamCount: 12540,
    nextAarathiTime: '06:00 PM'
};

// --- Panchangam Utilities ---
export const TELUGU_TITHIS = [
    "అమావాస్య", "శుక్ల పాడ్యమి", "శుక్ల విదియ", "శుక్ల తదియ", "శుక్ల చవితి", "శుక్ల పంచమి", "శుక్ల షష్ఠి", "శుక్ల సప్తమి", "శుక్ల అష్టమి", "శుక్ల నవమి", "శుక్ల దశమి", "శుక్ల ఏకాదశి", "శుక్ల ద్వాదశి", "శుక్ల త్రయోదశి", "శుక్ల చతుర్దశి",
    "పౌర్ణమి", "కృష్ణ పాడ్యమి", "కృష్ణ విదియ", "కృష్ణ తదియ", "కృష్ణ చవితి", "కృష్ణ పంచమి", "కృష్ణ షష్ఠి", "కృష్ణ సప్తమి", "కృష్ణ అష్టమి", "కృష్ణ నవమి", "కృష్ణ దశమి", "కృష్ణ ఏకాదశి", "కృష్ణ ద్వాదశి", "కృష్ణ త్రయోదశి", "కృష్ణ చతుర్దశి"
];

export const ENGLISH_TITHIS = [
    "Amavasya", "Shukla Padyami", "Shukla Vidiya", "Shukla Thadiya", "Shukla Chavithi", "Shukla Panchami", "Shukla Shashti", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami", "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi",
    "Pournami", "Krishna Padyami", "Krishna Vidiya", "Krishna Thadiya", "Krishna Chavithi", "Krishna Panchami", "Krishna Shashti", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami", "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi"
];

export const TELUGU_NAKSHATRAS = ["అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆర్ద్ర", "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వఫల్గుణి", "ఉత్తరఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ", "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం", "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"];
export const ENGLISH_NAKSHATRAS = ["Ashwini", "Bharani", "Krithika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushyami", "Ashlesha", "Makha", "Pubba", "Uttara", "Hastha", "Chitra", "Swathi", "Vishakha", "Anuradha", "Jyeshta", "Moola", "Poorvashada", "Uttarashada", "Shravanam", "Dhanishta", "Shathabhisham", "Poorvabhadra", "Uttarabhadra", "Revathi"];

export const TELUGU_WEEKDAYS = ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"];
export const ENGLISH_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function calculatePanchangam(date: Date, lang: 'en' | 'te' = 'te') {
    const start = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
    const D = (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    const normalize = (v: number) => { v %= 360; return v < 0 ? v + 360 : v; };
    const toRad = (d: number) => d * (Math.PI / 180);

    const sunML = normalize(280.460 + 0.98564736 * D);
    const sunMA = normalize(357.529 + 0.98560028 * D);
    const sunEL = normalize(sunML + 1.915 * Math.sin(toRad(sunMA)) + 0.020 * Math.sin(toRad(2 * sunMA)));
    const moonML = normalize(218.316 + 13.176396 * D);
    const moonMA = normalize(134.963 + 13.064993 * D);
    const moonEL = normalize(moonML + 6.289 * Math.sin(toRad(moonMA)));

    let angleDiff = normalize(moonEL - sunEL);
    const tithiIdx = Math.floor(angleDiff / 12);
    const tithiName = lang === 'te' ? TELUGU_TITHIS[tithiIdx % 30] : ENGLISH_TITHIS[tithiIdx % 30];
    const nakshatraIdx = Math.floor(moonEL / 13.333333);
    const nakshatraName = lang === 'te' ? TELUGU_NAKSHATRAS[nakshatraIdx % 27] : ENGLISH_NAKSHATRAS[nakshatraIdx % 27];

    const day = date.getDay();
    const weekday = lang === 'te' ? TELUGU_WEEKDAYS[day] : ENGLISH_WEEKDAYS[day];

    return {
        tithi: tithiName,
        nakshatra: nakshatraName,
        rahuKalam: lang === 'te' ? '10:30 AM - 12:00 PM' : '10:30 AM - 12:00 PM', // Simplified for demo
        weekday: weekday,
        date: date.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    };
}

// Calculate initial values
const todayPanchangam = calculatePanchangam(new Date(), 'en');

export const INITIAL_PANCHANGAM: Panchangam = {
    date: todayPanchangam.date,
    tithi: todayPanchangam.tithi,
    nakshatra: todayPanchangam.nakshatra,
    yogam: 'Siddha', // Static for now as dynamic requires complex calc
    karanam: 'Bava', // Static for now
    rahuKalam: todayPanchangam.rahuKalam,
    yamagandam: '03:00 PM - 04:30 PM',
    sunrise: '06:05 AM',
    sunset: '06:12 PM'
};

export const FALLBACK_SEVAS: Seva[] = [
    { id: 'seva1', name: 'Kalyanotsavam', description: 'Celestial wedding ceremony of the Lord with his consorts.', price: 1001, timing: '11:00 AM', day: 'Daily', imageUrl: 'https://picsum.photos/seed/kalyanam/400/300' },
    { id: 'seva2', name: 'Thomala Seva', description: 'The Lord is adorned with beautiful flower garlands.', price: 220, timing: '07:00 AM', day: 'Daily', imageUrl: 'https://picsum.photos/seed/thomala/400/300' },
    { id: 'seva3', name: 'Abhishekam', description: 'Sacred bath of the main deity with milk, honey, and other holy items.', price: 750, timing: '09:00 AM', day: 'Friday', imageUrl: 'https://picsum.photos/seed/abhishekam/400/300' },
    { id: 'seva4', name: 'Sahasra Deepalankara', description: 'The Lord is worshipped amidst a thousand lighted lamps.', price: 500, timing: '06:00 PM', day: 'Saturday', imageUrl: 'https://picsum.photos/seed/deepam/400/300' },
];

export const FALLBACK_NEWS: NewsItem[] = [
    { id: 'fallback-1', title: 'Annual Brahmotsavams Schedule Released', date: new Date().toISOString(), content: 'The annual Brahmotsavams will be celebrated with grand fervor...', imageUrl: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/images/channels4_banner.jpg' }
];

export const FALLBACK_GALLERY: GalleryItem[] = [
    { id: 'img11', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%2011.jpg', caption: 'Temple Premises' },
    { id: 'img12', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%2012.jpg', caption: 'Divine Darshan' },
    { id: 'img13', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%2013.jpg', caption: 'Temple Architecture' },
    { id: 'img14', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%2014.jpg', caption: 'Holy Sanctum' },
    { id: 'img9', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%209.jpg', caption: 'Daily Rituals' },
    { id: 'img8', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%208.jpg', caption: 'Festival Celebration' },
    { id: 'img4', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%204.jpg', caption: 'Temple Gopuram' },
    { id: 'img17', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%2017.jpg', caption: 'Venkateswara Swamy' },
    { id: 'img3', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%203.jpg', caption: 'Pilgrim Center' },
    { id: 'img2', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%202.jpg', caption: 'Main Entrance' },
    { id: 'img10', type: 'image', url: 'https://akcwdjwyhsnaxmtnjuqa.supabase.co/storage/v1/object/public/gallery/img%2010.jpg', caption: 'Venkateswara Swamy' }
];

export const FALLBACK_LIBRARY: LibraryItem[] = [
    { id: 'aud0', type: 'audio', title: 'Govinda Namalu', teTitle: 'గోవింద నామాలు', url: 'https://www.tirumala.org/OtherSankeertans/00%20GOVINDA%20NAMALU/00%20GOVINDA%20NAMALU.mp3', description: 'Sacred chanting of Govinda Namas.', teDescription: 'గోవింద నామాల పవిత్ర నామస్మరణ.', duration: '25:00', author: 'TTD' },
    { id: 'aud1', type: 'audio', title: 'Sri Venkateswara Suprabhatam', teTitle: 'శ్రీ వేంకటేశ్వర సుప్రభాతం', url: 'https://cs1.mp3.pm/listen/5990686/U0RrWE1UdEVvbXhaN0FSS1VoZmdEVGFFdWhOazdoQXRJTzBMMUVJbDdtc1lUSVJVQTVyQUcwVmVoZE5mSGtGRmR3ZlhSQzhEU2paSkJsZzF0Y0FHWWVsTFRzYmFudVFXaUdjZ1EvTG5aWHR0MHdDN2ZjeHZsUVJQclRsTUpaWCs/M.S._Subbulakshmi_-_Sri_Venkatesa_Suprabhatham_(mp3.pm).mp3', description: 'The sacred morning chant by M.S. Subbulakshmi.', teDescription: 'ఎం.ఎస్. సుబ్బులక్ష్మి గారి మధుర స్వరంలో పవిత్ర ఉదయ ప్రార్థన.', duration: '20:15', author: 'M.S. Subbulakshmi' },
    { id: 'aud2', type: 'audio', title: 'Vishnu Sahasranamam', teTitle: 'విష్ణు సహస్రనామమ్', url: 'https://cs1.mp3.pm/download/2831159/U0RrWE1UdEVvbXhaN0FSS1VoZmdEVGFFdWhOazdoQXRJTzBMMUVJbDdtdmR0Yk9DTXVadnB2YVF2Q1d1bS81QjhyTm9Fcmtqd3lUdDgrWDRxVGFLUUZrY2dtNUxPWEFCQUc1N2lBOWVRS3plME9DdmYyZWlCbXB0TkNWckdSV3k/M.S._Subbulakshmi_-_Vishnu_Sahasranamam-Stotram_(mp3.pm).mp3', description: 'The thousand names of Lord Vishnu by M.S. Subbulakshmi.', teDescription: 'ఎం.ఎస్. సుబ్బులక్ష్మి గారి మధుర స్వరంలో విష్ణు సహస్రనామ మాలిక.', duration: '30:00', author: 'M.S. Subbulakshmi' },
    { id: 'bk1', type: 'ebook', title: 'Sapthagiri Magazine (Current Month)', teTitle: 'సప్తగిరి మాసపత్రిక (ప్రస్తుత నెల)', url: 'https://www.tirumala.org/Sapthagiri1.aspx', description: 'Official spiritual monthly magazine of TTD.', teDescription: 'తిరుమల తిరుపతి దేవస్థానముల అధికారిక ఆధ్యాత్మిక మాసపత్రిక.', thumbnailUrl: 'https://picsum.photos/seed/sapthagiri/200/300', author: 'TTD Publications' },
];

export const FALLBACK_VIDEOS: VideoItem[] = [
    {
        id: 'v1',
        videoId: 'L0rE4-K7z_M',
        title: 'Akhanda Bhajan at Temple',
        teTitle: 'ఆలయంలో అఖండ భజన',
        description: 'Experience the soul-stirring bhajans in the divine presence.',
        teDescription: 'దైవ సన్నిధిలో భక్తిపూర్వకమైన భజనలను అనుభవించండి.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544006659-f0b21884cb1d?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'v2',
        videoId: 'dQw4w9WgXcQ',
        title: 'Temple Annual Brahmotsavam',
        teTitle: 'ఆలయ వార్షిక బ్రహ్మోత్సవాలు',
        description: 'Glimpses of the grand celestial celebrations.',
        teDescription: 'ఘనంగా జరిగిన బ్రహ్మోత్సవాల దృశ్యాలు.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1604510313580-998835821c60?auto=format&fit=crop&q=80&w=800'
    }
];

export const MOCK_INVENTORY: InventoryItem[] = [
    { id: '1', name: 'Laddu Prasadam', category: 'Prasad', stock: 1500, unit: 'Units', lowStockThreshold: 200 },
    { id: '2', name: 'Vada', category: 'Prasad', stock: 50, unit: 'Units', lowStockThreshold: 100 },
    { id: '3', name: 'Incense Sticks', category: 'Pooja', stock: 500, unit: 'Packets', lowStockThreshold: 50 }
];

export const MOCK_USERS: UserProfile[] = [
    { id: '1', name: 'Temple Admin', email: 'admin@uttarandhratirupati.org', phone: '9999999999', role: 'Super Admin', lastActive: new Date().toISOString() },
    { id: '2', name: 'Priest Sharma', email: 'priest@temple.com', phone: '9876543210', role: 'Priest', lastActive: new Date().toISOString() }
];

export const MOCK_EVENTS: TempleEvent[] = [
    { id: '1', title: 'Brahmotsavam', description: 'Annual Festival', type: 'Festival', status: 'Upcoming', startDate: '2024-10-01', endDate: '2024-10-09' }
];

export const MOCK_ACCOMMODATION: any[] = [
    { id: '1', name: 'Srinivasam - Room 101', type: 'AC Suite', capacity: 4, pricePerDay: 1500, status: 'Available' },
    { id: '2', name: 'Srinivasam - Room 102', type: 'AC Suite', capacity: 4, pricePerDay: 1500, status: 'Occupied' },
    { id: '3', name: 'Madhavam - Hall A', type: 'Function Hall', capacity: 200, pricePerDay: 15000, status: 'Available' }
];

export const MOCK_BOOKINGS: any[] = [
    { id: 'b1', name: 'Ravi Kumar', type: 'Special Entry Darshan', date: '2024-03-20', status: 'Confirmed', phone: '9876543210' },
    { id: 'b2', name: 'Lakshmi Devi', type: 'Kalyanotsavam', date: '2024-03-21', status: 'Pending', phone: '9988776655' }
];

export const MOCK_FEEDBACK: any[] = [
    { id: 'f1', name: 'Srinivas Rao', message: 'The new booking system is very convenient.', date: new Date().toISOString() },
    { id: 'f2', name: 'Anitha Reddy', message: 'Need more drinking water stations near the queue area.', date: new Date().toISOString() },
    { id: 'f3', name: 'Krishna Murthy', message: 'The temple environment is very peaceful and well-maintained.', date: new Date().toISOString() }
];

export const calculateTimeOfDay = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'morning';
    if (h >= 12 && h < 17) return 'afternoon';
    if (h >= 17 && h < 20) return 'evening';
    return 'night';
};

export const templeService = {
    // --- Data Fetching ---
    getSevas: async (): Promise<Seva[]> => {
        const { data, error } = await supabase.from('sevas').select('*').order('name');
        if (error || !data || data.length === 0) return FALLBACK_SEVAS;
        return data as Seva[];
    },

    getSiteConfig: async (): Promise<SiteConfig> => {
        const { data, error } = await supabase.from('site_config').select('config').eq('id', 1).single();
        if (error || !data) return INITIAL_SITE_CONFIG;
        return data.config as SiteConfig;
    },

    getInsights: async (): Promise<TempleInsights> => {
        const { data, error } = await supabase.from('insights').select('*').eq('id', 1).single();
        if (error || !data) return INITIAL_INSIGHTS;
        return {
            ladduStock: data.laddu_stock,
            laddusDistributed: data.laddus_distributed,
            darshanWaitTime: data.darshan_wait_time,
            crowdStatus: data.crowd_status,
            annadanamCount: data.annadanam_count,
            nextAarathiTime: data.next_aarathi_time,
            totalVisitors: data.total_visitors || 0
        };
    },

    incrementVisitorCount: async (): Promise<void> => {
        try {
            await supabase.rpc('increment_total_visitors');
            // If RPC doesn't exist yet, we can fallback to a direct update if needed, 
            // but RPC is cleaner for atomic increments.
            // For now, let's assume we might need a direct way if RPC isn't defined.
            // But let's stick to the plan of atomic increments.
        } catch (e) {
            console.error("Failed to increment visitor count", e);
        }
    },

    // Helper methods as pure functions or simple service exports
    getWeeklyVisitorStats: () => [
        { day: 'Mon', value: 1200 }, { day: 'Tue', value: 1800 }, { day: 'Wed', value: 1500 },
        { day: 'Thu', value: 2200 }, { day: 'Fri', value: 3500 }, { day: 'Sat', value: 7500 },
        { day: 'Sun', value: 9200 },
    ],

    getDonationCategoryStats: () => [
        { name: 'Hundi', value: 150450 }, { name: 'Annadanam', value: 80500 },
        { name: 'Gosala', value: 30100 }, { name: 'Construction', value: 55000 }
    ],

    getSlotAvailability: async (date: string, capacity: number): Promise<SlotAvailability[]> => {
        const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM', '06:00 PM'];
        return timeSlots.map(time => ({
            time,
            booked: Math.floor(Math.random() * capacity),
            capacity: capacity,
            status: 'AVAILABLE' as const
        }));
    },

    bookDarshanSlot: async (booking: Booking): Promise<{ success: boolean, ticketCode?: string, message?: string, type?: string }> => {
        if (Math.random() < 0.2) {
            return { success: false, message: 'The selected slot just became full. Please choose another one.', type: 'SLOT_FULL' };
        }
        const ticketCode = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
        return { success: true, ticketCode };
    },

    verifyPayment: async (transactionId: string, amount: number, category: string): Promise<{ success: boolean, message?: string }> => {
        return { success: true };
    },

    // --- Operations ---
    bookSeva: async (booking: Booking): Promise<{ success: boolean, ticketCode?: string, message?: string }> => {
        const ticketCode = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
        const { error } = await supabase.from('bookings').insert([{
            seva_id: booking.id, // Assuming booking.id is the seva_id here
            date: booking.date,
            devotee_name: booking.devoteeName,
            mobile: booking.mobile,
            email: booking.email,
            ticket_code: ticketCode,
            status: 'Booked'
        }]);

        if (error) return { success: false, message: error.message };
        return { success: true, ticketCode };
    },

    addDonation: async (donation: Partial<Donation>): Promise<{ success: boolean, message?: string }> => {
        const transactionId = 'TXN-' + Date.now();
        const { error } = await supabase.from('donations').insert([{
            donor_name: donation.donorName,
            gothram: donation.gothram,
            category: donation.category,
            amount: donation.amount,
            email: donation.email,
            transaction_id: transactionId,
            status: 'Pending'
        }]);

        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Auth Helper (Wrappers for components to use) ---
    getSession: async () => {
        return { data: { session: auth.currentUser ? { user: auth.currentUser } : null } };
    },

    onAuthStateChange: (callback: (user: any) => void) => {
        return onAuthStateChanged(auth, (user: any) => {
            callback(user);
        });
    },

    signIn: async (email: string, password?: string) => {
        if (!password) throw new Error("Password required for Firebase login");
        return await signInWithEmailAndPassword(auth, email, password);
    },

    signInWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (error: any) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    },

    signUp: async (email: string, password?: string) => {
        if (!password) throw new Error("Password required for registration");
        return await createUserWithEmailAndPassword(auth, email, password);
    },

    signOut: async () => {
        return await firebaseSignOut(auth);
    },

    // --- Gallery ---
    getGallery: async (): Promise<GalleryItem[]> => {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (error || !data || data.length === 0) return FALLBACK_GALLERY;
        return data as GalleryItem[];
    },

    uploadFile: async (file: File, bucket: string, path: string): Promise<{ success: boolean, url?: string, message?: string }> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) return { success: false, message: uploadError.message };

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return { success: true, url: data.publicUrl };
    },

    uploadImage: async (file: File, bucket: string = 'images', path: string = 'gallery'): Promise<{ success: boolean, url?: string, message?: string }> => {
        return templeService.uploadFile(file, bucket, path);
    },

    addGalleryItem: async (item: Partial<GalleryItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('gallery').insert([item]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    deleteGalleryItem: async (id: string, url: string): Promise<{ success: boolean, message?: string }> => {
        // Delete from database
        const { error: dbError } = await supabase.from('gallery').delete().eq('id', id);
        if (dbError) return { success: false, message: dbError.message };

        // Attempt to delete from storage (optional, depends on if we want to keep orphans)
        try {
            const path = url.split('/').pop();
            if (path) {
                await supabase.storage.from('images').remove([`gallery/${path}`]);
            }
        } catch (e) {
            console.error('Failed to delete storage file:', e);
        }

        return { success: true };
    },

    getFeedback: async () => {
        const { data, error } = await supabase.from('feedback').select('*').order('created_at', { ascending: false });
        if (error || !data || data.length === 0) return MOCK_FEEDBACK;
        return data;
    },

    analyzeFeedback: async (feedback: any[]) => {
        // Simulate Gemini AI logic
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
            summary: "Overall sentiment is positive (85%). Devotees appreciate the cleanliness and booking convenience.",
            suggestions: [
                "Install 2 more water dispensers near the exit gate.",
                "Increase Laddu stock by 10% on Saturdays.",
                "Consider adding more shade in the outer parikrama area."
            ],
            sentiment: "Positive",
            te_summary: "మొత్తం మీద భక్తుల స్పందన సానుకూలంగా ఉంది (85%). పరిశుభ్రత మరియు బుకింగ్ సౌకర్యం పట్ల భక్తులు సంతోషంగా ఉన్నారు.",
            te_suggestions: [
                "ఎగ్జిట్ గేట్ వద్ద మరో 2 వాటర్ డిస్పెన్సర్లను ఏర్పాటు చేయండి.",
                "శనివారాల్లో లడ్డు స్టాక్‌ను 10% పెంచండి.",
                "వెలుపలి ప్రదక్షిణ ప్రాంతంలో మరిన్ని నీడ సౌకర్యాలను కల్పించండి."
            ]
        };
    },

    // --- CMS / Admin Operations ---
    updateSiteConfig: async (config: SiteConfig): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('site_config').upsert({ id: 1, config });
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    addSeva: async (seva: Partial<Seva>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('sevas').insert([seva]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    updateSeva: async (id: string, seva: Partial<Seva>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('sevas').update(seva).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    deleteSeva: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('sevas').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    addLibraryItem: async (item: Partial<LibraryItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('library').insert([item]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    updateLibraryItem: async (id: string, item: Partial<LibraryItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('library').update(item).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    deleteLibraryItem: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('library').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    getLibrary: async (): Promise<LibraryItem[]> => {
        const { data, error } = await supabase.from('library').select('*').order('title');
        if (error || !data || data.length === 0) return FALLBACK_LIBRARY;
        return data as LibraryItem[];
    },

    getVideos: async (): Promise<VideoItem[]> => {
        const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
        if (error || !data || data.length === 0) return FALLBACK_VIDEOS;
        return data as VideoItem[];
    },

    addVideo: async (video: Partial<VideoItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('videos').insert([video]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    updateVideo: async (id: string, video: Partial<VideoItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('videos').update(video).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    deleteVideo: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('videos').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Events ---
    getEvents: async (): Promise<TempleEvent[]> => {
        const { data, error } = await supabase.from('events').select('*').order('start_date', { ascending: true });
        if (error || !data || data.length === 0) return MOCK_EVENTS;
        return data as TempleEvent[];
    },

    addEvent: async (event: Partial<TempleEvent>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('events').insert([event]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    updateEvent: async (id: string, event: Partial<TempleEvent>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('events').update(event).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    deleteEvent: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Inventory ---
    getInventory: async (): Promise<InventoryItem[]> => {
        const { data, error } = await supabase.from('inventory').select('*').order('name');
        if (error || !data || data.length === 0) return MOCK_INVENTORY;
        return data as InventoryItem[];
    },

    addInventory: async (item: Partial<InventoryItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('inventory').insert([item]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    updateInventory: async (id: string, item: Partial<InventoryItem>): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('inventory').update(item).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    deleteInventory: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('inventory').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Notifications ---
    getNotifications: async (): Promise<any[]> => {
        const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
        if (error || !data) return [];
        return data;
    },

    addNotification: async (notification: any): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('notifications').insert([notification]);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Bookings Admin ---
    getAllBookings: async (): Promise<any[]> => {
        const { data, error } = await supabase.from('bookings').select('*, sevas(*)').order('created_at', { ascending: false });
        if (error || !data) return MOCK_BOOKINGS;
        return data;
    },

    updateBookingStatus: async (id: string, status: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Donations Admin ---
    getAllDonations: async (): Promise<Donation[]> => {
        const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
        if (error || !data) return [];
        return data as Donation[];
    },

    updateDonationStatus: async (id: string, status: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('donations').update({ status }).eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Dynamic Pages CMS ---
    getPages: async (): Promise<DynamicPage[]> => {
        const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
        if (error || !data) return [];
        return data as DynamicPage[];
    },

    getPageBySlug: async (slug: string): Promise<DynamicPage | null> => {
        const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).eq('is_published', true).single();
        if (error || !data) return null;
        return data as DynamicPage;
    },

    savePage: async (page: Partial<DynamicPage>): Promise<{ success: boolean, message?: string }> => {
        if (page.id) {
            const { error } = await supabase.from('pages').update(page).eq('id', page.id);
            if (error) return { success: false, message: error.message };
        } else {
            const { error } = await supabase.from('pages').insert([page]);
            if (error) return { success: false, message: error.message };
        }
        return { success: true };
    },

    deletePage: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('pages').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- Announcements CMS ---
    getAnnouncements: async (onlyActive = false): Promise<Announcement[]> => {
        let query = supabase.from('announcements').select('*').order('created_at', { ascending: false });
        if (onlyActive) query = query.eq('is_active', true);
        const { data, error } = await query;
        if (error || !data) return [];
        return data as Announcement[];
    },

    saveAnnouncement: async (ann: Partial<Announcement>): Promise<{ success: boolean, message?: string }> => {
        if (ann.id) {
            const { error } = await supabase.from('announcements').update(ann).eq('id', ann.id);
            if (error) return { success: false, message: error.message };
        } else {
            const { error } = await supabase.from('announcements').insert([ann]);
            if (error) return { success: false, message: error.message };
        }
        return { success: true };
    },

    deleteAnnouncement: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('announcements').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- News CMS ---
    getNews: async (): Promise<NewsItem[]> => {
        const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
        if (error || !data || data.length === 0) return FALLBACK_NEWS;
        return data as NewsItem[];
    },

    saveNews: async (news: Partial<NewsItem>): Promise<{ success: boolean, message?: string }> => {
        if (news.id && !news.id.startsWith('fallback')) {
            const { error } = await supabase.from('news').update(news).eq('id', news.id);
            if (error) return { success: false, message: error.message };
        } else {
            const { id, ...newsData } = news; // remove fallback id if present
            const { error } = await supabase.from('news').insert([newsData]);
            if (error) return { success: false, message: error.message };
        }
        return { success: true };
    },

    deleteNews: async (id: string): Promise<{ success: boolean, message?: string }> => {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
        return { success: true };
    },

    // --- YouTube Integration ---
    getYouTubeVideos: async (channelId: string): Promise<VideoItem[]> => {
        try {
            const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

            const response = await fetch(proxyUrl);
            const data = await response.json();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const entries = xmlDoc.getElementsByTagName("entry");

            const videos: VideoItem[] = [];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent || "";
                const title = entry.getElementsByTagName("title")[0]?.textContent || "";
                const description = entry.getElementsByTagName("media:group")[0]?.getElementsByTagName("media:description")[0]?.textContent || "";
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                videos.push({
                    id: videoId,
                    videoId,
                    title,
                    teTitle: title,
                    description,
                    teDescription: description,
                    thumbnailUrl
                });
            }
            return videos;
        } catch (error) {
            console.error("YouTube Sync failed:", error);
            return [];
        }
    },

    syncYouTubeVideos: async (): Promise<{ success: boolean, count: number, message?: string }> => {
        try {
            // Hardcoded Channel ID for @ramanujampendurthi1012
            const channelId = "UCXiFftEUuYXhX4D8OJUxEjg";

            const videos = await templeService.getYouTubeVideos(channelId);
            if (videos.length === 0) return { success: false, count: 0, message: "No videos found or fetch failed." };

            let count = 0;
            for (const video of videos) {
                // Check if video already exists in database
                const { data: existing } = await supabase.from('videos').select('id').eq('videoId', video.videoId).maybeSingle();

                if (!existing) {
                    const { error } = await supabase.from('videos').insert([{
                        videoId: video.videoId,
                        title: video.title,
                        teTitle: video.title,
                        description: video.description,
                        teDescription: video.description,
                        thumbnailUrl: video.thumbnailUrl
                    }]);
                    if (!error) count++;
                }
            }
            return { success: true, count };
        } catch (error: any) {
            return { success: false, count: 0, message: error.message };
        }
    },

    // --- Realtime ---
    subscribeToUpdates: (table: string, callback: (payload: any) => void) => {
        const channel = supabase
            .channel(`public-${table}-changes`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: table,
                },
                (payload) => {
                    callback(payload);
                }
            )
            .subscribe();

        return channel;
    }
};
