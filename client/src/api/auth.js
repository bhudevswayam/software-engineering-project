// src/api/auth.js
import axios from "axios";

const BASE_URL = "http://localhost:4000/api"; // backend base URL

// -------- AUTH APIS --------
export const register = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data, {
  });
  return res.data;
};

export const registerBusiness = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/register-business`, data, {
  });
  return res.data;
}

export const login = async (data) => {    
  const res = await axios.post(`${BASE_URL}/auth/login`, data, {
  });
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${BASE_URL}/users/profile`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "x-tenant-id": localStorage.getItem("tenantId") || "",
    },
  });
  return res.data;
};
