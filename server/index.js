import express from "express";
import bodyParser from "body-parser";
import userRouter from "./api/routes/user.js";
import filmRouter from "./api/routes/films.js";

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/film", filmRouter);

app.listen(PORT, () => {
  console.log(` XVII server is running on port ${PORT}`);
  console.log("-------------------------------------");
  console.log("");
});
