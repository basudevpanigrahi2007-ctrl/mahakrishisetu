-- ==========================================================
-- MahaKrishi Setu - Full SQL Database Schema & Seed Data
-- Compatible with PostgreSQL, MySQL, SQLite, Supabase
-- ==========================================================

-- 1. APMC Mandi Market Prices Table
CREATE TABLE IF NOT EXISTS market_prices (
    id VARCHAR(50) PRIMARY KEY,
    commodity VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    variety VARCHAR(100) NOT NULL,
    image_url TEXT,
    mandi VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    min_price NUMERIC(10, 2) NOT NULL,
    max_price NUMERIC(10, 2) NOT NULL,
    modal_price NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(50) DEFAULT 'Rs / Quintal',
    arrival_quantity VARCHAR(100),
    price_trend VARCHAR(50),
    trend_direction VARCHAR(20) DEFAULT 'up',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Government Subsidized Farming Products & Machinery
CREATE TABLE IF NOT EXISTS farming_products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(150),
    image_url TEXT,
    mrp NUMERIC(10, 2) NOT NULL,
    subsidy_price NUMERIC(10, 2) NOT NULL,
    discount_pct VARCHAR(50),
    unit VARCHAR(50),
    government_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Retailer Wholesale Produce Stock
CREATE TABLE IF NOT EXISTS retailer_wholesale_stock (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source_hub VARCHAR(150) NOT NULL,
    image_url TEXT,
    wholesale_rate NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    min_order INT DEFAULT 50,
    expected_retail NUMERIC(10, 2) NOT NULL,
    margin_pct VARCHAR(50),
    available_stock VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Verified Farmers Directory (Categorized by Production)
CREATE TABLE IF NOT EXISTS farmers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    village VARCHAR(100),
    district VARCHAR(100),
    land_acres NUMERIC(6, 2) NOT NULL,
    annual_production_q NUMERIC(10, 2) NOT NULL,
    tier VARCHAR(20) NOT NULL,
    tier_label VARCHAR(100),
    primary_crops VARCHAR(255),
    credit_status VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Government Direct Benefit Transfer (DBT) Schemes
CREATE TABLE IF NOT EXISTS government_schemes (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    category VARCHAR(100),
    benefit_amount VARCHAR(255),
    eligibility TEXT,
    active BOOLEAN DEFAULT TRUE
);

-- 6. Farmer Loans & KCC Subvention Ledger
CREATE TABLE IF NOT EXISTS farmer_loans (
    id VARCHAR(50) PRIMARY KEY,
    farmer_id VARCHAR(50) REFERENCES farmers(id),
    bank_name VARCHAR(150) NOT NULL,
    branch VARCHAR(100),
    loan_type VARCHAR(100),
    sanctioned_amount NUMERIC(12, 2) NOT NULL,
    outstanding_principal NUMERIC(12, 2) NOT NULL,
    repayment_deadline VARCHAR(50),
    next_emi_due_date VARCHAR(50),
    emi_amount NUMERIC(10, 2),
    status VARCHAR(50) DEFAULT 'Active & Regular',
    subsidy_linked VARCHAR(200),
    subsidy_status VARCHAR(100)
);

-- 7. Multi-Party Ledger & Order Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(50) PRIMARY KEY,
    txn_type VARCHAR(50) NOT NULL,
    date_str VARCHAR(50),
    party_one VARCHAR(150),
    party_two VARCHAR(150),
    commodity VARCHAR(150),
    quantity VARCHAR(100),
    unit_rate VARCHAR(50),
    total_amount NUMERIC(12, 2),
    brokerage_saved NUMERIC(10, 2) DEFAULT 0,
    escrow_status VARCHAR(100) DEFAULT 'Settled via Escrow',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Anti-Scam Voice Verification Biometric Contracts
CREATE TABLE IF NOT EXISTS voice_contracts (
    id VARCHAR(50) PRIMARY KEY,
    farmer_id VARCHAR(50),
    buyer_name VARCHAR(150),
    spoken_statement TEXT NOT NULL,
    sha256_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- SEED DATA INSERTS
-- ==========================================================

INSERT INTO market_prices (id, commodity, category, variety, image_url, mandi, district, min_price, max_price, modal_price, unit, arrival_quantity, price_trend, trend_direction)
VALUES
('CROP-MH-01', 'Onion', 'Vegetables', 'Nasik Red Special', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300', 'Lasalgaon APMC', 'Nashik', 1650, 2450, 2150, 'Rs / Quintal', '14,200 Quintals', '+6.5%', 'up'),
('CROP-MH-02', 'Tomato', 'Vegetables', 'Vaishnavi Hybrid', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300', 'Narayangaon APMC', 'Pune', 1200, 1850, 1600, 'Rs / Quintal', '8,900 Crates', '-3.2%', 'down'),
('CROP-MH-03', 'Soybean', 'Oilseeds', 'JS 335 Yellow', 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=300', 'Latur APMC', 'Latur', 4300, 4850, 4650, 'Rs / Quintal', '22,400 Quintals', '+2.8%', 'up'),
('CROP-MH-04', 'Cotton', 'Commercial Crops', 'Medium Staple BT', 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300', 'Akola APMC', 'Akola', 6800, 7450, 7200, 'Rs / Quintal', '9,600 Quintals', '+4.1%', 'up'),
('CROP-MH-05', 'Orange', 'Fruits', 'Nagpur Mandarin', 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=300', 'Kalamna APMC', 'Nagpur', 3500, 5200, 4400, 'Rs / Quintal', '11,500 Crates', '+5.0%', 'up'),
('CROP-MH-06', 'Pomegranate', 'Fruits', 'Bhagwa Export Grade', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300', 'Solapur APMC', 'Solapur', 7500, 12000, 9800, 'Rs / Quintal', '5,300 Crates', '+8.2%', 'up')
ON CONFLICT (id) DO NOTHING;

INSERT INTO farmers (id, name, phone, village, district, land_acres, annual_production_q, tier, tier_label, primary_crops, credit_status, avatar_url)
VALUES
('FARM-MH-01', 'Ramesh Ganpatrao Patil', '9827897707', 'Dindori', 'Nashik', 6.5, 580, 'Tier-1', 'Tier-1 Mega Producer', 'Onion, Pomegranate', '0% KCC Active (₹3L)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('FARM-MH-02', 'Vikas Shankarrao Deshmukh', '9822001122', 'Niphad', 'Nashik', 8.0, 740, 'Tier-1', 'Tier-1 Mega Producer', 'Grapes, Onion', '0% KCC Active (₹5L)', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
('FARM-MH-03', 'Santosh Baburao Chavan', '9890123456', 'Ausa', 'Latur', 4.2, 320, 'Tier-2', 'Tier-2 Progressive', 'Soybean, Turmeric', 'MahaDBT 50% Drip Credited', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150')
ON CONFLICT (id) DO NOTHING;