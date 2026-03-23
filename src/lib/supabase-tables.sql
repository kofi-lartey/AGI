-- =====================================================
-- Supabase Database Schema for AGI Media Assets
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- Table: media_assets
-- Stores Cloudinary URLs and metadata for all media files
-- =====================================================

CREATE TABLE IF NOT EXISTS media_assets (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Cloudinary specific fields
    cloudinary_public_id VARCHAR(500) NOT NULL,
    cloudinary_url TEXT NOT NULL,
    cloudinary_secure_url TEXT NOT NULL,
    
    -- File metadata
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL CHECK (file_type IN ('image', 'video', 'document', 'audio')),
    mime_type VARCHAR(100) NOT NULL,
    format VARCHAR(20),
    file_size_bytes INTEGER,
    
    -- Dimensions (for images/videos)
    width INTEGER,
    height INTEGER,
    duration_seconds NUMERIC(10, 2), -- For videos/audio
    
    -- AGI-specific metadata
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(100) DEFAULT 'Uncategorized',
    tags TEXT[], -- Array of tags for filtering
    alt_text TEXT, -- For accessibility
    
    -- Display/usage properties
    display_type VARCHAR(50) DEFAULT 'small' CHECK (display_type IN ('small', 'medium', 'large', 'featured')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Organization
    location VARCHAR(255),
    event_date DATE,
    
    -- Attribution
    uploaded_by VARCHAR(255),
    credits VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- Table: blog_posts
-- Stores blog content with featured images
-- =====================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Content
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    
    -- Featured media (references media_assets)
    featured_image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    featured_image_url TEXT,
    
    -- Categorization
    category VARCHAR(100) DEFAULT 'General',
    tags TEXT[],
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    author VARCHAR(255),
    
    -- Analytics
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- Table: applications
-- Stores membership applications
-- =====================================================

CREATE TABLE IF NOT EXISTS applications (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Company Information
    company_name VARCHAR(255) NOT NULL,
    company_email VARCHAR(255) NOT NULL,
    company_phone VARCHAR(50),
    company_address TEXT,
    region VARCHAR(100),
    district VARCHAR(100),
    digital_address VARCHAR(50),
    
    -- Business Details
    business_type VARCHAR(100),
    industry_sector VARCHAR(100),
    company_profile TEXT,
    year_established INTEGER,
    employee_count VARCHAR(50),
    annual_revenue VARCHAR(50),
    ceo_name VARCHAR(255),
    ceo_email VARCHAR(255),
    ceo_phone VARCHAR(50),
    
    -- Membership
    membership_type VARCHAR(100),
    membership_category VARCHAR(100),
    
    -- Documents (references media_assets)
    certificate_of_incorporation_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    tax_certificate_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    company_profile_doc_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'review', 'approved', 'rejected')),
    assigned_to VARCHAR(255),
    notes TEXT,
    
    -- Serial number for tracking
    serial_number VARCHAR(50) UNIQUE,
    
    -- Timestamps
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- Table: users (for authentication)
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    -- Primary key - links to Supabase auth.users
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Last login tracking
    last_login_at TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    
    -- Preferences
    preferences JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- Indexes for better query performance
-- =====================================================

-- media_assets indexes
CREATE INDEX IF NOT EXISTS idx_media_assets_file_type ON media_assets(file_type);
CREATE INDEX IF NOT EXISTS idx_media_assets_category ON media_assets(category);
CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON media_assets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_assets_is_active ON media_assets(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_media_assets_cloudinary_public_id ON media_assets(cloudinary_public_id);

-- blog_posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE status = 'published';

-- applications indexes
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_serial_number ON applications(serial_number);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_company_name ON applications(company_name);

-- users indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Media Assets policies
CREATE POLICY "Public can view active media assets" 
    ON media_assets FOR SELECT 
    USING (is_active = TRUE);

CREATE POLICY "Authenticated users can insert media assets" 
    ON media_assets FOR INSERT 
    WITH CHECK (auth.role() IN ('authenticated', 'anon'));

CREATE POLICY "Users can update own media assets" 
    ON media_assets FOR UPDATE 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Admins can delete media assets" 
    ON media_assets FOR DELETE 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Blog posts policies
CREATE POLICY "Public can view published blog posts" 
    ON blog_posts FOR SELECT 
    USING (status = 'published');

CREATE POLICY "Authenticated users can manage blog posts" 
    ON blog_posts FOR ALL 
    USING (auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'moderator')));

-- Applications policies
CREATE POLICY "Public can submit applications" 
    ON applications FOR INSERT 
    WITH CHECK (auth.role() IN ('authenticated', 'anon'));

CREATE POLICY "Users can view own applications" 
    ON applications FOR SELECT 
    USING (auth.uid() IN (SELECT id FROM users) OR status = 'approved');

CREATE POLICY "Admins can manage all applications" 
    ON applications FOR ALL 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Users policies
CREATE POLICY "Users can view user profiles" 
    ON users FOR SELECT 
    USING (is_active = TRUE);

CREATE POLICY "Users can update own profile" 
    ON users FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Admins can manage users" 
    ON users FOR ALL 
    USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- =====================================================
-- Functions and Triggers
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update timestamps
CREATE TRIGGER update_media_assets_updated_at 
    BEFORE UPDATE ON media_assets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at 
    BEFORE UPDATE ON applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate application serial number
CREATE OR REPLACE FUNCTION generate_application_serial()
RETURNS TRIGGER AS $$
DECLARE
    year_str VARCHAR(4);
    count_num INTEGER;
    serial VARCHAR(50);
BEGIN
    year_str := EXTRACT(YEAR FROM NOW())::VARCHAR;
    count_num := COALESCE(
        (SELECT COUNT(*) FROM applications WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW())),
        0
    ) + 1;
    serial := 'AGI-' || year_str || '-' || LPAD(count_num::VARCHAR, 5, '0');
    NEW.serial_number := serial;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to generate serial number on application insert
CREATE TRIGGER generate_application_serial_trigger
    BEFORE INSERT ON applications
    FOR EACH ROW
    WHEN (NEW.serial_number IS NULL)
    EXECUTE FUNCTION generate_application_serial();

-- =====================================================
-- Comments for documentation
-- =====================================================

COMMENT ON TABLE media_assets IS 'Stores all media assets (images, videos, documents) uploaded to Cloudinary';
COMMENT ON TABLE blog_posts IS 'Blog posts with content, metadata, and analytics';
COMMENT ON TABLE applications IS 'Membership applications with company details and documents';
COMMENT ON TABLE users IS 'User profiles linked to Supabase authentication';

COMMENT ON COLUMN media_assets.cloudinary_public_id IS 'Unique identifier in Cloudinary (used for transformations/deletion)';
COMMENT ON COLUMN media_assets.cloudinary_url IS 'HTTP URL from Cloudinary';
COMMENT ON COLUMN media_assets.cloudinary_secure_url IS 'HTTPS URL from Cloudinary';
COMMENT ON COLUMN media_assets.file_type IS 'Type: image, video, document, or audio';
COMMENT ON COLUMN media_assets.display_type IS 'Display size: small (1 col), medium (square), large (2 cols), featured';
