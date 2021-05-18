const express = require("express");
const router = new express.Router();
const getFavoriteCoffeeFromCache = require("./cache/cacheHandler");
const {
  getFavoriteCoffee,
  setFavoriteCoffee,
} = require("./handler/favoriteHandler");

router.get("/", getFavoriteCoffeeFromCache, getFavoriteCoffee);
router.post("/", setFavoriteCoffee);

module.exports = router;
