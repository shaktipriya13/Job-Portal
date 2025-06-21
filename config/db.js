import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongodb database ${mongoose.connection.host} successfully `.bgGreen.white);

    } catch (err) {

        console.log(`Mongodb connection error: ${err}`.bgMagenta.white);
    }
}

export default connectDB;