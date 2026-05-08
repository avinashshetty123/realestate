import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('contacts');
    
    const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray();
    await client.close();
    
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { contactId, status } = await request.json();
    
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('realestate');
    const collection = db.collection('contacts');

    await collection.updateOne(
      { _id: new ObjectId(contactId) },
      { $set: { status, updatedAt: new Date() } }
    );
    
    await client.close();
    
    return NextResponse.json({ success: true, message: 'Contact status updated' });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ success: false, message: 'Failed to update contact' }, { status: 500 });
  }
}
