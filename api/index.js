import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();
const port = 3000;

app.use("/api/user",userRouter);

app.listen(port, () => {
  console.log("listening from port: " + port);
});
