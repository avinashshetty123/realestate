import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

const NO_ANSWER_REPLY =
  "Currently we don't have an answer to your query. Our team will reach out to you shortly. Sorry for the inconvenience! 🙏\n\nYou can also contact us directly:\n📱 +91 95957 71672\n📧 info@propvista.in";

async function findAnswer(userMessage: string): Promise<string | null> {
  const lower = userMessage.toLowerCase().trim();

  const client = new MongoClient(uri);
  await client.connect();
  const entries = await client
    .db("realestate")
    .collection("chat_knowledge")
    .find({ isActive: true })
    .toArray();
  await client.close();

  let bestMatch: { score: number; answer: string } | null = null;

  for (const entry of entries) {
    let score = 0;

    // Match keywords
    for (const kw of entry.keywords ?? []) {
      if (lower.includes(kw.toLowerCase())) score += 2;
    }

    // Match words from the question field
    const qWords = (entry.question as string)
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3);
    for (const word of qWords) {
      if (lower.includes(word)) score += 1;
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { score, answer: entry.answer };
    }
  }

  return bestMatch ? bestMatch.answer : null;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const { allowed, remaining, resetIn } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before sending another message.", resetIn },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  let body: { messages: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMsg) {
    return NextResponse.json({ error: "No user message found" }, { status: 400 });
  }

  try {
    const answer = await findAnswer(lastUserMsg.content);
    const reply = answer ?? NO_ANSWER_REPLY;
    return NextResponse.json(
      { reply },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { reply: NO_ANSWER_REPLY },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  }
}
