import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    // origin: 'http://localhost:5713' ,
    // method: ["GET", "POST", "DELETE", "PUT"],
    // credentials: true,
    // // Access-Control-Allow-Origin: *
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
  })
);

app.options('*', cors());



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
export default app;