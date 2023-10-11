import express from "express";

const app = express();
const port = 3000;

app.get((req,res)=>{
    res.render();
});

app.listen(port,()=>{
    console.log("listening from port: " + port);
});