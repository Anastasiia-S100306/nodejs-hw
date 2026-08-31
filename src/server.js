import 'dotenv/config';
import express from "express";
import {errors} from "celebrate";
import cors from 'cors';
import {connectMongoDB} from "./db/connectMongoDB.js";
import {logger} from "./middleware/logger.js";
import {errorHandler} from "./middleware/errorHandler.js";
import {notFoundHandler} from "./middleware/notFoundHandler.js";
import notesRouter from "./routes/notesRoutes.js"

const PORT = Number(process.env.PORT) || 3000;
const app = express();

// global Middleware
app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRouter);
app.use(errors()); // celebrate error handler

// 404 and error handler
app.use(notFoundHandler)
app.use(errorHandler);

// connection to MongoDB
await connectMongoDB();

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});