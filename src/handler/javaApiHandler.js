const cache = require("../cache/redisClient");
const axios = require("axios");
const { promisify } = require("util");
const setAsync = promisify(cache.set).bind(cache);

const coffeeRequestHandler = {
  getFavoriteCoffee: async (req, res, next) => {
    try {
      if (!req.query.username) {
        const badRequestError = new Error("Submit a Username");
        badRequestError.code = 400;
        throw badRequestError;
      }
      const username = req.query.username.toLowerCase();
      const apiResponse = await axios.get(
        "https://random-data-api.com/api/coffee/random_coffee"
      );
      const newFavorite = apiResponse.data;
      await setAsync(username, JSON.stringify(newFavorite));
      res.status(200).send(newFavorite);
    } catch (error) {
      let errorCode = 500;
      if (error.code) {
        errorCode = error.code;
      }
      res.status(errorCode).send(new Error(error.message));
    }
  },
};

module.exports = coffeeRequestHandler;
