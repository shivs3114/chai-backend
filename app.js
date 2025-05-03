import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
 // Import DB_NAME from config.js
// Ensure required environment variables are set
const { MONGODB_URI, PORT ,DB_NAME} = process.env;
if (!MONGODB_URI || !PORT) {
  console.log(MONGODB_URI, PORT);
  console.error("Error: Missing required environment variables (MONGODB_URI or PORT).");
  process.exit(1);
}
const app = express();
(async () => {
  try {
    console.log('Connecting to the database...');
    await mongoose.connect(`${MONGODB_URI}`, {
    
    });
    console.log('Database connection successful.');

    app.on('error', (err) => {
      console.error("App Error:", err);
      throw err;
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Connection Error:", err);
    process.exit(1); // Exit the process on failure
  }
})
();
