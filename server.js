require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  budget: Number,
});

const User = mongoose.model("User", userSchema);

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  amount: Number,
  note: String,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(400).send("Error signing up");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.status(200).json({ message: "Logged in", userId: user._id });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(400).send("Error logging in");
  }
});

app.post("/add-transaction", async (req, res) => {
  try {
    const { userId, type, amount, note } = req.body;
    const transaction = new Transaction({ user: userId, type, amount, note });
    await transaction.save();
    res.status(201).send("Transaction added");
  } catch (error) {
    console.error("Error adding transaction:", error.message);
    res.status(400).send("Error adding transaction");
  }
});

app.post("/set-budget", async (req, res) => {
  try {
    const { userId, budget } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { budget },
      { new: true }
    );
    if (user) {
      res.status(200).send("Budget updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error setting budget:", error.message);
    res.status(400).send("Error setting budget");
  }
});

app.post("/update-budget", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.budget += amount;
      await user.save();
      res.status(200).send("Budget updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating budget:", error.message);
    res.status(400).send("Error updating budget");
  }
});

app.post("/get-budget", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ budget: user.budget });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error getting budget:", error.message);
    res.status(400).send("Error getting budget");
  }
});

app.post("/get-transactions", async (req, res) => {
  try {
    const { userId } = req.body;
    const transactions = await Transaction.find({ user: userId });

    if (transactions) {
      res.status(200).json({ transactions: transactions });
    } else {
      res.status(404).send("Transactions not found");
    }
  } catch (error) {
    console.error("Error getting transactions:", error.message);
    res.status(400).send("Error getting transactions");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
