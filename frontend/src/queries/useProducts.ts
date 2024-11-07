import { useQuery } from 'react-query';

const fetchProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useProducts = () => {
    const { data: products, ...queryInfo } = useQuery('products', fetchProducts);

    return { products, ...queryInfo };
};


