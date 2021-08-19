const cache = require("./redisClient");
const { promisify } = require("util");
const getAsync = promisify(cache.get).bind(cache);
const deleteAsync = promisify(cache.del).bind(cache);

async function getFavoriteCoffeeFromCache(req, res, next) {
  try {
    const username = req.params.username.toLowerCase();
    if (!username) {
      res.status(400).send("Submit a username");
    }
    const cachedFavorite = await getAsync(username);
    if (!cachedFavorite) {
      throw new Error("not found in cache");
    }
    res.status(200).send(JSON.parse(cachedFavorite));
  } catch (error) {
    console.log("Hit error", error.message);
    next();
  }
}

async function deleteFavoriteCoffeeFromCache(req, res, next) {
  try {
    const username = req.params.username.toLowerCase();
    if (!username) {
      res.status(400).send("Submit a username");
    }
    const cachedFavorite = await getAsync(username);
    if (!cachedFavorite) {
      throw new Error("not found in cache");
    }

    await deleteAsync(username);

    console.log(`Successfully deleted cached valuse for user: ${username}`);

    next();
  } catch (error) {
    console.log("Hit error", error.message);
    next();
  }
}

module.exports = {
  getFavoriteCoffeeFromCache,
  deleteFavoriteCoffeeFromCache,
};
