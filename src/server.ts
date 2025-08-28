import dotenv from "dotenv";
import app from "./framework/express/app.js"
import connectDB from "./framework/database/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
