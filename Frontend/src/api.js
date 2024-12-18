import axios from 'axios';

const API_URL = 'https://e-commerce-product-module.onrender.com/api/v2/products';

export const getProducts = () => axios.get(API_URL);
export const addProduct = (data) => axios.post(`${API_URL}/addproduct`, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/delete/${id}`);
