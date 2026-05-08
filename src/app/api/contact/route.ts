import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, propertyType } = body;

    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('contacts');
    
    const contactData = {
      name,
      email,
      phone,
      message,
      propertyType,
      createdAt: new Date(),
      status: 'new'
    };
    
    await collection.insertOne(contactData);
    await client.close();
    
    return NextResponse.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit form' }, { status: 500 });
  }
}
