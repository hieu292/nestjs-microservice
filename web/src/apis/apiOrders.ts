import axios from 'axios';

export interface OrderEntity {
  id: string;
  amount: number;
  productId: number;
  userId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  productId: number;
  amount: number;
}

const baseUrl = `${process.env.REACT_APP_ORDER_API}`;

export const getOrders = async (page = 1, perPage = 10) => {
  const res = await axios.get(`${baseUrl}/orders?page=${page}&perPage=${perPage}`);
  return {
    data: res.data,
    headers: res.headers,
  };
};

export const getOrder = async (id: string) => {
  const res = await axios.get(`${baseUrl}/orders/${id}`);
  return res.data;
};

export const cancelOrder = async (id: string) => {
  const res = await axios.patch(`${baseUrl}/orders/${id}/cancel`);
  return res.data;
};

export const createOrder = async (dto: CreateOrderDto) => {
  const res = await axios.post(`${baseUrl}/orders`, dto);
  return res.data;
};
