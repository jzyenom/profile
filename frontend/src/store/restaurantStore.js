import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/restaurant"
    : "/api/restaurant";

axios.defaults.withCredentials = true;

export const useRestaurantStore = create((set) => ({
  isLoading: false,
  error: null,
  success: false,

  createRestaurant: async (restaurantData) => {
    set({ isLoading: true, error: null, success: false });
    try {
      const response = await axios.post(`${API_URL}/create`, restaurantData);
      toast.success("Restaurant created successfully!");
      set({ isLoading: false, success: true });
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to create restaurant.";
      toast.error(errorMsg);
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },
}));
