const express = require("express");
const app = new express();
const cors = require("cors");
const getFavoriteCoffeeResponse = require("../__stubs__/getFavoriteCoffeeResponse.json");

app.use(cors());

app.get("/coffee/random_coffee", (req, res) => {
  res.send(getFavoriteCoffeeResponse);
});

app.listen(5001, () => {
  console.log(`App listening on port: 5001`);
});
