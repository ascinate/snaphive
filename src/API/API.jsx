
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.182:4000/api/auth",
});

export const registerUser = (data) => api.post("/register", data);
export const verifyOtp = (data) => api.post("/verify-otp", data);
export const resendOtp = (data) => api.post("/resend-otp", data);
export const loginUser = (data) => api.post("/login", data);

export default api;
