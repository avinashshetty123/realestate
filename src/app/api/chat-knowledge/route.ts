import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const entries = await client
      .db("realestate")
      .collection("chat_knowledge")
      .find({})
      .sort({ category: 1, createdAt: -1 })
      .toArray();
    await client.close();
    return NextResponse.json({ success: true, entries });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch knowledge base" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, keywords, question, answer } = body;

    if (!category || !question || !answer) {
      return NextResponse.json({ success: false, message: "category, question and answer are required" }, { status: 400 });
    }

    const keywordsArray = Array.isArray(keywords)
      ? keywords
      : String(keywords).split(",").map((k: string) => k.trim().toLowerCase()).filter(Boolean);

    const client = new MongoClient(uri);
    await client.connect();
    const result = await client.db("realestate").collection("chat_knowledge").insertOne({
      category,
      keywords: keywordsArray,
      question,
      answer,
      isActive: true,
      createdAt: new Date(),
    });
    await client.close();

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create entry" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

    const client = new MongoClient(uri);
    await client.connect();
    await client.db("realestate").collection("chat_knowledge").deleteOne({ _id: new ObjectId(id) });
    await client.close();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete entry" }, { status: 500 });
  }
}
