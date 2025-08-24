import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log("Database Connected:", conn.connection.host);
   } catch (err){
      console.error("Cannot Connect to the Database:", err);
      process.exit(1);
   }
};