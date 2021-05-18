const axios = require("axios");

const coffeeRequestHandler = {
  getCoffee: async (req, res, next) => {
    try {
      const apiResponse = await axios.get(
        "https://random-data-api.com/api/coffee/random_coffee"
      );
      const coffeeData = apiResponse.data;
      res.status(200).send(coffeeData);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = coffeeRequestHandler;
