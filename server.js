const express = require("express");
const app = express();
const ConnectDB = require("./Config/ConnectDB");
const userRouter = require("./Routes/User");

require("dotenv").config();

ConnectDB();

app.use(express.json());

app.use('/api/user',userRouter);

app.listen(
  process.env.port,
  console.log(`Server is running on the port ${process.env.port}`),
);
