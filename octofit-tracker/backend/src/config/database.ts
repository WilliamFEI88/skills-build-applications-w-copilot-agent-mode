import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
