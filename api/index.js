import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log("listening from port: " + port);
});
