import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: "http://localhost:8000/api", // Backend
  timeout: 10 * 1000, // Set the timeout globally
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd");
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error.response?.data || error.message;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error.response?.data || error.message;
  }
};

export const createUser = async (email, token) => {
  try {
    const response = await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Optional: if backend returns data
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error.response?.data || error.message;
  }
};

export const bookVisit = async (value, propertyId, email, token) => {
  try {
    const response = await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(value).format('DD/MM/YYYY'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Optional: if backend returns data
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error.response?.data || error.message;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    const response = await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Optional: if backend returns data
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error.response?.data || error.message;
  }
};
