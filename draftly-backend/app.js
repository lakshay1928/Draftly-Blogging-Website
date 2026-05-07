require("dotenv").config();
const express = require("express");
const connect = require("./db/connect");
const cors = require("cors");

// routers
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);

const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    if (process.env.MONGODB_URL) {
      await connect(process.env.MONGODB_URL);
      console.log("Connect to database Successfully...");
    } else {
      console.log("No MONGODB_URL provided, running without database...");
    }
    app.listen(PORT, () =>
      console.log(`Server is listening on PORT ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
