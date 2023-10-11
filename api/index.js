import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

app.get((req, res) => {
  res.render();
});

app.listen(port, () => {
  console.log("listening from port: " + port);
});
