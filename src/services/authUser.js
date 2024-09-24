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

}));
