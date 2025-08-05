import { create } from "zustand";
import axios from "axios";

const API_URL = "https://api-kebbi-government-profile.onrender.com/api/auth";
// const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  users: [],

  signup: async ({
    name,
    email,
    password,
    phone,
    bankName,
    bankAccountNumber,
    gender,
    state,
    lga,
    pollingUnit,
    role, // include role if needed
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
        phone,
        bankName,
        bankAccountNumber,
        gender,
        state,
        lga,
        pollingUnit,
        role,
      });

      const user = response.data?.user;
      if (!user) throw new Error("No user returned from API");

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code,
      });

      const user = response.data?.user;
      if (!user) throw new Error("User verification failed");

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      const user = response.data?.user;

      set({
        user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false, error: null });
    } catch (error) {
      set({
        error:
          error.response.data.message || "Error sending password reset email",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        token,
        password,
      });
      set({ message: response.data.message, isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },

  // ✅ GET USERS WITH OPTIONAL FILTERS
  getUsers: async (filters = {}) => {
    set({ isLoading: true, error: null });

    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/users`);
      set({ users: response.data.users, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching users",
        isLoading: false,
      });
      throw error;
    }
  },
}));
