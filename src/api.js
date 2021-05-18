require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const favoriteRouter = require("./favoriteRouter.js");
const { getCoffee } = require("./handler/javaHandler");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/javaApi", getCoffee);
app.use("/javaApi/favorite", favoriteRouter);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
