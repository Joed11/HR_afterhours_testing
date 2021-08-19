const redis = require("redis");
const client = redis.createClient();

client.on("connect", () => {
  console.log("Cache connection established successfully");
});

client.on("error", (error) => {
  console.error("Redis Error", error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

module.exports = client;
