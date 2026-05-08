import { Schema, model, models } from "mongoose";

const VisitorSchema = new Schema({
  date: { type: String, required: true, unique: true }, // "YYYY-MM"
  count: { type: Number, default: 0 },
});

export const Visitor = models.Visitor || model("Visitor", VisitorSchema);
