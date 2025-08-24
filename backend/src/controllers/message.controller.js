import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
   try {
      const loggedInUserId = req.user._id
      const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
      res.status(200).json(users);
   } catch (error) {
      console.log("Error fetching users for sidebar:", error);
      res.status(500).json({ message: "Internal server error" });
   }
};


export const getMessages = async (req, res) => {
   try {
      const {id: userId} = req.params;
      const loggedInUserId = req.user._id;

      if (!userId) {
         return res.status(400).json({ message: "User ID is required" });
      }

      const messages = await Message.find({
         $or: [
            { senderId: loggedInUserId, receiverId: userId },
            { senderId: userId, receiverId: loggedInUserId }
         ]
      });

      res.status(200).json(messages);
   } catch (error) {
      console.log("Error fetching messages:", error);
      res.status(500).json({ message: "Internal server error" });
   }
}

export const sendMessage = async (req, res) => {
   try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params; 
      const senderId = req.user._id;

     let imageUrl;
     if (image){
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url;
     }

      const newMessage = new Message({
         senderId,
         receiverId,
         text,
         image:imageUrl,
      });

      await newMessage.save();
      
// Real Time Functionality(Socket.io)
      const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId){
         io.to(receiverSocketId).emit("newMessage", newMessage);
      }


      res.status(201).json(newMessage);

   } catch (error) {
      console.log("Error sending message:", error);
      res.status(500).json({ message: "Internal server error" });
   }
}
