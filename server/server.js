import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import farmRoutes from "./routes/farms.js";
import loanRoutes from "./routes/loans.js";
import investmentRoutes from "./routes/investments.js";
import transactionRoutes from "./routes/transactions.js";
import documentRoutes from "./routes/documents.js";
import adminRoutes from "./routes/admin.js";
import issueRoutes from "./routes/issues.js";
import profileRoutes from "./routes/profile.js"
// import MyfarmsRoutes from "./routes/Myfarms.js"

dotenv.config();

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/profile",profileRoutes)
// app.use('/api/myfarms',MyfarmsRoutes)

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
