// Stellt die Verbindung zur MongoDB-Datenbank her
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Asynchrone Funktion zur Verbindung mit der MongoDB-Datenbank
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'user-service',
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Beendet den Prozess bei Verbindungsfehler
  }
};

export default connectDB;