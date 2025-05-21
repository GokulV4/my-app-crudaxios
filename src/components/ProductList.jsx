// src/components/ProductList.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setError(null);
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setLoadingId(id);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      onDelete(id);
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error('Error deleting product:', err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="product-list">
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: 12 }}>
          {error}
        </div>
      )}
      {products.length === 0 && <p>No products available.</p>}
      {products.map(product => (
        <div key={product.id} className="product-item" style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <img
            src={product.image || 'https://via.placeholder.com/150'}
            alt={product.name}
            style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{product.name}</h3>
            <p style={{ margin: '0 0 12px 0' }}>${product.price}</p>
            <button
              onClick={() => onEdit(product)}
              disabled={loadingId === product.id}
              style={{ marginRight: 8 }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              disabled={loadingId === product.id}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              {loadingId === product.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
