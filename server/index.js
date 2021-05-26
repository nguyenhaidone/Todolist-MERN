require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.g38pr.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongooseDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.use("/api/posts", postRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listion on port ${port} . . .`);
});
