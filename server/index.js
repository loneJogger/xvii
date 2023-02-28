import express, { application } from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("server is up");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
