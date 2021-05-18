const express = require("express");
const app = new express();
const favoriteRouter = require("./favoriteRouter.js");
const { getCoffee } = require("./handler/javaHandler");

app.use(express.json());

app.get("/javaApi", getCoffee);
app.use("/javaApi/favorite", favoriteRouter);

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
