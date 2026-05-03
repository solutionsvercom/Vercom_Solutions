import mongoose from 'mongoose';

/**
 * Connects to MongoDB (Atlas or local). Set MONGODB_URI in .env.
 * Optional MONGODB_DB_NAME if the URI has no database path (otherwise ignored).
 */
export async function connectDatabase(mongoUri) {
  const dbName = process.env.MONGODB_DB_NAME?.trim() || undefined;

  try {
    await mongoose.connect(mongoUri, {
      ...(dbName ? { dbName } : {}),
      serverSelectionTimeoutMS: 30_000,
    });
    const name = mongoose.connection.db?.databaseName;
    console.log(`MongoDB connected${name ? ` (database: ${name})` : ''}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
