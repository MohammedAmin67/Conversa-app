import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useChatStore } from "./useChatStore";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
   authUser: null,
   isSigningUp: false,
   isLoggingIn: false,
   isUpdatingProfile: false,
   isCheckingAuth: true,
   onlineUsers: [],
   socket: null,

   checkAuth: async () => {
      try {
         const response = await axiosInstance.get('/auth/check');
         set({ authUser: response.data });
         
         const chatStore = useChatStore.getState();
         chatStore.setSelectedUser(null);
         get().connectSocket();
      } catch (error) {
         console.log("Error checking auth:", error);
         set({ authUser: null });
      } finally {
         set({ isCheckingAuth: false });
      }
   },

   signup: async (data) => {
      set({ isSigningUp: true });
      try {
         const res = await axiosInstance.post('/auth/signup', data);
         set({ authUser: res.data });
         // Clear any existing chat state and ensure no user is selected
         const chatStore = useChatStore.getState();
         chatStore.clearChatState();
         toast.success("Account created successfully");
         get().connectSocket();
      } catch (error) {
         console.log("Error in signup:", error);
         toast.error(error.response?.data?.message || "Signup failed");
      } finally {
         set({ isSigningUp: false });
      }
   },

   logout: async () => {
      try {
         await axiosInstance.post('/auth/logout');
         const chatStore = useChatStore.getState();
         chatStore.clearChatState();
         set({ authUser: null });
         toast.success("Logged out successfully");
         get().disconnectSocket();
      } catch (error) {
         console.log("Error in logout:", error);
         toast.error(error.response?.data?.message || "Logout failed");
      }
   },

   login: async (data) => {
      set({ isLoggingIn: true });
      try {
         const res = await axiosInstance.post('/auth/login', data);
         set({ authUser: res.data });
         // Clear chat state and ensure no user is selected on login
         const chatStore = useChatStore.getState();
         chatStore.clearChatState();
         chatStore.setSelectedUser(null);
         toast.success("Logged in successfully");
         get().connectSocket();

      } catch (error) {
         console.log("Error in login:", error);
         toast.error(error.response?.data?.message || "Login failed");
      } finally {
         set({ isLoggingIn: false });
      }
   },

   updateProfile: async (data) => {
   set({ isUpdatingProfile: true });
   try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      
      await get().checkAuth();
      
   } catch (error) {
      console.log("Error in updateProfile:", error);
      toast.error(error.response?.data?.message || "Profile update failed");
   } finally {
      set({ isUpdatingProfile: false });
   }
},

   connectSocket:() => {
      const { authUser } = get();
      if(!authUser || get().socket?.connected) return;
      const socket = io(BASE_URL, {
         query: {
            userId: authUser._id,
         },
      });
      socket.connect();

      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
         set({ onlineUsers: userIds });
      })
   },
   disconnectSocket: () => {
      if(get().socket.connected) get().socket.disconnect();

   },


}));