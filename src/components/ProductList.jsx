// src/components/ProductList.jsx
import React from 'react';
import axios from 'axios';

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => onDelete(id))
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => onEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
