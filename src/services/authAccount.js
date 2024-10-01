import axios from "axios";
import toast from "react-hot-toast";
import api from "../utils/httpRequest";
// Hàm đăng ký
export const register1 = async (credentials) => {
  try {
    const response = await api.post("http://localhost:7100/api/v1/Account/register-with-otp", credentials);
    toast.success("Đăng kí thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Đăng kí thất bại");
    throw error;
  }
};
export const sendOTP = async (credentials) => {
  try {
    // const response = await api.post("http://localhost:7100/api/v1/Account/send-otp-verify-email", credentials);
    const response = await api.post("/Account/send-otp-verify-email", credentials);

    toast.success("OTP đã gửi về email của bạn");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "OTP gửi không thành công");
    throw error;
  }
};
// Hàm đăng nhập
export const login = async (email, password) => {
  try {
    const response = await api.post("Account/login", { email, password });
    toast.success("Đăng nhập thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    throw error;
  }
};

// Hàm xác thực tài khoản
export const verifyAccount = async (credentials) => {
  try {
    const response = await api.post(credentials.verifyUrl, {
      otp: credentials.otp,
    });
    if (response.data.status === "success") {
      toast.success("Xác thực tài khoản thành công!");
      return response.data.user;
    } else {
      toast.error("Xác thực tài khoản thất bại!");
      throw new Error("Xác thực thất bại");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
