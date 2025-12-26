import express from "express";
const app = express();

app.get("/", (_, res) => {
  res.send("RozgaarSetu Backend Running 🚀");
});

app.listen(5000, () => console.log("Server started on 5000"));
