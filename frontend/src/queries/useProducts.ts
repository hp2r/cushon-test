//import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
//import { Product } from '../types/product';

/*
type UpdateUser = {
  id: number;
  user: User;
};

type ResponseType = {
  success: boolean;
  message: string;
}
  */

const fetchProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useProducts = () => {
    //const queryClient = useQueryClient();
    const { data: products, ...queryInfo } = useQuery('products', fetchProducts);
    //const defaultResponse = {success: false, message: ''};
    //const [responseSuccess, setResponseSuccess] = useState<ResponseType>(defaultResponse);

    return { products, ...queryInfo };
};


