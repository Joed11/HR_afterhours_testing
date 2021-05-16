const express = require("express");
const app = new express();
const javaRouter = require("./javaRouter.js");

app.use("/javaApi", javaRouter);

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
