import mongoose, { Schema, model, models } from "mongoose";

const ChatKnowledgeSchema = new Schema(
  {
    category: { type: String, required: true, trim: true },
    keywords: [{ type: String, trim: true, lowercase: true }],
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ChatKnowledge =
  models.ChatKnowledge || model("ChatKnowledge", ChatKnowledgeSchema);
