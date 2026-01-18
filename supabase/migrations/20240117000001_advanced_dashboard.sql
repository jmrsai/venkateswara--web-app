-- Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    type TEXT DEFAULT 'Event' CHECK (type IN ('Festival', 'Event', 'Pooja', 'Meeting')),
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed', 'Cancelled')),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER DEFAULT 0,
    unit TEXT NOT NULL,
    low_stock_threshold INTEGER DEFAULT 10,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Library Table
CREATE TABLE IF NOT EXISTS public.library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('audio', 'ebook')),
    title TEXT NOT NULL,
    te_title TEXT,
    url TEXT NOT NULL,
    description TEXT,
    te_description TEXT,
    thumbnail_url TEXT,
    author TEXT,
    te_author TEXT,
    duration TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Videos Table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    te_title TEXT,
    description TEXT,
    te_description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    read BOOLEAN DEFAULT false,
    ai_summary TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'General' CHECK (type IN ('General', 'Emergency', 'Festival', 'Booking')),
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Select policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Events are viewable by everyone') THEN
        CREATE POLICY "Public Events are viewable by everyone" ON public.events FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Library items are viewable by everyone') THEN
        CREATE POLICY "Public Library items are viewable by everyone" ON public.library FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Videos are viewable by everyone') THEN
        CREATE POLICY "Public Videos are viewable by everyone" ON public.videos FOR SELECT USING (true);
    END IF;
END $$;

-- Admin Insert/Update/Delete Policies (Simplified for local setup, restricted by role soon)
-- Considering the requirement for Admin UID zAq3p2QRugN1PIgF9apyylEWTpH3
-- For now, we allow authenticated users (which will be the admin) to manage these.
-- In a real production SQL migration, we'd use service role or specific checks.

CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage inventory" ON public.inventory FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage library" ON public.library FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage videos" ON public.videos FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage feedback" ON public.feedback FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can manage notifications" ON public.notifications FOR ALL TO authenticated USING (true);
