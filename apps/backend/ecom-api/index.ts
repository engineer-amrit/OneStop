import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import config from "@/config/config.js";
import connectDB from "@/config/db.js";
import os from 'os';
import router from "@/routers/index.js";
import cors from "cors"
import { publicController } from "@/routers/public-router.js";
import { ErrorHandler } from "@utils/api";
import { generalLogger } from "@/utils/logger.js";
import { AccessLoggerMiddleware } from "@/middleware/accessLogger.js";


const app = express();
const port = 3000;
const skipLogUrls = ['/health', '/v1/cdn'];

app.use(cors(
  {
    origin: config.NODE_ENV == "production" ? [
      config.CLIENT_URL
    ] : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
    optionsSuccessStatus: 204,
  }
));

app.set('trust proxy', 1); // or 'loopback', or true




// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.disable('x-powered-by');


// Global Middlewares
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(new AccessLoggerMiddleware(generalLogger, skipLogUrls).logger);

// cdn
app.use("/v1/cdn", publicController.cdn);

// all routers
app.use(router);

// error handling middleware
const errorMiddleware = new ErrorHandler(config, generalLogger).middleware;
app.use(errorMiddleware);

// Connect to Database & Start Server

await connectDB()
  .then(() => {
    app.listen(port, () => {
      const interfaces = os.networkInterfaces();

      for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name] || []) {
          // Skip internal (i.e., 127.0.0.1) and non-IPv4 addresses
          if (net.family === 'IPv4' && !net.internal) {
            console.log(`Server is running at http://${net.address}:${port}`);

          }
        }

      }
      console.log(`Server is running at http://localhost:${port}`);
      console.log("[DEBUG] Server running under PID:", process.pid);
    });
  })
