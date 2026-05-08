import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { deleteFromCloudinary } from '@/lib/cloudinary';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const budget = searchParams.get('budget');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('realestate');
    const collection = db.collection('properties');

    const filter: Record<string, unknown> = { status: 'active' };

    if (location && location !== '') {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (type && type !== '') {
      filter.type = type;
    }

    if (budget && budget !== '') {
      const [min, max] = budget.split('-');
      if (max === '+') {
        filter.price = { $gte: parseInt(min) * 10000000 };
      } else {
        filter.price = {
          $gte: parseInt(min) * 10000000,
          $lte: parseInt(max) * 10000000,
        };
      }
    }

    const skip = (page - 1) * limit;

    const properties = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(filter);

    await client.close();

    return NextResponse.json({
      success: true,
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const propertyData = await request.json();
    
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    const newProperty = {
      ...propertyData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
      views: 0
    };
    
    const result = await collection.insertOne(newProperty);
    await client.close();
    
    return NextResponse.json({ success: true, propertyId: result.insertedId });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ success: false, message: 'Failed to create property' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { propertyId, ...updateData } = await request.json();
    
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    await collection.updateOne(
      { _id: new ObjectId(propertyId) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    await client.close();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ success: false, message: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('id');
    
    if (!propertyId) {
      return NextResponse.json({ success: false, message: 'Property ID required' }, { status: 400 });
    }
    
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('realestate');
    const collection = db.collection('properties');
    
    const property = await collection.findOne({ _id: new ObjectId(propertyId) });
    
    if (property && property.images) {
      for (const image of property.images) {
        if (image.public_id) {
          await deleteFromCloudinary(image.public_id);
        }
      }
    }
    
    await collection.deleteOne({ _id: new ObjectId(propertyId) });
    await client.close();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete property' }, { status: 500 });
  }
}
