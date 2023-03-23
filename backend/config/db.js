import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = mongoose.connect('mongodb://localhost:27017/capstone', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        

        if (conn != undefined) {
            console.log("Connected to database");
        }
    } catch (error) {
        console.log("Failed to connect to database");
    }
}

export default connectDB;