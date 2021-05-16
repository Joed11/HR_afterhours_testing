const express = require("express");
const router = new express.Router();
const getFavoriteCoffeeFromCache = require("./cache/cacheHandler");
const { getFavoriteCoffee } = require("./handler/javaApiHandler");

router.get("/", getFavoriteCoffeeFromCache, getFavoriteCoffee);

module.exports = router;
