import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    const count = await collection.countDocuments();
    const properties = await collection.find({}).project({ _id: 1, title: 1, views: 1 }).toArray();
    
    return NextResponse.json({
      success: true,
      totalCount: count,
      properties: properties.map(p => ({
        id: p._id.toString(),
        title: p.title,
        views: p.views
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
