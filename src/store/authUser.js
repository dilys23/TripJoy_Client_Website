import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  userVerify: null,
  isRegister: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isVerifyAccount: false,
  register: async (credentials) => {
    set({ isRegister: true });
    try {
      const response = await axios.post(
        "https://localhost:7100/api/v1/Account/register",
        credentials,
      );
      set({ user: response.data, isRegister: false, isVerifyAccount: true });

      toast.success("Đăng kí thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng kí thất bại");
      set({ isRegister: false, user: null });
    }
  },
  verifyAccount: async (credentials) => {
    try {
      const response = await axios.post(
        credentials?.verifyUrl,
        { otp: credentials?.otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status === "success") {
        set({ isVerifyAccount: false });
        console.log(response.data);
        set({ userVerify: response.data?.user });

        toast.success("Xác thực tài khoản thành công!");
      } else {
        toast.error("Xác thực tài khoản thất bại!");
      }
    } catch (error) {
      console.log(error);
      // Handle error (optional: update state or show notification)
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      console.log(response);
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");

      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
  updateProfile: async (credentials) => {
    try {
      const response = await axios.put(
        "/api/v1/auth/updateProfile",
        credentials,
      );
      set({ user: response.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Profile update failed");
    }
  },
}));
