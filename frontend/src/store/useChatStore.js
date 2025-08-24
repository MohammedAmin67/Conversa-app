import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore }  from "./useAuthStore";

export const useChatStore = create((set, get) => ({
   messages: [],
   users: [],
   isUsersLoading: false,
   isMessagesLoading: false,
   selectedUser: null,

   getUsers: async () => {
       set({ isUsersLoading: true });
       try {
           const response = await axiosInstance.get('/messages/users');
           set({ users: response.data });
       } catch (error) {
           console.log("Error fetching users:", error);
           toast.error('Failed to load users');
       } finally {
           set({ isUsersLoading: false });
       }
   },

   getMessages: async (userId) => {
       set({ isMessagesLoading: true });
       try {
           const response = await axiosInstance.get(`/messages/${userId}`);
           set({ messages: response.data });
       } catch (error) {
           console.log("Error fetching messages:", error);
           toast.error('Failed to load messages');
       } finally {
           set({ isMessagesLoading: false });
       }
   },

   sendMessage: async (messageData) => {
      const { selectedUser, messages } = get();
      // Removed unused authUser variable from here
      
      try {
          const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          
          // Add the message immediately to your own chat
          // This ensures you see your own messages right away
          set({ messages: [...messages, response.data] });
          
      } catch (error) {
          console.log("Error sending message:", error);
          toast.error('Failed to send message');
      }
   },

   clearChatState: () => {
       set({ 
           selectedUser: null,
           messages: [],
           users: []
       });
   },

   subscribeToMessages: () => {
    const { selectedUser } = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser; // Only declared where it's used

    socket.on("newMessage", (newMessage) => {
        const { selectedUser: currentSelectedUser, messages } = get();
        
        // Only add message if it's for the currently selected user
        const isMessageForCurrentChat = 
            newMessage.senderId === currentSelectedUser._id || 
            newMessage.receiverId === currentSelectedUser._id;
        
        if (!isMessageForCurrentChat) return;

        // Skip if it's your own message (added in sendMessage)
        if (newMessage.senderId === authUser._id) return;

        // Check for duplicates before adding
        const messageExists = messages.some(msg => msg._id === newMessage._id);
        
        if (!messageExists) {
            set({
                messages: [...messages, newMessage],
            });
        }
    });
   },

   unsubscribeFromMessages: () => {
       const socket = useAuthStore.getState().socket;
       socket.off("newMessage");
   },

   setSelectedUser: (selectedUser) => {
       set({ selectedUser });
       
       if (!selectedUser) {
           set({ messages: [] });
       }
   },
}));