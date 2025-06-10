import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import express from 'express';
import connectDB from './src/db/db.js';
import userRouter from './src/routes/user.router.js';

const app = express(); // ✅ Moved to top

// ✅ Middleware should be set up before app.listen()
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json()); // ✅ Required for parsing JSON
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static('public'));

// ✅ Declare routes before listen
app.use('/api/v1/users', userRouter);

// ✅ Connect DB and then listen
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`);
    });

    app.on('error', (err) => {
      console.error("App Error:", err);
      throw err;
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

export default app;






// Import the connectDB function
// Import the connectDB function
 // Import DB_NAME from config.js
// Ensure required environment variables are set
// const { MONGODB_URI, PORT ,DB_NAME} = process.env;
// if (!MONGODB_URI || !PORT) {
//   console.log(MONGODB_URI, PORT);
//   console.error("Error: Missing required environment variables (MONGODB_URI or PORT).");
//   process.exit(1);
// }
// const app = express();
// (async () => {
//   try {
//     console.log('Connecting to the database...');
//     await mongoose.connect(`${MONGODB_URI}`, {
    
//     });
//     console.log('Database connection successful.');

//     app.on('error', (err) => {
//       console.error("App Error:", err);
//       throw err;
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Connection Error:", err);
//     process.exit(1); // Exit the process on failure
//   }
// })
// ();
