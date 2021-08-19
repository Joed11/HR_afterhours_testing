const cache = require("../cache/redisClient");
const {
  storeFavoriteCoffee,
  retrieveFavoriteCoffee,
  deleteFavoriteCoffee,
} = require("../model/favoriteCoffee");
const axios = require("axios");
const { promisify } = require("util");
const setAsync = promisify(cache.set).bind(cache);
const env = process.env.NODE_ENV;
const coffeeApiUrl =
  env === "integration" ? process.env.MOCK_COFFEE_API : process.env.COFFEE_API;

const favoriteCoffeeRequestHandler = {
  getFavoriteCoffee: async (req, res) => {
    try {
      if (!req.params.username) {
        const badRequestError = new Error("Submit a Username");
        badRequestError.code = 400;
        throw badRequestError;
      }
      const username = req.params.username.toLowerCase();
      const favoriteCoffeeEntry = await retrieveFavoriteCoffee(username);
      if (favoriteCoffeeEntry.length < 1) {
        const notFoundError = new Error("No coffee for you");
        notFoundError.code = 404;
        throw notFoundError;
      }
      setAsync(username, JSON.stringify(favoriteCoffeeEntry[0]), "EX", 10);
      res.status(200).send(favoriteCoffeeEntry[0]);
    } catch (error) {
      let errorCode = 500;
      if (error.code) {
        errorCode = error.code;
      }
      res.status(errorCode).send(error.message);
    }
  },
  setFavoriteCoffee: async (req, res) => {
    try {
      if (!req.params.username) {
        const badRequestError = new Error("Submit a Username");
        badRequestError.code = 400;
        throw badRequestError;
      }
      if (!req.body.coffee) {
        const apiResponse = await axios.get(coffeeApiUrl);
        req.body.coffee = apiResponse.data;
      }
      const username = req.params.username.toLowerCase();
      const favoriteCoffeeEntry = {
        username: username,
        coffee: req.body.coffee,
      };
      storeFavoriteCoffee(favoriteCoffeeEntry);
      setAsync(username, JSON.stringify(req.body.coffee), "EX", 10);
      res.status(200).send({
        message: "Stored the favorite coffee",
        storedData: favoriteCoffeeEntry,
      });
    } catch (error) {
      let errorCode = 500;
      if (error.code) {
        errorCode = error.code;
      }
      res.status(errorCode).send(error.message);
    }
  },
  deleteFavoriteCoffee: async (req, res) => {
    try {
      if (!req.params.username) {
        const badRequestError = new Error("Submit a Username");
        badRequestError.code = 400;
        throw badRequestError;
      }
      const username = req.params.username.toLowerCase();

      deleteFavoriteCoffee(username);
      res.status(200).send({
        message: "Favorite Removed",
      });
    } catch (error) {
      let errorCode = 500;
      if (error.code) {
        errorCode = error.code;
      }
      res.status(errorCode).send(error.message);
    }
  },
};

module.exports = favoriteCoffeeRequestHandler;
