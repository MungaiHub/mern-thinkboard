import mongoose from "mongoose";

export const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB CONNECTED SUCESSFULLY!!!" );
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1); // exit app if connection fails
  }
};

//await mongoose.connect("mongodb+srv://njamaa91_db_user:lDgjrT456CAB56CD@cluster0.zer9jwj.mongodb.net/?appName=Cluster0");
