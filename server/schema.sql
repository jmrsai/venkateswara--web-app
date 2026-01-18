-- Sevas Table
CREATE TABLE public.sevas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    timing TEXT,
    day TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookings Table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seva_id UUID REFERENCES public.sevas(id),
    date DATE NOT NULL,
    devotee_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT,
    ticket_code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'Booked' CHECK (status IN ('Booked', 'Cancelled', 'Completed')),
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Donations Table
CREATE TABLE public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_name TEXT NOT NULL,
    gothram TEXT,
    category TEXT NOT NULL,
    amount INTEGER NOT NULL,
    email TEXT,
    transaction_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Verified', 'Pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Site Configuration Table (Single-row store)
CREATE TABLE public.site_config (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    config JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insights Table
CREATE TABLE public.insights (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    laddu_stock INTEGER DEFAULT 0,
    laddus_distributed INTEGER DEFAULT 0,
    annadanam_count INTEGER DEFAULT 0,
    next_aarathi_time TEXT,
    crowd_status TEXT DEFAULT 'Moderate',
    darshan_wait_time INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.sevas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Gallery Table
CREATE TABLE public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    caption TEXT,
    type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.gallery DISABLE ROW LEVEL SECURITY;

-- Select policies
CREATE POLICY "Public Sevas are viewable by everyone" ON public.sevas FOR SELECT USING (true);
CREATE POLICY "Public Config is viewable by everyone" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Public Insights are viewable by everyone" ON public.insights FOR SELECT USING (true);
CREATE POLICY "Public Gallery is viewable by everyone" ON public.gallery FOR SELECT USING (true);

-- Authenticated policies
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own donations" ON public.donations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can add gallery items for testing" ON public.gallery FOR INSERT WITH CHECK (true);

-- Storage Policies (for 'images' bucket)
-- Note: Replace 'images' with the actual bucket name if different.
-- Using storage schema for policies.
CREATE POLICY "Public can view gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'images' AND (storage.foldername(name))[1] = 'gallery');
CREATE POLICY "Public can upload gallery images for testing" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND (storage.foldername(name))[1] = 'gallery');
CREATE POLICY "Admins can update gallery images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images' AND (storage.foldername(name))[1] = 'gallery' AND auth.jwt() ->> 'email' = 'admin@uttarandhratirupati.org');
CREATE POLICY "Admins can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images' AND (storage.foldername(name))[1] = 'gallery' AND auth.jwt() ->> 'email' = 'admin@uttarandhratirupati.org');
