const express = require("express");
const router = new express.Router();
const {
  getFavoriteCoffeeFromCache,
  deleteFavoriteCoffeeFromCache,
} = require("./cache/cacheHandler");
const {
  getFavoriteCoffee,
  setFavoriteCoffee,
  deleteFavoriteCoffee,
} = require("./handler/favoriteHandler");

router.get("/:username", getFavoriteCoffeeFromCache, getFavoriteCoffee);
router.delete(
  "/:username",
  deleteFavoriteCoffeeFromCache,
  deleteFavoriteCoffee
);
router.post("/:username", setFavoriteCoffee);

module.exports = router;
