-- Add total_visitors column to insights if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'insights' AND column_name = 'total_visitors') THEN
        ALTER TABLE public.insights ADD COLUMN total_visitors INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create function to increment total visitors
CREATE OR REPLACE FUNCTION public.increment_total_visitors()
RETURNS void AS $$
BEGIN
    UPDATE public.insights
    SET total_visitors = total_visitors + 1,
        updated_at = timezone('utc'::text, now())
    WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- News Table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    content TEXT,
    image_url TEXT,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pages Table (Dynamic CMS)
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'Banner' CHECK (type IN ('Banner', 'Ticker', 'Modal')),
    priority TEXT DEFAULT 'Normal' CHECK (priority IN ('Normal', 'High', 'Urgent')),
    is_active BOOLEAN DEFAULT true,
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Select policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public News is viewable by everyone') THEN
        CREATE POLICY "Public News is viewable by everyone" ON public.news FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Pages are viewable by everyone') THEN
        CREATE POLICY "Public Pages are viewable by everyone" ON public.pages FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Announcements are viewable by everyone') THEN
        CREATE POLICY "Public Announcements are viewable by everyone" ON public.announcements FOR SELECT USING (true);
    END IF;
END $$;

-- Admin Manage Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage news') THEN
        CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage pages') THEN
        CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage announcements') THEN
        CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL TO authenticated USING (true);
    END IF;
END $$;
