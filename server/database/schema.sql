-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Clerk/Auth provider)
-- Forms table
CREATE TABLE forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    fields JSONB NOT NULL DEFAULT '[]',
    settings JSONB DEFAULT '{}',
    version INTEGER DEFAULT 1,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    optimized BOOLEAN DEFAULT FALSE,
    optimization_recommendations JSONB DEFAULT '[]',
    original_form_id UUID REFERENCES forms(id),
    optimized_by TEXT,
    optimized_at TIMESTAMP WITH TIME ZONE
);

-- Form submissions
CREATE TABLE form_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    submission_data JSONB NOT NULL,
    completion_time INTEGER, -- in seconds
    device JSONB,
    location JSONB,
    user_agent TEXT,
    ip_address TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form views tracking
CREATE TABLE form_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    user_agent TEXT,
    ip_address TEXT,
    referrer TEXT,
    device JSONB,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form interactions tracking
CREATE TABLE form_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    field_id TEXT NOT NULL,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('focus', 'blur', 'change', 'validation-error', 'skip', 'hesitation')),
    value TEXT,
    duration INTEGER, -- in seconds
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form analytics summary
CREATE TABLE form_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    submissions INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    avg_completion_time INTEGER DEFAULT 0,
    drop_off_points JSONB DEFAULT '{}',
    device_analytics JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(form_id, date)
);

-- Form optimizations
CREATE TABLE form_optimizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    new_form_id UUID REFERENCES forms(id),
    recommendations JSONB NOT NULL,
    applied_by TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    performance_improvement JSONB DEFAULT '{}'
);

-- A/B tests
CREATE TABLE ab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    variant_form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    traffic_split INTEGER NOT NULL CHECK (traffic_split >= 0 AND traffic_split <= 100),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    winner UUID REFERENCES forms(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Form templates
CREATE TABLE form_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    industry TEXT,
    fields JSONB NOT NULL,
    settings JSONB DEFAULT '{}',
    usage_count INTEGER DEFAULT 0,
    created_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences
CREATE TABLE user_preferences (
    user_id TEXT PRIMARY KEY,
    preferred_language TEXT DEFAULT 'en',
    notification_settings JSONB DEFAULT '{}',
    theme_preference TEXT DEFAULT 'light',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_forms_user_id ON forms(user_id);
CREATE INDEX idx_forms_status ON forms(status);
CREATE INDEX idx_form_submissions_form_id ON form_submissions(form_id);
CREATE INDEX idx_form_submissions_submitted_at ON form_submissions(submitted_at);
CREATE INDEX idx_form_views_form_id ON form_views(form_id);
CREATE INDEX idx_form_interactions_form_id ON form_interactions(form_id);
CREATE INDEX idx_form_interactions_timestamp ON form_interactions(timestamp);
CREATE INDEX idx_form_analytics_form_id_date ON form_analytics(form_id, date);
CREATE INDEX idx_form_optimizations_form_id ON form_optimizations(form_id);
CREATE INDEX idx_ab_tests_form_id ON ab_tests(form_id);
CREATE INDEX idx_form_templates_category ON form_templates(category);
CREATE INDEX idx_form_templates_industry ON form_templates(industry);

-- RLS (Row Level Security) policies
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;

-- Policies for forms table
CREATE POLICY "Users can view their own forms" ON forms
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own forms" ON forms
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own forms" ON forms
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own forms" ON forms
    FOR DELETE USING (user_id = auth.uid());

-- Policies for form submissions (public read for submitted forms)
CREATE POLICY "Form submissions are publicly readable" ON form_submissions
    FOR SELECT USING (true);

CREATE POLICY "Form submissions can be created by anyone" ON form_submissions
    FOR INSERT WITH CHECK (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON forms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_analytics_updated_at BEFORE UPDATE ON form_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_templates_updated_at BEFORE UPDATE ON form_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate form analytics
CREATE OR REPLACE FUNCTION calculate_form_analytics(form_uuid UUID, target_date DATE)
RETURNS TABLE (
    views INTEGER,
    submissions INTEGER,
    completion_rate DECIMAL,
    avg_completion_time INTEGER,
    drop_off_rate DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(COUNT(DISTINCT fv.id), 0) as views,
        COALESCE(COUNT(DISTINCT fs.id), 0) as submissions,
        CASE 
            WHEN COUNT(DISTINCT fv.id) > 0 
            THEN ROUND((COUNT(DISTINCT fs.id)::DECIMAL / COUNT(DISTINCT fv.id)) * 100, 2)
            ELSE 0
        END as completion_rate,
        COALESCE(AVG(fs.completion_time)::INTEGER, 0) as avg_completion_time,
        CASE 
            WHEN COUNT(DISTINCT fv.id) > 0 
            THEN ROUND(((COUNT(DISTINCT fv.id) - COUNT(DISTINCT fs.id))::DECIMAL / COUNT(DISTINCT fv.id)) * 100, 2)
            ELSE 0
        END as drop_off_rate
    FROM forms f
    LEFT JOIN form_views fv ON f.id = fv.form_id AND DATE(fv.viewed_at) = target_date
    LEFT JOIN form_submissions fs ON f.id = fs.form_id AND DATE(fs.submitted_at) = target_date
    WHERE f.id = form_uuid
    GROUP BY f.id;
END;
$$ LANGUAGE plpgsql;