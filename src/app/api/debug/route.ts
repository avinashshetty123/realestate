import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;
  try {
    console.log('Testing MongoDB connection...');
    
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    const count = await collection.countDocuments();
    const properties = await collection.find({}).limit(5).toArray();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      totalProperties: count,
      sampleProperties: properties,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      error: errorMessage,
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
