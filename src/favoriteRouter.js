const express = require("express");
const router = new express.Router();
const getFavoriteCoffeeFromCache = require("./cache/cacheHandler");
const {
  getFavoriteCoffee,
  setFavoriteCoffee,
} = require("./handler/favoriteHandler");

router.get("/:username", getFavoriteCoffeeFromCache, getFavoriteCoffee);
router.post("/:username", setFavoriteCoffee);

module.exports = router;
