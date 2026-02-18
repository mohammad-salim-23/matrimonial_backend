import express, {type Application,type Request,type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './app/routes/index.js';
// import router from './app/routes/index.js';
// import globalErrorHandler from './app/middleware/globalErrorHandler.js';
// import notFound from './app/middleware/notFound.js';

// environment variable load
dotenv.config();

const app: Application = express();

// --- middleware setup ---

// body parser middleware-> to parse json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors middleware -- Cross-Origin Resource Sharing
 app.use(cors(
  {
    origin: ['http://localhost:3000'], 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  }
 ));



// basic test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Ecoloop Backend API",
  });
});


app.use('/api/v1',router);
// --- (Not Found Route) ---
app.all('/:path', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// app.use(globalErrorHandler);
// app.use(notFound)
export default app;