import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const tenantId = localStorage.getItem("tenantId") || "2";

const getTokenHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "x-tenant-id": tenantId,
  },
});

export const fetchUserProfile = async () => {
  const res = await axios.get(`${BASE_URL}/users/profile`, getTokenHeader());
  return res.data;
};

export const updateUserProfile = async (data) => {
  const res = await axios.put(`${BASE_URL}/users/profile`, data, getTokenHeader());
  return res.data;
};

export const deleteUserProfile = async () => {
  const res = await axios.delete(`${BASE_URL}/users/profile`, getTokenHeader());
  return res.data;
};
