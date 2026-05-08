import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const propertiesCollection = db.collection('properties');
    const contactsCollection = db.collection('contacts');
    
    let response = '';
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('properties') || lowerMessage.includes('available') || lowerMessage.includes('listings')) {
      const properties = await propertiesCollection.find({ status: 'active' }).limit(5).toArray();
      
      if (properties.length > 0) {
        response = `I found ${properties.length} available properties for you:\n\n`;
        properties.forEach((prop, index) => {
          const priceInCrores = (prop.price / 10000000).toFixed(1);
          response += `${index + 1}. ${prop.title}\n`;
          response += `   📍 Location: ${prop.location}\n`;
          response += `   💰 Price: ₹${priceInCrores} Cr\n`;
          response += `   🏠 Type: ${prop.type}\n`;
          response += `   📐 Area: ${prop.area} sq ft\n`;
          if (prop.bedrooms > 0) response += `   🛏️ Bedrooms: ${prop.bedrooms}\n`;
          response += `\n`;
        });
        response += `For more details or to schedule a visit, call +91 95957 71672`;
      } else {
        response = "I don't have any active properties in our database right now. Please contact our team at +91 95957 71672 for the latest listings.";
      }
    }
    
    else if (lowerMessage.includes('mumbai') || lowerMessage.includes('bandra') || lowerMessage.includes('andheri')) {
      const mumbaiProperties = await propertiesCollection.find({ 
        location: { $regex: 'mumbai|bandra|andheri', $options: 'i' },
        status: 'active'
      }).toArray();
      
      if (mumbaiProperties.length > 0) {
        response = `Found ${mumbaiProperties.length} properties in Mumbai:\n\n`;
        mumbaiProperties.forEach((prop, index) => {
          const priceInCrores = (prop.price / 10000000).toFixed(1);
          response += `${index + 1}. ${prop.title} - ₹${priceInCrores} Cr\n`;
          response += `   📍 ${prop.location} | ${prop.area} sq ft\n\n`;
        });
      } else {
        response = "Currently no active listings in Mumbai. Our team is constantly updating inventory. Call +91 95957 71672 for latest Mumbai properties.";
      }
    }
    
    else if (lowerMessage.includes('bangalore') || lowerMessage.includes('bengaluru') || lowerMessage.includes('whitefield')) {
      const bangaloreProperties = await propertiesCollection.find({ 
        location: { $regex: 'bangalore|bengaluru|whitefield', $options: 'i' },
        status: 'active'
      }).toArray();
      
      if (bangaloreProperties.length > 0) {
        response = `Found ${bangaloreProperties.length} properties in Bangalore:\n\n`;
        bangaloreProperties.forEach((prop, index) => {
          const priceInCrores = (prop.price / 10000000).toFixed(1);
          response += `${index + 1}. ${prop.title} - ₹${priceInCrores} Cr\n`;
          response += `   📍 ${prop.location} | ${prop.area} sq ft\n\n`;
        });
      } else {
        response = "Currently no active listings in Bangalore. Call +91 95957 71672 for latest Bangalore properties.";
      }
    }
    
    else if (lowerMessage.includes('pune') || lowerMessage.includes('hinjewadi')) {
      const puneProperties = await propertiesCollection.find({ 
        location: { $regex: 'pune|hinjewadi', $options: 'i' },
        status: 'active'
      }).toArray();
      
      if (puneProperties.length > 0) {
        response = `Found ${puneProperties.length} properties in Pune:\n\n`;
        puneProperties.forEach((prop, index) => {
          const priceInCrores = (prop.price / 10000000).toFixed(1);
          response += `${index + 1}. ${prop.title} - ₹${priceInCrores} Cr\n`;
          response += `   📍 ${prop.location} | ${prop.area} sq ft\n\n`;
        });
      } else {
        response = "Currently no active listings in Pune. Call +91 95957 71672 for latest Pune properties.";
      }
    }
    
    else if (lowerMessage.includes('residential') || lowerMessage.includes('apartment') || lowerMessage.includes('flat')) {
      const residentialProperties = await propertiesCollection.find({ 
        type: 'residential',
        status: 'active'
      }).limit(3).toArray();
      
      if (residentialProperties.length > 0) {
        response = `Here are our top residential properties:\n\n`;
        residentialProperties.forEach((prop, index) => {
          const priceInCrores = (prop.price / 10000000).toFixed(1);
          response += `${index + 1}. ${prop.title}\n`;
          response += `   📍 ${prop.location} | ₹${priceInCrores} Cr\n`;
          response += `   🛏️ ${prop.bedrooms}BHK | ${prop.area} sq ft\n`;
          response += `   ✨ Amenities: ${prop.amenities.slice(0, 3).join(', ')}\n\n`;
        });
      } else {
        response = "No residential properties currently available. Contact +91 95957 71672 for upcoming residential projects.";
      }
    }
    
    else if (lowerMessage.includes('commercial') || lowerMessage.includes('office') || lowerMessage.includes('shop')) {
      const commercialProperties = await propertiesCollection.find({ 
        type: 'commercial',
        status: 'active'
      }).limit(3).toArray();
      
      if (commercialProperties.length > 0) {
        response = `Here are our commercial properties:\n\n`;
        commercialProperties.forEach((prop, index) => {
          const priceInCrores = (prop.price / 10000000).toFixed(1);
          response += `${index + 1}. ${prop.title}\n`;
          response += `   📍 ${prop.location} | ₹${priceInCrores} Cr\n`;
          response += `   📐 ${prop.area} sq ft\n`;
          response += `   ✨ Features: ${prop.amenities.slice(0, 3).join(', ')}\n\n`;
        });
      } else {
        response = "No commercial properties currently available. Contact +91 95957 71672 for commercial space requirements.";
      }
    }
    
    else if (lowerMessage.includes('budget') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      const allProperties = await propertiesCollection.find({ status: 'active' }).toArray();
      
      if (allProperties.length > 0) {
        const priceRanges = {
          'Under ₹1 Cr': allProperties.filter(p => p.price < 10000000).length,
          '₹1-2 Cr': allProperties.filter(p => p.price >= 10000000 && p.price < 20000000).length,
          '₹2-5 Cr': allProperties.filter(p => p.price >= 20000000 && p.price < 50000000).length,
          'Above ₹5 Cr': allProperties.filter(p => p.price >= 50000000).length
        };
        
        response = `Here's our property distribution by price range:\n\n`;
        Object.entries(priceRanges).forEach(([range, count]) => {
          if (count > 0) {
            response += `💰 ${range}: ${count} properties\n`;
          }
        });
        response += `\nCall +91 95957 71672 to discuss your specific budget requirements.`;
      }
    }
    
    else if (lowerMessage.includes('stats') || lowerMessage.includes('statistics') || lowerMessage.includes('total')) {
      const totalProperties = await propertiesCollection.countDocuments({ status: 'active' });
      const totalContacts = await contactsCollection.countDocuments();
      const propertyTypes = await propertiesCollection.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]).toArray();
      
      response = `📊 PropVista Statistics:\n\n`;
      response += `🏠 Total Active Properties: ${totalProperties}\n`;
      response += `📞 Customer Inquiries: ${totalContacts}\n\n`;
      response += `Property Breakdown:\n`;
      propertyTypes.forEach(type => {
        response += `• ${type._id}: ${type.count} properties\n`;
      });
      response += `\n✨ 15+ Years Experience | 98% Customer Satisfaction`;
    }
    
    else {
      const totalProperties = await propertiesCollection.countDocuments({ status: 'active' });
      response = `Welcome to PropVista! 🏠 We currently have ${totalProperties} active properties across Mumbai, Bangalore, Pune, Delhi, Chennai, and Hyderabad.\n\n`;
      response += `I can help you with:\n`;
      response += `🔍 Property searches by location\n`;
      response += `💰 Budget-based recommendations\n`;
      response += `🏠 Residential, Commercial, Investment properties\n`;
      response += `📊 Market statistics and trends\n\n`;
      response += `Try asking: "Show me properties in Mumbai" or "What's available under 2 crores?"\n\n`;
      response += `📞 For immediate assistance: +91 95957 71672`;
    }
    
    await client.close();
    
    return NextResponse.json({ 
      success: true, 
      response: response,
      hasDbAccess: true 
    });
    
  } catch (error) {
    console.error('AI Assistant API Error:', error);
    return NextResponse.json({ 
      success: false, 
      response: "I'm having trouble accessing our property database right now. Please call +91 95957 71672 for immediate assistance with your property needs.",
      hasDbAccess: false 
    }, { status: 500 });
  }
}
