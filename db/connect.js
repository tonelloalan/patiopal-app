import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log("MONGODB_URI: ", MONGODB_URI);
  console.log('Test Env Variable (Should be "testing"):', process.env.TEST_VAR);
  throw Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

//  Handles unexpected disconnects gracefully if it occurs
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.conn) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn - (await cached.promise);
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
