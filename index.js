import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes); // http://localhost:5000/users/signup

const MONGODB_URL =
  "mongodb+srv://Mohsinzia:Mohsin123456@cluster0.7cbprpg.mongodb.net/tour_db?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`server Running on port ${port}`));
  })
  .catch((error) => console.log(`${error} didnot Connect `));

// app.get("/", (req, res) => {
//   res.send("Hello Express ");
// });

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });

// Mohsinzia
// Mohsin123456
