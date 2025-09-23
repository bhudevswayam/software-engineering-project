import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const tenantId = localStorage.getItem("tenantId") || "";

const getTokenHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "x-tenant-id": localStorage.getItem("tenantId") || "",
  },
});


// Get all businesses with optional search/filter
export const getBusinesses = async (search = "") => {
  const res = await axios.get(`${BASE_URL}/business${search ? `?search=${search}` : ""}`, getTokenHeader());
  return res.data;
};

// Get a business by ID
export const getBusinessById = async (id) => {
  const res = await axios.get(`${BASE_URL}/business/${id}`, getTokenHeader());
  return res.data;
};

// Update a business
export const updateBusiness = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/business/${id}`, data, getTokenHeader());
  return res.data;
};

// Delete a business
export const deleteBusiness = async (id) => {
  const res = await axios.delete(`${BASE_URL}/business/${id}`, getTokenHeader());
  return res.data;
};

// Bulk delete businesses by array of IDs
export const bulkDeleteBusinesses = async (ids) => {
  const res = await axios.delete(`${BASE_URL}/business`, {
    ...getTokenHeader(),
    data: { ids }, // axios requires `data` field for DELETE body
  });
  return res.data;
};
