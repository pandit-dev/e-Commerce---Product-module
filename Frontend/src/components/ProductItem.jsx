import React from "react";

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold mb-2">{product.name}</h3>

      {/* Check if images exist and render them */}
      {product.images && product.images.length > 0 ? (
        <div className="flex gap-2 mb-2">
          {product.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Product ${index}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}

      <p>SKU: {product.sku}</p>
      <p>Price: ${product.price}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
