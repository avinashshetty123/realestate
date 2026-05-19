import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Visitor } from "@/models/Visitor";

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function GET() {
  await connectDB();
  const month = currentMonth();
  const doc = await Visitor.findOne({ date: month });
  return NextResponse.json({ count: doc?.count ?? 0, month });
}

export async function POST() {
  await connectDB();
  const month = currentMonth();
  const doc = await Visitor.findOneAndUpdate(
    { date: month },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  return NextResponse.json({ count: doc.count, month });
}
