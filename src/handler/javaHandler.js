const axios = require("axios");
const env = process.env.NODE_ENV;
const coffeeApiUrl =
  env === "integration" ? process.env.MOCK_COFFEE_API : process.env.COFFEE_API;

const coffeeRequestHandler = {
  getCoffee: async (req, res, next) => {
    try {
      const apiResponse = await axios.get(coffeeApiUrl);
      const coffeeData = apiResponse.data;
      res.status(200).send(coffeeData);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = coffeeRequestHandler;
