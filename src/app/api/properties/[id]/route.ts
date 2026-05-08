import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = id;
    
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    const property = await collection.findOneAndUpdate(
      { _id: new ObjectId(propertyId) },
      { $inc: { views: 1 } },
      { returnDocument: 'after' }
    );
    
    await client.close();
    
    if (!property || !property.value) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, property: property.value });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch property' }, { status: 500 });
  }
}
