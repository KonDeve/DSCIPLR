-- ============================================================
-- DSCIPLR Church Management System - Database Schema
-- Focused on Secretary and Treasurer Roles
-- Database: PostgreSQL (Supabase)
-- ============================================================

-- ============================================================
-- CORE TABLES
-- ============================================================

-- Users table (for authentication & role management)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'pastor', 'treasurer', 'secretary')),
    avatar_url TEXT,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SECRETARY DOMAIN TABLES
-- ============================================================

-- Members table (church members and guests)
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id VARCHAR(20) UNIQUE NOT NULL, -- e.g., MEM-2023-0842 or GST-90123
    member_type VARCHAR(20) NOT NULL CHECK (member_type IN ('member', 'guest')),
    
    -- Personal Information (Section 1)
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    marital_status VARCHAR(20) CHECK (marital_status IN ('single', 'married', 'widowed', 'divorced')),
    
    -- Contact Information (Section 2)
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    
    -- Church Specifics (Section 3)
    membership_date DATE,
    department VARCHAR(100),
    
    -- Attachments (Section 4)
    profile_image_url TEXT,
    id_document_url TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deceased', 'transferred')),
    
    -- Audit
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    venue VARCHAR(255),
    description TEXT,
    
    -- Scheduling
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    
    -- Status
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('draft', 'scheduled', 'in_progress', 'completed', 'cancelled')),
    
    -- Audit
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance records
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    
    -- Check-in details
    check_in_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    check_in_method VARCHAR(20) DEFAULT 'manual' CHECK (check_in_method IN ('manual', 'qr_code', 'rfid', 'online')),
    status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'late', 'absent', 'excused')),
    
    -- Additional info
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(event_id, member_id)
);





-- External service payment requests (submitted by secretary, approved by treasurer)
CREATE TABLE payment_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(20) UNIQUE NOT NULL, -- e.g., #PR-8842
    
    -- Payee information
    payee_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PHP',
    on_behalf_of VARCHAR(100), -- ministry/department
    
    -- Supporting documents
    receipt_url TEXT,
    
    -- Approval workflow
    status VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted', 'pending_approval','pastor_approval', 'approved', 'rejected', 'released', 'completed')),
    requested_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    approval_date TIMESTAMPTZ,
    rejection_reason TEXT,
    
    -- Fund source
    fund_category_id UUID REFERENCES fund_categories(id),
    
    -- Audit
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TREASURER DOMAIN TABLES
-- ============================================================

-- Fund/Account categories (Di pa sure)
CREATE TABLE fund_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL, -- e.g., ACC-001
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Allocation/Budget
    allocation_type VARCHAR(20) DEFAULT 'unrestricted' CHECK (allocation_type IN ('unrestricted', 'restricted', 'goal_based')),
    allocation_goal DECIMAL(15,2), -- for goal-based funds
    allocation_period VARCHAR(20) CHECK (allocation_period IN ('one_time', 'monthly', 'quarterly', 'yearly')),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'closed')),
    
    -- Audit
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection types/categories (Tithe, Offering, Donations, etc.)
CREATE TABLE collection_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    fund_category_id UUID REFERENCES fund_categories(id),
    color VARCHAR(7) DEFAULT '#137fec', -- hex color for UI badges
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., TXN-9482-001X-B
    
    -- Donor information
    member_id UUID REFERENCES members(id), -- nullable for anonymous donations
    donor_name VARCHAR(255), -- for non-member or anonymous donations
    is_anonymous BOOLEAN DEFAULT false,
    
    -- Collection details
    collection_type_id UUID REFERENCES collection_types(id),
    fund_category_id UUID REFERENCES fund_categories(id),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PHP',
    
    -- Payment details
    payment_method VARCHAR(30) NOT NULL CHECK (payment_method IN ('cash', 'check', 'online_transfer', 'credit_card', 'gcash', 'maya', 'bank_deposit')),
    check_number VARCHAR(50),
    bank_name VARCHAR(100),
    transaction_reference VARCHAR(100), -- for online/card payments
    
    -- Dates
    date_received DATE NOT NULL,
    date_deposited DATE,
    date_cleared DATE, -- for checks
    
    -- Status tracking
    status VARCHAR(30) DEFAULT 'recorded' CHECK (status IN ('recorded', 'validated', 'pending_clearance', 'cleared', 'syncing', 'confirmed', 'rejected', 'refunded')),
    
    -- Notes
    donor_notes TEXT, -- message from donor
    internal_notes TEXT,
    
    -- Event association (for event-specific collections)
    event_id UUID REFERENCES events(id),
    
    -- Audit
    recorded_by UUID REFERENCES users(id),
    validated_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection status timeline/history (Di pa din sure kung kelangan)
