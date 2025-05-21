// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prefill form if editing an existing product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        image: product.image || ''
      });
    }
  }, [product]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate price to be positive number
  const isValidPrice = (price) => {
    return !isNaN(price) && Number(price) > 0;
  };

  // Handle form submission with async/await and error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!isValidPrice(formData.price)) {
      setError('Price must be a positive number.');
      return;
    }

    setLoading(true);
    try {
      if (product) {
        // Update existing product
        await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${product.id}`,
          {
            ...formData,
            id: product.id
          }
        );
      } else {
        // Create new product with unique id
        await axios.post(
          'https://jsonplaceholder.typicode.com/posts',
          {
            ...formData,
            id: Date.now()
          }
        );
      }
      onSave(); // Notify parent to refresh list or UI
    } catch (err) {
      setError('Failed to save product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form" noValidate>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        disabled={loading}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        min="0"
        step="0.01"
        disabled={loading}
      />
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        disabled={loading}
        pattern="https?://.+"
        title="Please enter a valid URL starting with http:// or https://"
      />
      <button type="submit" disabled={loading}>
        {loading ? (product ? 'Updating...' : 'Adding...') : (product ? 'Update Product' : 'Add Product')}
      </button>
    </form>
  );
};

export default ProductForm;
