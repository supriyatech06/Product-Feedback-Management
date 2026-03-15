import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { Feedback } from "./models/Feedback.js";
import { seedFeedback } from "./data/seedFeedback.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDatabase();

  const existingFeedback = await Feedback.countDocuments();
  if (existingFeedback === 0) {
    await Feedback.insertMany(seedFeedback);
    console.log("Seeded starter feedback");
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