CREATE TABLE collection_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    status_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rentable assets (vehicles, venues, etc.)
CREATE TABLE rental_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_type VARCHAR(50) NOT NULL CHECK (asset_type IN ('venue', 'vehicle')),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Pricing
    rental_rate_per_hour DECIMAL(10,2),
    rental_rate_per_day DECIMAL(10,2),
    deposit_required DECIMAL(10,2),
    
    -- Status
    is_available BOOLEAN DEFAULT true,
    maintenance_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rental bookings
CREATE TABLE rental_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    
    -- Asset
    rental_asset_id UUID REFERENCES rental_assets(id),
    
    -- Renter information
    member_id UUID REFERENCES members(id),
    renter_name VARCHAR(255) NOT NULL,
    renter_phone VARCHAR(20),
    renter_email VARCHAR(255),
    
    -- Booking details
    booking_date DATE NOT NULL,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    purpose TEXT,
    
    -- Financial (Di pa sure kung kelangan lahat ng ito kasi baka same price lang ang rental, pero for flexibility)
    rental_amount DECIMAL(15,2) NOT NULL,
    deposit_amount DECIMAL(10,2),
    total_amount DECIMAL(15,2) NOT NULL,
    amount_paid DECIMAL(15,2) DEFAULT 0,
    
    -- Payment status
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'overdue', 'refunded')),
    date_paid DATE,
    
    -- Booking status
    booking_status VARCHAR(20) DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'in_use', 'completed', 'cancelled')),
    
    -- Notes
    notes TEXT,
    
    -- Audit
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rental payments (multiple payments per booking)
CREATE TABLE rental_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,
    
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    payment_date DATE NOT NULL,
    reference_number VARCHAR(50),
    notes TEXT,
    
    received_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expense categories
CREATE TABLE expense_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id UUID REFERENCES expense_categories(id), -- for subcategories
    budget_amount DECIMAL(15,2),
    budget_period VARCHAR(20) CHECK (budget_period IN ('monthly', 'quarterly', 'yearly')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses (actual recorded expenses, may come from payment requests)
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Link to payment request if applicable
    payment_request_id UUID REFERENCES payment_requests(id),
    
    -- Expense details
    expense_category_id UUID REFERENCES expense_categories(id),
    fund_category_id UUID REFERENCES fund_categories(id),
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PHP',
    
    -- Payee
    payee_name VARCHAR(255),
    
    -- Payment details
    payment_method VARCHAR(30),
    payment_date DATE NOT NULL,
    
    -- Documentation
    receipt_url TEXT,
    invoice_number VARCHAR(50),
    notes TEXT,
    
    -- Audit
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REPORTING & ANALYTICS SUPPORT
-- ============================================================

-- Financial periods (for report generation)
CREATE TABLE financial_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_name VARCHAR(100) NOT NULL,
    period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('weekly', 'monthly', 'quarterly', 'yearly')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_closed BOOLEAN DEFAULT false,
    closed_by UUID REFERENCES users(id),
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial summary snapshots (for dashboard quick stats)
CREATE TABLE financial_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_id UUID REFERENCES financial_periods(id),
    summary_date DATE NOT NULL,
    
    -- Collections
    total_collections DECIMAL(15,2) DEFAULT 0,
    total_tithes DECIMAL(15,2) DEFAULT 0,
    total_offerings DECIMAL(15,2) DEFAULT 0,
    total_other_donations DECIMAL(15,2) DEFAULT 0,
    
    -- Rentals
    total_rental_income DECIMAL(15,2) DEFAULT 0,
    pending_rental_payments DECIMAL(15,2) DEFAULT 0,
    
    -- Expenses
    total_expenses DECIMAL(15,2) DEFAULT 0,
    total_disbursements DECIMAL(15,2) DEFAULT 0,
    
    -- Net
    net_income DECIMAL(15,2) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG
-- ============================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

-- Members
CREATE INDEX idx_members_member_id ON members(member_id);
CREATE INDEX idx_members_member_type ON members(member_type);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_email ON members(email);

-- Events
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_start_datetime ON events(start_datetime);

-- Attendance
CREATE INDEX idx_attendance_event_id ON attendance(event_id);
CREATE INDEX idx_attendance_member_id ON attendance(member_id);
CREATE INDEX idx_attendance_check_in_time ON attendance(check_in_time);

-- Collections
CREATE INDEX idx_collections_member_id ON collections(member_id);
CREATE INDEX idx_collections_collection_type_id ON collections(collection_type_id);
CREATE INDEX idx_collections_date_received ON collections(date_received);
CREATE INDEX idx_collections_status ON collections(status);
CREATE INDEX idx_collections_reference_number ON collections(reference_number);
CREATE INDEX idx_collections_fund_category_id ON collections(fund_category_id);

-- Rental bookings
CREATE INDEX idx_rental_bookings_member_id ON rental_bookings(member_id);
CREATE INDEX idx_rental_bookings_rental_asset_id ON rental_bookings(rental_asset_id);
CREATE INDEX idx_rental_bookings_booking_date ON rental_bookings(booking_date);
CREATE INDEX idx_rental_bookings_payment_status ON rental_bookings(payment_status);

-- Expenses
CREATE INDEX idx_expenses_expense_category_id ON expenses(expense_category_id);
CREATE INDEX idx_expenses_payment_date ON expenses(payment_date);
CREATE INDEX idx_expenses_fund_category_id ON expenses(fund_category_id);

-- Payment requests
CREATE INDEX idx_payment_requests_status ON payment_requests(status);
CREATE INDEX idx_payment_requests_requested_by ON payment_requests(requested_by);

-- Audit logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SAMPLE RLS POLICIES (customize based on auth implementation)
-- ============================================================

-- Example: Secretary can manage members
CREATE POLICY secretary_members_all ON members
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('super_admin', 'admin', 'secretary')
        )
    );

