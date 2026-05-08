const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: MONGODB_URI environment variable is not set');
  console.error('Please set MONGODB_URI in your .env.local file');
  process.exit(1);
}

const dummyProperties = [
  {
    title: "Luxury Apartment in Downtown",
    description: "Beautiful 3BHK apartment with modern amenities, gym, and swimming pool. Located in the heart of the city with easy access to metro.",
    price: 250000000,
    location: "Mumbai, Bandra",
    type: "residential",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    images: [
      { url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500", public_id: "prop1_1" },
      { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500", public_id: "prop1_2" }
    ],
    amenities: ["Gym", "Swimming Pool", "Parking", "Security", "Garden"],
    status: "active",
    views: 245,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Commercial Space - Prime Location",
    description: "Spacious commercial office space perfect for startups and established businesses. High foot traffic area with excellent visibility.",
    price: 500000000,
    location: "Bangalore, Whitefield",
    type: "commercial",
    bedrooms: 0,
    bathrooms: 2,
    area: 3000,
    images: [
      { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500", public_id: "prop2_1" }
    ],
    amenities: ["Parking", "Security", "Conference Room", "Cafeteria"],
    status: "active",
    views: 189,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Residential Plot - Gated Community",
    description: "Premium residential plot in a gated community with all modern facilities. Perfect for building your dream home.",
    price: 150000000,
    location: "Pune, Hinjewadi",
    type: "plots",
    bedrooms: 0,
    bathrooms: 0,
    area: 2500,
    images: [
      { url: "https://images.unsplash.com/photo-1500382017468-7049fae79e70?q=80&w=500", public_id: "prop3_1" }
    ],
    amenities: ["Gated Community", "Security", "Park", "Water Supply"],
    status: "active",
    views: 156,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Investment Property - High ROI",
    description: "Excellent investment opportunity with guaranteed returns. Located in a rapidly developing area with high appreciation potential.",
    price: 350000000,
    location: "Delhi, Noida",
    type: "investment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=500", public_id: "prop4_1" }
    ],
    amenities: ["Parking", "Security", "Gym", "Community Center"],
    status: "active",
    views: 312,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Modern Villa with Garden",
    description: "Stunning 4BHK villa with spacious garden, modern kitchen, and home theater. Perfect for families looking for luxury living.",
    price: 450000000,
    location: "Hyderabad, Jubilee Hills",
    type: "residential",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    images: [
      { url: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?q=80&w=500", public_id: "prop5_1" },
      { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500", public_id: "prop5_2" }
    ],
    amenities: ["Garden", "Home Theater", "Parking", "Security", "Gym"],
    status: "active",
    views: 428,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Cozy Studio Apartment",
    description: "Compact and affordable studio apartment ideal for young professionals. Fully furnished with modern amenities.",
    price: 80000000,
    location: "Bangalore, Koramangala",
    type: "residential",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    images: [
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500", public_id: "prop6_1" }
    ],
    amenities: ["Parking", "Security", "WiFi"],
    status: "active",
    views: 567,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Retail Shop - High Traffic Area",
    description: "Prime retail space in a busy shopping district. Ideal for retail businesses with excellent customer footfall.",
    price: 200000000,
    location: "Chennai, T. Nagar",
    type: "commercial",
    bedrooms: 0,
    bathrooms: 1,
    area: 800,
    images: [
      { url: "https://images.unsplash.com/photo-1441984904556-0ac8d9c0fb81?q=80&w=500", public_id: "prop7_1" }
    ],
    amenities: ["Parking", "Security", "Display Area"],
    status: "active",
    views: 234,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Agricultural Land - Investment Ready",
    description: "Large agricultural plot with irrigation facilities. Great for farming or future commercial development.",
    price: 50000000,
    location: "Nashik, Sinnar",
    type: "plots",
    bedrooms: 0,
    bathrooms: 0,
    area: 5000,
    images: [
      { url: "https://images.unsplash.com/photo-1500382017468-7049fae79e70?q=80&w=500", public_id: "prop8_1" }
    ],
    amenities: ["Irrigation", "Road Access", "Water Supply"],
    status: "active",
    views: 89,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedData() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    // Clear existing properties
    await collection.deleteMany({});
    
    // Insert dummy properties
    const result = await collection.insertMany(dummyProperties);
    console.log(`✓ Successfully inserted ${Object.keys(result.insertedIds).length} properties`);
    
    // Also insert some dummy contacts
    const contactsCollection = db.collection('contacts');
    const dummyContacts = [
      {
        name: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        phone: "+91 95957 71672",
        message: "Interested in luxury apartments in Mumbai. Looking for 3BHK with good amenities.",
        propertyType: "residential",
        status: "new",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        name: "Priya Patel",
        email: "priya.patel@email.com",
        phone: "+91 95957 71673",
        message: "Need commercial space for my startup in Bangalore. Budget around 2-3 crores.",
        propertyType: "commercial",
        status: "contacted",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        name: "Amit Kumar",
        email: "amit.kumar@email.com",
        phone: "+91 95957 71674",
        message: "Looking for investment properties with good ROI. Please share available options.",
        propertyType: "investment",
        status: "new",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];
    
    await contactsCollection.deleteMany({});
    const contactResult = await contactsCollection.insertMany(dummyContacts);
    console.log(`✓ Successfully inserted ${Object.keys(contactResult.insertedIds).length} contacts`);
    
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedData();
