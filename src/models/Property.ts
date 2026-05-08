import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    priceLabel: { type: String },
    type: { type: String, enum: ["residential", "commercial", "land", "industrial"], required: true },
    status: { type: String, enum: ["for-sale", "for-rent", "sold"], default: "for-sale" },
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    sqft: { type: Number },
    images: [{ type: String }],
    isPremium: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    features: [{ type: String }],
    agent: {
      name: String,
      phone: String,
      email: String,
      avatar: String,
    },
  },
  { timestamps: true }
);

export const Property = models.Property || model("Property", PropertySchema);
