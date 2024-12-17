import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '../api';


const ProductForm = ({ existingProduct, onFormClose  }) => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 



  // Prepopulate form if editing an existing product
  useEffect(() => {
    if (existingProduct) {
      setSku(existingProduct.sku);
      setName(existingProduct.name);
      setPrice(existingProduct.price);
      setPreviewImages(existingProduct.images);
    }
  }, [existingProduct]);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
  
    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });
  
    setImages(validFiles);
  
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('sku', sku);
    formData.append('name', name);
    formData.append('price', price);
    images.forEach((image) => formData.append('images', image));

    try {
      if (existingProduct) {
        await updateProduct(existingProduct._id, formData);
      } else {
        await addProduct(formData);        
      }
      onFormClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{existingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2 mt-2">
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt="Preview" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : existingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
