// Run with: node seed-knowledge.js
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const KNOWLEDGE = [
  // ── GREETINGS ──────────────────────────────────────────────
  {
    category: "General",
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening", "start"],
    question: "Greeting",
    answer: "Hello! 👋 Welcome to PropVista!\n\nI'm your real estate assistant. I can help you with:\n• 🏠 Residential properties\n• 🏢 Commercial spaces\n• 📈 Investment advisory\n• 📋 Legal documentation\n• 💰 Property valuation\n\nWhat are you looking for today?",
    isActive: true,
  },

  // ── ABOUT ──────────────────────────────────────────────────
  {
    category: "General",
    keywords: ["about", "propvista", "company", "who are you", "tell me about", "background"],
    question: "About PropVista",
    answer: "About PropVista 🏢\n\nWe are India's trusted real estate consultancy, founded in 2008.\n\n📊 Our Numbers:\n• 15+ Years of Experience\n• 5,000+ Properties Listed\n• 2,500+ Happy Families\n• 25+ Cities Covered\n• ₹2,000 Cr+ Projects Delivered\n• 98% Customer Satisfaction\n• 50+ Industry Awards\n\nWe specialize in residential, commercial, and investment properties across all major Indian cities.",
    isActive: true,
  },

  // ── SERVICES ───────────────────────────────────────────────
  {
    category: "Services",
    keywords: ["service", "services", "offer", "provide", "what do you do", "help"],
    question: "What services do you offer?",
    answer: "PropVista offers a full range of real estate services:\n\n🏠 Residential Properties — Apartments, villas, independent houses\n🏢 Commercial Real Estate — Offices, retail, warehouses\n📈 Investment Advisory — High-ROI properties & market analysis\n💰 Property Valuation — Accurate market-rate assessments\n📋 Legal Documentation — Title verification & registration\n🔧 Property Management — Tenant & maintenance management\n\nWhich service interests you most?",
    isActive: true,
  },

  // ── BUYING ─────────────────────────────────────────────────
  {
    category: "Buying",
    keywords: ["buy", "purchase", "buying", "want to buy", "how to buy", "interested in buying", "process"],
    question: "How do I buy a property?",
    answer: "Here's how buying a property with PropVista works:\n\n1️⃣ Free Consultation — Tell us your requirements & budget\n2️⃣ Property Search — We curate options matching your criteria\n3️⃣ Site Visits — We arrange visits with our expert team\n4️⃣ Legal Verification — Complete title & document check\n5️⃣ Smooth Closure — We handle all paperwork & registration\n\nCall us at +91 95957 71672 or use the Contact form to get started!",
    isActive: true,
  },

  // ── SELLING ────────────────────────────────────────────────
  {
    category: "Selling",
    keywords: ["sell", "selling", "list my property", "want to sell", "how to sell", "sale"],
    question: "How do I sell my property?",
    answer: "We'd love to help you sell your property!\n\n✅ Free property valuation\n✅ Professional photography & listing\n✅ Marketing across 50+ platforms\n✅ Verified buyer network\n✅ Legal & documentation support\n✅ Best price negotiation\n\nOur properties typically sell 20% faster than market average.\nContact us at +91 95957 71672 or fill the Contact form!",
    isActive: true,
  },

  // ── RENTING ────────────────────────────────────────────────
  {
    category: "Renting",
    keywords: ["rent", "rental", "lease", "tenant", "renting", "pg", "paying guest"],
    question: "Do you handle rentals?",
    answer: "Yes! PropVista handles both rental and lease properties.\n\n🏠 Residential Rentals — 1BHK to 5BHK across major cities\n🏢 Commercial Leasing — Offices, shops, warehouses\n\nOur property management service includes:\n• Tenant screening & verification\n• Rent collection\n• Maintenance coordination\n• Legal lease agreements\n\nWhat type of rental are you looking for?",
    isActive: true,
  },

  // ── PRICING ────────────────────────────────────────────────
  {
    category: "Pricing",
    keywords: ["price", "cost", "budget", "how much", "rate", "pricing", "afford", "crore", "lakh", "expensive"],
    question: "What are the property prices?",
    answer: "Our property prices vary by location:\n\n📍 Mumbai — ₹1.2 Cr to ₹10 Cr+\n📍 Delhi NCR — ₹80L to ₹5 Cr\n📍 Bangalore — ₹60L to ₹2.5 Cr\n📍 Pune — ₹60L to ₹3 Cr\n📍 Hyderabad — ₹40L to ₹1.8 Cr\n📍 Chennai — ₹50L to ₹2 Cr\n\nWe have options for every budget with flexible payment plans. What's your preferred budget range?",
    isActive: true,
  },

  // ── MUMBAI ─────────────────────────────────────────────────
  {
    category: "Locations",
    keywords: ["mumbai", "bandra", "andheri", "powai", "thane", "navi mumbai", "borivali", "malad"],
    question: "Properties in Mumbai",
    answer: "Mumbai is our specialty! 🏙️\n\nTop areas we cover:\n• Bandra West — Luxury apartments from ₹2.5 Cr\n• Andheri — Mid-range to premium from ₹1.8 Cr\n• Powai — IT hub properties from ₹1.5 Cr\n• Thane — Affordable options from ₹80L\n• Navi Mumbai — Great investment from ₹60L\n\nAll properties are RERA approved. Would you like residential or commercial?",
    isActive: true,
  },

  // ── BANGALORE ──────────────────────────────────────────────
  {
    category: "Locations",
    keywords: ["bangalore", "bengaluru", "whitefield", "electronic city", "koramangala", "hsr", "sarjapur"],
    question: "Properties in Bangalore",
    answer: "Bangalore has excellent opportunities! 💻\n\nTop areas:\n• Whitefield — IT corridor, ₹80L–₹2 Cr\n• Electronic City — Tech hub, ₹60L–₹1.5 Cr\n• Koramangala — Premium, ₹1.5 Cr–₹3 Cr\n• HSR Layout — Trending, ₹1 Cr–₹2.5 Cr\n• Sarjapur Road — Growing, ₹70L–₹1.8 Cr\n\nExcellent ROI potential for IT professionals. Ready-to-move or under-construction?",
    isActive: true,
  },

  // ── DELHI ──────────────────────────────────────────────────
  {
    category: "Locations",
    keywords: ["delhi", "ncr", "gurgaon", "noida", "faridabad", "gurugram", "dwarka"],
    question: "Properties in Delhi NCR",
    answer: "Delhi NCR has premium options! 🏛️\n\nTop areas:\n• Gurgaon/Gurugram — DLF, Cyber City, ₹1.5 Cr–₹5 Cr\n• Noida Sector 62/137 — ₹80L–₹2.5 Cr\n• Greater Noida — Affordable, ₹50L–₹1.5 Cr\n• Faridabad — Budget-friendly, ₹40L–₹1 Cr\n\nGreat metro connectivity throughout. Which area interests you?",
    isActive: true,
  },

  // ── PUNE ───────────────────────────────────────────────────
  {
    category: "Locations",
    keywords: ["pune", "hinjewadi", "baner", "wakad", "kharadi", "hadapsar"],
    question: "Properties in Pune",
    answer: "Pune is a great investment destination! 🌆\n\nTop areas:\n• Hinjewadi — IT hub, ₹80L–₹2 Cr\n• Baner — Premium, ₹1 Cr–₹3 Cr\n• Wakad — Mid-range, ₹70L–₹1.5 Cr\n• Kharadi — Growing IT zone, ₹75L–₹1.8 Cr\n\nPune offers 10–12% annual appreciation. Residential or commercial?",
    isActive: true,
  },

  // ── INVESTMENT ─────────────────────────────────────────────
  {
    category: "Investment",
    keywords: ["invest", "investment", "roi", "return", "appreciation", "portfolio", "profit", "grow"],
    question: "Investment opportunities",
    answer: "Smart investment choice! 📈\n\nOur top investment picks:\n• Pune IT Corridor — 12% annual growth\n• Bangalore Tech Parks — 10% growth\n• Mumbai Suburbs — 8–10% growth\n• Hyderabad HITEC City — 11% growth\n\nWe also offer:\n✅ Pre-launch projects (20–30% appreciation potential)\n✅ Commercial properties (6–10% rental yield)\n✅ Portfolio diversification advisory\n\nWhat's your investment budget?",
    isActive: true,
  },

  // ── HOME LOAN ──────────────────────────────────────────────
  {
    category: "Finance",
    keywords: ["loan", "home loan", "finance", "emi", "bank", "mortgage", "interest", "down payment"],
    question: "Home loan assistance",
    answer: "We assist with home loan guidance! 🏦\n\nOur partner banks offer:\n• Up to 90% financing\n• Interest rates: 8.5–9.5% p.a.\n• Tenure: Up to 30 years\n\nEMI estimate:\n• ₹50L loan → ~₹44,000/month (20 yrs)\n• ₹1 Cr loan → ~₹89,000/month (20 yrs)\n\nRequired documents: Income proof, ID, bank statements (6 months).\nOur relationship managers help with quick approvals!",
    isActive: true,
  },

  // ── LEGAL ──────────────────────────────────────────────────
  {
    category: "Legal",
    keywords: ["legal", "document", "registration", "title", "verification", "rera", "agreement", "deed", "stamp duty"],
    question: "Legal documentation support",
    answer: "Our legal team handles everything! ⚖️\n\nServices include:\n✅ Title deed verification\n✅ RERA compliance check\n✅ Sale agreement drafting\n✅ Property registration\n✅ Encumbrance certificate\n✅ Mutation & khata transfer\n\nAll our listed properties are legally verified and RERA approved. Need help with a specific document?",
    isActive: true,
  },

  // ── COMMERCIAL ─────────────────────────────────────────────
  {
    category: "Commercial",
    keywords: ["commercial", "office", "shop", "retail", "warehouse", "business", "showroom", "co-working"],
    question: "Commercial properties",
    answer: "We have excellent commercial options! 🏢\n\nAvailable types:\n• Office Spaces — ₹50L to ₹5 Cr\n• Retail Shops — ₹30L to ₹2 Cr\n• Warehouses — ₹1 Cr to ₹10 Cr\n• Co-working Spaces — Flexible leasing\n\nExpected rental yields: 6–10% annually\nPrime locations in business districts with high footfall.\nLooking to buy or lease?",
    isActive: true,
  },

  // ── AMENITIES ──────────────────────────────────────────────
  {
    category: "Properties",
    keywords: ["amenities", "facilities", "features", "gym", "pool", "parking", "security", "garden", "elevator"],
    question: "What amenities are available?",
    answer: "Our premium properties come with top amenities! 🏊\n\nStandard:\n• 24/7 Security & CCTV\n• Covered Parking\n• Power Backup\n• Water Supply\n\nPremium:\n• Swimming Pool\n• Gymnasium\n• Clubhouse\n• Children's Play Area\n\nLuxury:\n• Spa & Wellness Center\n• Smart Home Features\n• Concierge Services\n• Tennis Court\n\nWhat amenities are most important to you?",
    isActive: true,
  },

  // ── CONTACT ────────────────────────────────────────────────
  {
    category: "Contact",
    keywords: ["contact", "call", "phone", "email", "reach", "speak", "talk", "meet", "visit", "address", "location"],
    question: "How to contact PropVista?",
    answer: "You can reach us through multiple channels! 📞\n\n📱 Phone/WhatsApp: +91 95957 71672\n📧 Email: info@propvista.in\n🏢 Office: Mumbai, Maharashtra, India\n\n⏰ Business Hours:\n• Mon–Fri: 9:00 AM – 7:00 PM\n• Saturday: 10:00 AM – 5:00 PM\n• Sunday: By Appointment\n\nOr fill the Contact Form on our website for a callback within 24 hours!",
    isActive: true,
  },

  // ── THANK YOU ──────────────────────────────────────────────
  {
    category: "General",
    keywords: ["thank", "thanks", "thank you", "great", "awesome", "helpful", "good", "nice"],
    question: "Thank you",
    answer: "You're most welcome! 😊\n\nI'm always here to help with your property needs. Feel free to ask anything about properties, services, pricing, or locations.\n\nHave a great day and happy house hunting! 🏠",
    isActive: true,
  },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("realestate");
    const col = db.collection("chat_knowledge");

    // Clear existing
    await col.deleteMany({});
    console.log("Cleared existing knowledge base.");

    // Insert new
    const result = await col.insertMany(KNOWLEDGE);
    console.log(`✅ Inserted ${result.insertedCount} knowledge entries.`);
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await client.close();
  }
}

seed();
