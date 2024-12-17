import { Product } from "../models/product.model.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add a product
export const addProduct = async (req, res) => {
  try {
    const { sku, name, price } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        try {
          const optimizedImageBuffer = await sharp(file.buffer)
            .resize({ width: 600, height: 600, fit: "inside" })
            .toFormat("jpeg", { quality: 10 })
            .toBuffer();

          const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
            "base64"
          )}`;
          const cloudResponse = await cloudinary.uploader.upload(fileUri);
          console.log(cloudResponse.secure_url);

          return cloudResponse.secure_url;
        } catch (error) {
          console.error("Image upload error:", error);
          throw new Error("Image upload failed");
        }
      })
    );

    const newProduct = new Product({ sku, name, price, images: imageUrls });
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { sku, name, price } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      images = await Promise.all(
        req.files.map(async (file) => {
          const optimizedImageBuffer = await sharp(file.buffer)
            .resize({ width: 600, height: 600, fit: "inside" })
            .toFormat("jpeg", { quality: 10 })
            .toBuffer();

          const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
            "base64"
          )}`;
          const cloudResponse = await cloudinary.uploader.upload(fileUri);
          return cloudResponse.secure_url;
        })
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { sku, name, price, images: images.length > 0 ? images : undefined },
      { new: true, omitUndefined: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send(err.message);
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
