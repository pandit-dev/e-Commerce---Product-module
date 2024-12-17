import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true }, 
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
}, { timestamps: true });
export const Product = mongoose.model("Product",productSchema);