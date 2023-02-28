import express, { application } from "express";
import userRouter from "./api/user.js";

const PORT = 5000;

const app = express();
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(` XVII server is running on port ${PORT}`);
  console.log("-------------------------------------");
  console.log("");
});
