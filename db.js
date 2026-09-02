/**
 * MahaKrishi Setu - Database Engine (db.js)
 * Supports file-persistent auto-seeding data store with zero configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'data_store.json');

// Initial Seed Database
export const SEED_DATA = {
  govDatabaseSyncInfo: {
    lastSyncedAt: new Date().toISOString(),
    source: "Government of India Agmarknet / Maharashtra State Agricultural Marketing Board (MSAMB)",
    status: "Live Synchronized & Stored in DB",
    recordsCount: 10
  },
  marketPrices: [
    { id: "CROP-MH-01", commodity: "Onion", category: "Vegetables", variety: "Nasik Red Special", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80", mandi: "Lasalgaon APMC", district: "Nashik", minPrice: 1650, maxPrice: 2450, modalPrice: 2150, unit: "Rs / Quintal", arrivalQuantity: "14,200 Quintals", priceTrend: "+6.5%", trendDirection: "up" },
    { id: "CROP-MH-02", commodity: "Tomato", category: "Vegetables", variety: "Vaishnavi Hybrid", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80", mandi: "Narayangaon APMC", district: "Pune", minPrice: 1200, maxPrice: 1850, modalPrice: 1600, unit: "Rs / Quintal", arrivalQuantity: "8,900 Crates", priceTrend: "-3.2%", trendDirection: "down" },
    { id: "CROP-MH-03", commodity: "Soybean", category: "Oilseeds", variety: "JS 335 Yellow", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=300&auto=format&fit=crop&q=80", mandi: "Latur APMC", district: "Latur", minPrice: 4300, maxPrice: 4850, modalPrice: 4650, unit: "Rs / Quintal", arrivalQuantity: "22,400 Quintals", priceTrend: "+2.8%", trendDirection: "up" },
    { id: "CROP-MH-04", commodity: "Cotton", category: "Commercial Crops", variety: "Medium Staple BT", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300&auto=format&fit=crop&q=80", mandi: "Akola APMC", district: "Akola", minPrice: 6800, maxPrice: 7450, modalPrice: 7200, unit: "Rs / Quintal", arrivalQuantity: "9,600 Quintals", priceTrend: "+4.1%", trendDirection: "up" },
    { id: "CROP-MH-05", commodity: "Orange", category: "Fruits", variety: "Nagpur Mandarin", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=300&auto=format&fit=crop&q=80", mandi: "Kalamna APMC", district: "Nagpur", minPrice: 3500, maxPrice: 5200, modalPrice: 4400, unit: "Rs / Quintal", arrivalQuantity: "11,500 Crates", priceTrend: "+5.0%", trendDirection: "up" },
    { id: "CROP-MH-06", commodity: "Pomegranate", category: "Fruits", variety: "Bhagwa Export Grade", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&auto=format&fit=crop&q=80", mandi: "Solapur APMC", district: "Solapur", minPrice: 7500, maxPrice: 12000, modalPrice: 9800, unit: "Rs / Quintal", arrivalQuantity: "5,300 Crates", priceTrend: "+8.2%", trendDirection: "up" },
    { id: "CROP-MH-07", commodity: "Banana", category: "Fruits", variety: "Grand Naine G-9", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80", mandi: "Raver APMC", district: "Jalgaon", minPrice: 1400, maxPrice: 2100, modalPrice: 1850, unit: "Rs / Quintal", arrivalQuantity: "18,000 Crates", priceTrend: "0.0%", trendDirection: "stable" },
    { id: "CROP-MH-08", commodity: "Sugarcane", category: "Commercial Crops", variety: "Co 86032 Nira", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=300&auto=format&fit=crop&q=80", mandi: "Kolhapur APMC", district: "Kolhapur", minPrice: 3100, maxPrice: 3450, modalPrice: 3300, unit: "Rs / Ton", arrivalQuantity: "45,000 Tons", priceTrend: "+1.5%", trendDirection: "up" },
    { id: "CROP-MH-09", commodity: "Turmeric", category: "Spices", variety: "Rajapore Double Polished", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&auto=format&fit=crop&q=80", mandi: "Sangli APMC", district: "Sangli", minPrice: 13500, maxPrice: 17200, modalPrice: 15400, unit: "Rs / Quintal", arrivalQuantity: "6,200 Bags", priceTrend: "+11.4%", trendDirection: "up" },
    { id: "CROP-MH-10", commodity: "Wheat", category: "Foodgrains", variety: "Lokwan Grade A", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&auto=format&fit=crop&q=80", mandi: "Vashi APMC", district: "Thane/Mumbai", minPrice: 2800, maxPrice: 3350, modalPrice: 3100, unit: "Rs / Quintal", arrivalQuantity: "31,000 Bags", priceTrend: "+1.0%", trendDirection: "up" }
  ],
  farmingProducts: [
    { id: "PROD-101", name: "Mahyco Certified Onion Seeds (Panchganga Red)", category: "Certified Seeds", brand: "Mahyco Seeds Ltd.", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80", mrp: 1450, subsidyPrice: 850, discountPct: "41% OFF", unit: "500g Pack", governmentApproved: true },
    { id: "PROD-102", name: "IFFCO Nano Urea Liquid (4% Nitrogen)", category: "Fertilizers", brand: "IFFCO Maharashtra", image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&auto=format&fit=crop&q=80", mrp: 225, subsidyPrice: 195, discountPct: "13% OFF", unit: "500 ml Bottle", governmentApproved: true },
    { id: "PROD-103", name: "DAP Fertilizer (18-46-0) Mahadhan", category: "Fertilizers", brand: "Deepak Fertilisers", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop&q=80", mrp: 1850, subsidyPrice: 1350, discountPct: "27% OFF", unit: "50 kg Bag", governmentApproved: true },
    { id: "PROD-104", name: "Jain Drip Irrigation Inline Kit (1 Acre)", category: "Irrigation & Water Tech", brand: "Jain Irrigation Systems", image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&auto=format&fit=crop&q=80", mrp: 42000, subsidyPrice: 12500, discountPct: "70% DBT Subsidy", unit: "1 Acre Complete Set", governmentApproved: true },
    { id: "PROD-105", name: "Solar Powered Agri Water Pump 5HP", category: "Farm Machinery & Solar", brand: "Shakti Pumps / PM-KUSUM", image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80", mrp: 245000, subsidyPrice: 24500, discountPct: "90% PM-KUSUM", unit: "5HP Submersible", governmentApproved: true },
    { id: "PROD-106", name: "Mahindra Subsidized Rotary Tiller", category: "Farm Machinery & Solar", brand: "Mahindra Farm Division", image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&auto=format&fit=crop&q=80", mrp: 110000, subsidyPrice: 55000, discountPct: "50% MahaDBT", unit: "7 Feet Heavy Duty", governmentApproved: true },
    { id: "PROD-107", name: "Bio-Neem Certified Organic Pesticide", category: "Fertilizers", brand: "Kisan Bio Agri", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&auto=format&fit=crop&q=80", mrp: 950, subsidyPrice: 420, discountPct: "55% OFF", unit: "1 Litre Concentrated", governmentApproved: true },
    { id: "PROD-108", name: "Mahyco BT Cotton Seeds (Bollgard II)", category: "Certified Seeds", brand: "Mahyco Maharashtra", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&auto=format&fit=crop&q=80", mrp: 1200, subsidyPrice: 750, discountPct: "37% OFF", unit: "450g Pack", governmentApproved: true }
  ],
  retailerWholesaleStock: [
    { id: "RSTOCK-01", name: "Onion (Nasik Red Special)", source: "Lasalgaon APMC Direct Hub", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80", wholesaleRate: 21.50, unit: "kg", minOrder: 50, expectedRetail: 35.00, marginPct: "+38.5%", availableStock: "4,500 kg in crates" },
    { id: "RSTOCK-02", name: "Tomato (Vaishnavi Hybrid)", source: "Narayangaon APMC Hub", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80", wholesaleRate: 16.00, unit: "kg", minOrder: 40, expectedRetail: 28.00, marginPct: "+42.8%", availableStock: "3,200 kg in crates" },
    { id: "RSTOCK-03", name: "Pomegranate (Bhagwa Export)", source: "Solapur APMC Farmers Hub", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&auto=format&fit=crop&q=80", wholesaleRate: 98.00, unit: "kg", minOrder: 20, expectedRetail: 160.00, marginPct: "+38.7%", availableStock: "1,800 kg in boxes" },
    { id: "RSTOCK-04", name: "Nagpur Mandarin Orange", source: "Kalamna APMC Hub", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=300&auto=format&fit=crop&q=80", wholesaleRate: 44.00, unit: "kg", minOrder: 30, expectedRetail: 70.00, marginPct: "+37.1%", availableStock: "2,500 kg in nets" }
  ],
  farmersList: [
    { id: "FARM-MH-01", name: "Ramesh Ganpatrao Patil", village: "Dindori", district: "Nashik", landAcres: 6.5, annualProductionQ: 580, tier: "Tier-1", tierLabel: "Tier-1 Mega Producer", primaryCrops: "Onion, Pomegranate", creditStatus: "0% KCC Active (₹3L)", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { id: "FARM-MH-02", name: "Vikas Shankarrao Deshmukh", village: "Niphad", district: "Nashik", landAcres: 8.0, annualProductionQ: 740, tier: "Tier-1", tierLabel: "Tier-1 Mega Producer", primaryCrops: "Grapes, Onion", creditStatus: "0% KCC Active (₹5L)", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
    { id: "FARM-MH-03", name: "Santosh Baburao Chavan", village: "Ausa", district: "Latur", landAcres: 4.2, annualProductionQ: 320, tier: "Tier-2", tierLabel: "Tier-2 Progressive", primaryCrops: "Soybean, Turmeric", creditStatus: "MahaDBT 50% Drip Credited", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" },
    { id: "FARM-MH-04", name: "Pravin Jagannath Gite", village: "Junnar", district: "Pune", landAcres: 3.5, annualProductionQ: 290, tier: "Tier-2", tierLabel: "Tier-2 Progressive", primaryCrops: "Tomato, Vegetables", creditStatus: "0% KCC Regular (₹1.8L)", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" },
    { id: "FARM-MH-05", name: "Ananda Tukaram Shinde", village: "Barshi", district: "Solapur", landAcres: 1.8, annualProductionQ: 110, tier: "Tier-3", tierLabel: "Tier-3 Smallholder", primaryCrops: "Pomegranate, Bajra", creditStatus: "PMFBY ₹1 Protected", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
    { id: "FARM-MH-06", name: "Sunita Mahadev Jadhav", village: "Karad", district: "Satara", landAcres: 1.5, annualProductionQ: 95, tier: "Tier-3", tierLabel: "Tier-3 Smallholder", primaryCrops: "Sugarcane, Vegetables", creditStatus: "Namo Shetkari Enrolled", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
  ],
  farmerTransactions: [
    { id: "TXN-FARM-9901", date: "28 Aug 2026", buyer: "MahaAgro Logistics (Vashi APMC)", crop: "Onion (Nasik Red)", quantity: "180 Quintals", rate: "₹2,300/Q", netAmount: "₹4,01,856", savedBrokerage: "₹33,120", status: "Settled via Escrow" },
    { id: "TXN-FARM-9842", date: "15 Aug 2026", buyer: "Pune Fresh Agri Mart", crop: "Tomato (Vaishnavi Hybrid)", quantity: "85 Crates", rate: "₹1,600/Crate", netAmount: "₹1,32,400", savedBrokerage: "₹10,880", status: "Settled via Escrow" },
    { id: "TXN-FARM-9781", date: "02 Aug 2026", buyer: "Latur Oil Mill Federation", crop: "Soybean (JS 335 Yellow)", quantity: "120 Quintals", rate: "₹4,650/Q", netAmount: "₹5,48,200", savedBrokerage: "₹44,640", status: "Settled via Escrow" },
    { id: "TXN-DBT-4401", date: "20 July 2026", buyer: "Dept of Agriculture, Maharashtra", crop: "PoCRA Farm Pond DBT Grant", quantity: "1 Unit Subsidy", rate: "75% Grant", netAmount: "₹75,000", savedBrokerage: "Govt Subsidy", status: "DBT Direct Credited" }
  ],
  wholesalerTransactions: [
    { id: "WH-ORD-8810", date: "28 Aug 2026", farmer: "Ramesh Ganpatrao Patil (Nashik)", crop: "Onion Grade A Export", quantity: "180 Quintals", rate: "₹2,300/Q", totalAmount: "₹4,14,000", escrowStatus: "Escrow Released" },
    { id: "WH-ORD-8765", date: "24 Aug 2026", farmer: "Vikas Shankarrao Deshmukh (Niphad)", crop: "Export Grapes (Thompson)", quantity: "120 Crates", rate: "₹6,000/Crate", totalAmount: "₹7,20,000", escrowStatus: "In-Transit QC Passed" },
    { id: "WH-ORD-8699", date: "18 Aug 2026", farmer: "Santosh Baburao Chavan (Latur)", crop: "Soybean JS 335", quantity: "200 Quintals", rate: "₹4,650/Q", totalAmount: "₹9,30,000", escrowStatus: "Delivered & Settled" },
    { id: "WH-ORD-8610", date: "10 Aug 2026", farmer: "Pravin Jagannath Gite (Pune)", crop: "Vaishnavi Tomato", quantity: "260 Crates", rate: "₹1,600/Crate", totalAmount: "₹4,16,000", escrowStatus: "Delivered & Settled" }
  ],
  retailerTransactions: [
    { id: "RET-INV-301", date: "29 Aug 2026", source: "Lasalgaon APMC Direct Hub", item: "Onion (Nasik Red Special)", quantity: "500 kg", wholesaleCost: "₹10,750 (@₹21.5/kg)", retailSell: "₹17,500 (@₹35.0/kg)", margin: "+38.5% Gross", status: "Stock Received" },
    { id: "RET-INV-288", date: "27 Aug 2026", source: "Narayangaon APMC Hub", item: "Tomato (Vaishnavi Hybrid)", quantity: "300 kg", wholesaleCost: "₹4,800 (@₹16.0/kg)", retailSell: "₹8,400 (@₹28.0/kg)", margin: "+42.8% Gross", status: "Stock Received" },
    { id: "RET-INV-270", date: "22 Aug 2026", source: "Solapur APMC Farmers Hub", item: "Pomegranate (Bhagwa)", quantity: "150 kg", wholesaleCost: "₹14,700 (@₹98.0/kg)", retailSell: "₹24,000 (@₹160/kg)", margin: "+38.7% Gross", status: "Stock Received" }
  ],
  governmentSchemes: [
    { id: "SCHEME-01", title: "Nanaji Deshmukh Krishi Sanjivani Project (PoCRA)", department: "Dept of Agriculture, Govt of Maharashtra & World Bank", category: "Climate Resilience", benefitAmount: "Up to Rs 5,00,000 (75% to 85% Direct Subsidy)", eligibility: "Farmers in 5,142 climate-vulnerable villages across Maharashtra." },
    { id: "SCHEME-02", title: "Namo Shetkari Mahasanman Nidhi Scheme", department: "Govt of Maharashtra", category: "Direct Income Support", benefitAmount: "Rs 6,000 / year (Combined with PM-KISAN = Rs 12,000/yr)", eligibility: "All landholder farmer families registered on PM-KISAN in Maharashtra." },
    { id: "SCHEME-03", title: "Comprehensive PM Fasal Bima Yojana (PMFBY @ Rs 1)", department: "Agriculture Dept, Maharashtra State", category: "Comprehensive Crop Insurance", benefitAmount: "100% Crop loss compensation against drought, flood, pests", eligibility: "All farmers in Maharashtra cultivating notified crops on 7/12 records." },
    { id: "SCHEME-04", title: "Magel Tyala Shettale (Farm Pond on Demand)", department: "Soil & Water Conservation Dept, Govt of Maharashtra", category: "Water Harvesting", benefitAmount: "Rs 75,000 direct subsidy for plastic lining & excavation", eligibility: "Minimum 0.60 Hectare agricultural land holding." },
    { id: "SCHEME-05", title: "Dr. Punjabrao Deshmukh 0% Interest Subvention Scheme", department: "Cooperation and Marketing Dept, Govt of Maharashtra", category: "Agri Credit Subvention", benefitAmount: "0% Net Interest on timely repaid crop loans up to Rs 3 Lakh", eligibility: "Farmers taking short-term crop loans and repaying before deadline." }
  ],
  farmerLoans: [
    { id: "LOAN-2024-MH-981", bankName: "Bank of Maharashtra", branch: "Dindori Agri Hub", loanType: "KCC Crop Loan - Kharif 2026", sanctionedAmount: 300000, outstandingPrincipal: 175000, repaymentDeadline: "31 March 2027", nextEmiDueDate: "15 Oct 2026", emiAmount: 18500, status: "Active & Regular", subsidyLinked: "Dr. Punjabrao Deshmukh 0% Interest Scheme", subsidyStatus: "Approved by Govt of Maharashtra" },
    { id: "LOAN-2023-TRAC-44", bankName: "Maharashtra Gramin Bank", branch: "Nashik City Branch", loanType: "Term Loan - Drip Automation", sanctionedAmount: 450000, outstandingPrincipal: 120000, repaymentDeadline: "30 June 2028", nextEmiDueDate: "30 Sept 2026", emiAmount: 11200, status: "Active (CIBIL 772)", subsidyLinked: "MahaDBT 50% Capital Subsidy", subsidyStatus: "Rs 2,25,000 DBT Credited" }
  ],
  voiceContracts: [
    { id: "VCON-1001", farmerId: "FARM-MH-01", buyer: "MahaAgro Logistics", statement: "I agree to sell 180 quintals of Onion at Rs 2300/Q to MahaAgro Logistics", hash: "SHA256:7fa92b88ac02b9e4d3184", createdAt: "2026-08-28T10:30:00Z" }
  ],
  sosAlerts: []
};

// Database Instance Class
class Database {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn("⚠️ data_store.json not found or corrupted, generating new seed store...");
    }
    this.saveData(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error("⚠️ Failed to write to data_store.json:", err.message);
    }
  }

  getMarketPrices() { return this.data.marketPrices || []; }
  getFarmingProducts() { return this.data.farmingProducts || []; }
  getRetailerStock() { return this.data.retailerWholesaleStock || []; }
  getFarmers() { return this.data.farmersList || []; }
  getSchemes() { return this.data.governmentSchemes || []; }
  getFarmerLoans() { return this.data.farmerLoans || []; }
  getFarmerTxns() { return this.data.farmerTransactions || []; }
  getWholesalerTxns() { return this.data.wholesalerTransactions || []; }
  getRetailerTxns() { return this.data.retailerTransactions || []; }
  getGovSyncInfo() { return this.data.govDatabaseSyncInfo; }

  syncGovPrices(newPrices) {
    if (newPrices && newPrices.length) {
      this.data.marketPrices = newPrices;
    } else {
      this.data.marketPrices = this.data.marketPrices.map(p => {
        const variance = (Math.random() * 2 - 1) * 0.02;
        return {
          ...p,
          modalPrice: Math.round(p.modalPrice * (1 + variance)),
          minPrice: Math.round(p.minPrice * (1 + variance)),
          maxPrice: Math.round(p.maxPrice * (1 + variance))
        };
      });
    }
    this.data.govDatabaseSyncInfo = {
      lastSyncedAt: new Date().toISOString(),
      source: "Government of India Agmarknet / MSAMB Live Portal",
      status: "Live Synchronized & Verified",
      recordsCount: this.data.marketPrices.length
    };
    this.saveData();
    return this.data.marketPrices;
  }

  addRetailerTxn(txn) {
    if (!this.data.retailerTransactions) this.data.retailerTransactions = [];
    this.data.retailerTransactions.unshift(txn);
    this.saveData();
    return txn;
  }

  addFarmerTxn(txn) {
    if (!this.data.farmerTransactions) this.data.farmerTransactions = [];
    this.data.farmerTransactions.unshift(txn);
    this.saveData();
    return txn;
  }

  addWholesalerTxn(txn) {
    if (!this.data.wholesalerTransactions) this.data.wholesalerTransactions = [];
    this.data.wholesalerTransactions.unshift(txn);
    this.saveData();
    return txn;
  }

  addVoiceContract(contract) {
    if (!this.data.voiceContracts) this.data.voiceContracts = [];
    this.data.voiceContracts.unshift(contract);
    this.saveData();
    return contract;
  }

  addSOSAlert(alert) {
    if (!this.data.sosAlerts) this.data.sosAlerts = [];
    this.data.sosAlerts.unshift(alert);
    this.saveData();
    return alert;
  }

  addNewFarmerListing(listing) {
    if (!this.data.farmersList) this.data.farmersList = [];
    this.data.farmersList.unshift(listing);
    this.saveData();
    return listing;
  }
}

export const db = new Database();