import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import apartmentRoutes from "./routes/apartmentRoutes";
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use("/", apartmentRoutes);

export default app;
