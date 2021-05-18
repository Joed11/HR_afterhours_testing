const cache = require("../cache/redisClient");
const {
  storeFavoriteCoffee,
  retrieveFavoriteCoffee,
} = require("../model/favoriteCoffee");
const axios = require("axios");
const { promisify } = require("util");
const setAsync = promisify(cache.set).bind(cache);

const favoriteCoffeeRequestHandler = {
  getFavoriteCoffee: async (req, res) => {
    try {
      if (!req.body.username) {
        const badRequestError = new Error("Submit a Username");
        badRequestError.code = 400;
        throw badRequestError;
      }
      const username = req.body.username.toLowerCase();
      const favoriteCoffeeEntry = await retrieveFavoriteCoffee(username);
      setAsync(username, JSON.stringify(favoriteCoffeeEntry[0]), "EX", 10);
      res.status(200).send(favoriteCoffeeEntry[0]);
    } catch (error) {
      let errorCode = 500;
      if (error.code) {
        errorCode = error.code;
      }
      res.status(errorCode).send(new Error(error.message));
    }
  },
  setFavoriteCoffee: async (req, res) => {
    try {
      if (!req.body.username) {
        const badRequestError = new Error("Submit a Username");
        badRequestError.code = 400;
        throw badRequestError;
      }
      if (!req.body.coffee) {
        const apiResponse = await axios.get(
          "https://random-data-api.com/api/coffee/random_coffee"
        );
        req.body.coffee = apiResponse.data;
      }
      const username = req.body.username.toLowerCase();
      const favoriteCoffeEntry = {
        username: username,
        coffee: req.body.coffee,
      };
      console.log(favoriteCoffeEntry);
      storeFavoriteCoffee(favoriteCoffeEntry);
      setAsync(username, JSON.stringify(req.body.coffee), "EX", 10);
      res.status(200).send({
        message: "Stored the favorite coffee",
        storedData: favoriteCoffeEntry,
      });
    } catch (error) {
      let errorCode = 500;
      if (error.code) {
        errorCode = error.code;
      }
      res.status(errorCode).send(new Error(error.message));
    }
  },
};

module.exports = favoriteCoffeeRequestHandler;