-- Example: Treasurer can manage collections
CREATE POLICY treasurer_collections_all ON collections
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('super_admin', 'admin', 'treasurer')
        )
    );

-- Example: Read-only access for other authenticated users
CREATE POLICY read_members ON members
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fund_categories_updated_at BEFORE UPDATE ON fund_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rental_assets_updated_at BEFORE UPDATE ON rental_assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rental_bookings_updated_at BEFORE UPDATE ON rental_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_requests_updated_at BEFORE UPDATE ON payment_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_requests_updated_at BEFORE UPDATE ON payment_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- UTILITY FUNCTIONS
-- ============================================================

-- Generate member ID
CREATE OR REPLACE FUNCTION generate_member_id(member_type VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
    prefix VARCHAR;
    year_part VARCHAR;
    sequence_num INTEGER;
    new_id VARCHAR;
BEGIN
    IF member_type = 'guest' THEN
        prefix := 'GST';
    ELSE
        prefix := 'MEM';
    END IF;
    
    year_part := TO_CHAR(NOW(), 'YYYY');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(member_id FROM 10 FOR 4) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM members
    WHERE member_id LIKE prefix || '-' || year_part || '-%';
    
    new_id := prefix || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Generate collection reference number
CREATE OR REPLACE FUNCTION generate_collection_reference()
RETURNS VARCHAR AS $$
DECLARE
    new_ref VARCHAR;
BEGIN
    new_ref := 'TXN-' || 
               LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 10000)::TEXT, 4, '0') || '-' ||
               LPAD((RANDOM() * 1000)::INTEGER::TEXT, 3, '0') || 'X-' ||
               CHR(65 + (RANDOM() * 25)::INTEGER);
    RETURN new_ref;
END;
$$ LANGUAGE plpgsql;

-- Generate payment request ID
CREATE OR REPLACE FUNCTION generate_payment_request_id()
RETURNS VARCHAR AS $$
DECLARE
    sequence_num INTEGER;
    new_id VARCHAR;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(request_id FROM 5) AS INTEGER)), 8800) + 1
    INTO sequence_num
    FROM payment_requests;
    
    new_id := '#PR-' || sequence_num::TEXT;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================

-- Active members summary
CREATE VIEW v_active_members AS
SELECT 
    m.*
