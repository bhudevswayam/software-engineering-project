import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const tenantId = localStorage.getItem("x-tenant-id") || "";

// ✅ Token + Tenant Header
const getTokenHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "x-tenant-id": tenantId,
  },
});

// ==============================
// 🔹 Create Booking (User)
// ==============================
export const createBooking = async (data) => {
  const res = await axios.post(`${BASE_URL}/bookings`, data, getTokenHeader());
  return res.data;
};

// ==============================
// 🔹 Get All Bookings (User / Business / Admin)
// ==============================
export const getAllBookings = async () => {
  const res = await axios.get(`${BASE_URL}/bookings`, getTokenHeader());
  return res.data;
};

// ==============================
// 🔹 Update Booking Status (Business/Admin/Superadmin)
// ==============================
export const updateBookingStatus = async (id, status) => {
  const res = await axios.put(
    `${BASE_URL}/bookings/${id}/status`,
    { status },
    getTokenHeader()
  );
  return res.data;
};

// ==============================
// 🔹 Get Bookings by Business ID (Optional)
// ==============================
export const getBookingsByBusiness = async (businessId) => {
  const res = await axios.get(
    `${BASE_URL}/bookings?business=${businessId}`,
    getTokenHeader()
  );
  return res.data;
};

// ==============================
// 🔹 Get Bookings by User (Optional)
// ==============================
export const getBookingsByUser = async (userId) => {
  const res = await axios.get(
    `${BASE_URL}/bookings?user=${userId}`,
    getTokenHeader()
  );
  return res.data;
};
