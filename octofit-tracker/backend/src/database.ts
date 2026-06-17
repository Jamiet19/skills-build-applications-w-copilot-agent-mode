import mongoose from 'mongoose';

export const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB (octofit_db)');
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
}