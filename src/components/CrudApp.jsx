// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      // If we are editing, pre-fill the form with the product data
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product) {
      // Update the product
      axios.put(`https://jsonplaceholder.typicode.com/posts/${product.id}`, {
        ...formData,
        id: product.id
      })
      .then(() => onSave()) // Refresh the list after saving
      .catch(error => console.error("Error updating product:", error));
    } else {
      // Create a new product
      axios.post('https://jsonplaceholder.typicode.com/posts', {
        ...formData,
        id: Date.now() // Use a unique ID for the new product
      })
      .then(() => onSave()) // Refresh the list after saving
      .catch(error => console.error("Error creating product:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">
        {product ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
