import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

const mongoOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let client: MongoClient | null = null;
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid property ID format' }, { status: 400 });
    }
    
    client = new MongoClient(uri, mongoOptions);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    // Update views using simple syntax
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $inc: { views: 1 },
        $set: { updatedAt: new Date() }
      }
    );
    
    // Fetch the updated property
    const property = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    property.views = Number(property.views) || 0;
    
    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error('Error fetching property:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch property',
      error: errorMessage 
    }, { status: 500 });
  } finally {
    if (client) {
      try {
        await client.close();
      } catch (closeError) {
        console.error('Error closing MongoDB connection:', closeError);
      }
    }
  }
}
