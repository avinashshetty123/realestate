import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, name, phone, type, role, content } = body;

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("realestate");

    if (type === "session_start") {
      await db.collection("chat_sessions").updateOne(
        { sessionId },
        {
          $set: { sessionId, name, phone, updatedAt: new Date() },
          $setOnInsert: { createdAt: new Date(), status: "new", messages: [] },
        },
        { upsert: true }
      );
    } else if (type === "message") {
      await db.collection("chat_sessions").updateOne(
        { sessionId },
        {
          $push: { messages: { role, content, time: new Date() } } as any,
          $set: { updatedAt: new Date(), name, phone },
          $setOnInsert: { createdAt: new Date(), status: "new" },
        },
        { upsert: true }
      );
    }

    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chat session save error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    
    const client = new MongoClient(uri);
    await client.connect();
    
    // If phone is provided, get specific session by phone
    if (phone) {
      const sessionId = `phone_${phone}`;
      const session = await client
        .db("realestate")
        .collection("chat_sessions")
        .findOne({ sessionId });
      await client.close();
      return NextResponse.json({ success: true, session });
    }
    
    // Otherwise, get all sessions
    const sessions = await client
      .db("realestate")
      .collection("chat_sessions")
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();
    await client.close();
    return NextResponse.json({ success: true, sessions });
  } catch (error) {
    console.error("Chat session fetch error:", error);
    return NextResponse.json({ success: false, sessions: [] }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { sessionId, status } = await request.json();
    const client = new MongoClient(uri);
    await client.connect();
    await client
      .db("realestate")
      .collection("chat_sessions")
      .updateOne({ sessionId }, { $set: { status, updatedAt: new Date() } });
    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
