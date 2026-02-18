
import dotenv from 'dotenv';

import app from './app.js';
import connectDB from './app/config/db.js';


dotenv.config();

const PORT = process.env.PORT || 5000;

// database connection 
const startServer = async () => {
  // database connection call
  await connectDB();

  // server listening
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
};

startServer();