FROM members m
WHERE m.status = 'active';

-- Collections summary by period
CREATE VIEW v_collections_summary AS
SELECT 
    DATE_TRUNC('month', date_received) AS month,
    ct.name AS collection_type,
    fc.name AS fund_name,
    COUNT(*) AS total_transactions,
    SUM(amount) AS total_amount
FROM collections c
JOIN collection_types ct ON c.collection_type_id = ct.id
JOIN fund_categories fc ON c.fund_category_id = fc.id
WHERE c.status IN ('confirmed', 'cleared')
GROUP BY DATE_TRUNC('month', date_received), ct.name, fc.name
ORDER BY month DESC;

-- Upcoming events
CREATE VIEW v_upcoming_events AS
SELECT 
    e.*,
    (SELECT COUNT(*) FROM attendance a WHERE a.event_id = e.id) AS current_attendance
FROM events e
WHERE e.start_datetime >= CURRENT_TIMESTAMP
AND e.status IN ('scheduled', 'in_progress')
ORDER BY e.start_datetime;

-- Fund balances
CREATE VIEW v_fund_balances AS
SELECT 
    fc.id,
    fc.code,
    fc.name,
    fc.description,
    fc.allocation_goal,
    COALESCE(SUM(c.amount), 0) AS total_collections,
    COALESCE(SUM(e.amount), 0) AS total_expenses,
    COALESCE(SUM(c.amount), 0) - COALESCE(SUM(e.amount), 0) AS current_balance,
    CASE 
        WHEN fc.allocation_goal > 0 
        THEN ROUND((COALESCE(SUM(c.amount), 0) / fc.allocation_goal) * 100, 2)
        ELSE 100
    END AS goal_percentage
FROM fund_categories fc
LEFT JOIN collections c ON c.fund_category_id = fc.id AND c.status IN ('confirmed', 'cleared')
LEFT JOIN expenses e ON e.fund_category_id = fc.id
WHERE fc.status = 'active'
GROUP BY fc.id, fc.code, fc.name, fc.description, fc.allocation_goal;

-- Pending payment requests
CREATE VIEW v_pending_payment_requests AS
SELECT 
    pr.*,
    u.first_name || ' ' || u.last_name AS requested_by_name
FROM payment_requests pr
LEFT JOIN users u ON pr.requested_by = u.id
WHERE pr.status IN ('submitted', 'pending_approval', 'approved')
ORDER BY pr.created_at DESC;

-- Rental income summary
CREATE VIEW v_rental_income_summary AS
SELECT 
    ra.name AS asset_name,
    ra.asset_type,
    COUNT(rb.id) AS total_bookings,
    SUM(rb.total_amount) AS total_revenue,
    SUM(CASE WHEN rb.payment_status = 'paid' THEN rb.amount_paid ELSE 0 END) AS collected_amount,
    SUM(CASE WHEN rb.payment_status IN ('pending', 'partial', 'overdue') THEN rb.total_amount - rb.amount_paid ELSE 0 END) AS pending_amount
FROM rental_assets ra
LEFT JOIN rental_bookings rb ON rb.rental_asset_id = ra.id
GROUP BY ra.id, ra.name, ra.asset_type;

-- ============================================================
-- INSERT SEED DATA FOR LOOKUPS
-- ============================================================

-- Collection types seed data
INSERT INTO collection_types (name, description, color) VALUES
('Tithe', 'Regular tithe contributions', '#3b82f6'),
('Offering', 'General offerings', '#6b7280'),
('Building Fund', 'Contributions for building projects', '#9333ea'),
('Missions', 'Missions and outreach fund', '#22c55e'),
('Love Gift', 'Special donations and love gifts', '#f43f5e'),
('Youth Ministry', 'Donations for youth programs', '#8b5cf6'),
('Benevolence', 'Fund for helping those in need', '#f59e0b');

-- Expense categories seed data
INSERT INTO expense_categories (name, description) VALUES
('Utilities', 'Electricity, water, internet, phone bills'),
('Maintenance', 'Building and equipment maintenance'),
('Office', 'Office supplies and equipment'),
('Ministry', 'Ministry program expenses'),
('Outreach', 'Community outreach program expenses'),
('Salaries', 'Staff salaries and benefits'),
('Events', 'Special event expenses'),
('Transportation', 'Vehicle fuel and maintenance');
