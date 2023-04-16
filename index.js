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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
