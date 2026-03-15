import cors from "cors";
import express from "express";
import morgan from "morgan";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/feedback", feedbackRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

