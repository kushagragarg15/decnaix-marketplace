import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

// Use full MongoDB URI from .env or construct from password
const mongoURI = process.env.MONGODB_URI || 
    `mongodb+srv://krishagarwal7080:${process.env.MONGO_PASSWORD}@cluster0.lehtyug.mongodb.net/decenAI`;

if (!mongoURI) {
    console.error("MongoDB URI not found in environment variables");
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB successfully");
}).catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
});
