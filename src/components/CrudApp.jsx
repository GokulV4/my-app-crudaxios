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

    const url = product
      ? `https://jsonplaceholder.typicode.com/posts/${product.id}`
      : 'https://jsonplaceholder.typicode.com/posts';

    const method = product ? axios.put : axios.post;
    const payload = product
      ? { ...formData, id: product.id }
      : { ...formData, id: Date.now() };

    method(url, payload)
      .then(() => onSave())
      .catch(error => console.error("Error saving product:", error));
  };

  return (
    <>
      <style>{`
        .product-form {
          background: #fff;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 90%;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          animation: fadeIn 0.6s ease;
          box-sizing: border-box;
        }

        .product-form input {
          padding: 1rem 1.2rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 1.1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .product-form input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
        }

        .product-form button {
          padding: 1.2rem;
          font-size: 1.1rem;
          border: none;
          border-radius: 10px;
          background: linear-gradient(to right, #2563eb, #3b82f6);
          color: white;
          cursor: pointer;
          font-weight: 700;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          width: 100%;
          box-sizing: border-box;
          user-select: none;
        }

        .product-form button:hover,
        .product-form button:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.5);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* For smaller devices */
        @media (max-width: 480px) {
          .product-form {
            padding: 1.5rem 1rem;
            max-width: 100%;
          }

          .product-form input,
          .product-form button {
            font-size: 1rem;
            padding: 1rem;
          }
        }
      `}</style>

      <form onSubmit={handleSubmit} className="product-form" noValidate>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          aria-label="Product Name"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          aria-label="Product Price"
          min="0"
          step="0.01"
        />
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          aria-label="Image URL"
        />
        <button type="submit">
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </>
  );
};

export default ProductForm;
