const FavoriteCoffee = require("../db/db");

const favoriteCoffeeModel = {
  storeFavoriteCoffee: async (favoriteEntry) => {
    console.log("storing the coffee");
    return await FavoriteCoffee.findOneAndUpdate(
      { username: favoriteEntry.username },
      favoriteEntry,
      {
        upsert: true,
      }
    );
  },
  retrieveFavoriteCoffee: async (username) => {
    return await FavoriteCoffee.find({ username: username });
  },
};

module.exports = favoriteCoffeeModel;
