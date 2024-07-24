import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const fetchToken = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/token', {
        grant_type: 'password',
        client_id: '9_5wpj3yfras8wsss4g0w4gggckw8ks0w8ckw8sc4wgckskc8g0k',
        client_secret: '4ckw9u5y73qcssg4gscwsgos4ws00kog88g08gkc4sw8kcgk0s',
        username: 'akeneo_react_4246',
        password: '66a6b6fe0',
      });
      setToken(response.data.access_token);
      const expirationTime = new Date(Date.now() + response.data.expires_in * 1000);
      setTokenExpiration(expirationTime);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useEffect(() => {
    if (!token || !tokenExpiration || new Date() >= tokenExpiration) {
      fetchToken();
    }
  }, [token, tokenExpiration]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/rest/v1/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(response.data._embedded.items);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.uuid}>{product.values.name[0].data}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
