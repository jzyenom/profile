// postStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "https://api-kebbi-government-profile.onrender.com/api/posts";

// const API_URL = "http://localhost:5000/api/posts";

export const usePostStore = create((set) => ({
  posts: [],
  post: null,
  isLoading: false,
  error: null,

  // Create Post
  createPost: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({ posts: [res.data, ...state.posts], isLoading: false }));
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error creating post",
        isLoading: false,
      });
    }
  },

  // Get All Posts
  getPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/posts`);
      set({ posts: res.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error fetching posts",
        isLoading: false,
      });
    }
  },

  // Get Post by ID
  getPost: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/post/${id}`);
      set({ post: res.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error fetching post",
        isLoading: false,
      });
    }
  },

  // Update Post
  updatePost: async (id, formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(`${API_URL}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        posts: state.posts.map((p) => (p._id === id ? res.data : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error updating post",
        isLoading: false,
      });
    }
  },

  // Delete Post
  deletePost: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      set((state) => ({
        posts: state.posts.filter((p) => p._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error deleting post",
        isLoading: false,
      });
    }
  },

  // Filter by Status
  getPostsByStatus: async (status) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/status?status=${status}`);
      set({ posts: res.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error filtering posts",
        isLoading: false,
      });
    }
  },
}));
