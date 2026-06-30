const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");   // <-- Add this

const connectDB = require("./config/db");
const expenseRoutes = require("./routes/ExpenseRoutes");

const app = express();

app.use(cors());                // <-- Add this
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
