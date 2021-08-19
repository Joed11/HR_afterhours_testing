const mongoose = require("mongoose");

let databaseName;

if (process.env.NODE_ENV === "integration") {
  databaseName = process.env.TEST_DATABASE_NAME;
} else {
  databaseName = process.env.PRODUCTION_DATABASE_NAME;
}

const connection = mongoose
  .connect(`mongodb://localhost:27018/${databaseName}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `Connection to ${databaseName} database established successfully`
    );
  })
  .catch((error) => {
    console.log("Something went wrong connection to database", error);
  });

const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
  username: String,
  coffee: {
    id: Number,
    uid: String,
    blend_name: String,
    origin: String,
    variety: String,
    notes: String,
    intensifier: String,
  },
});

const FavoriteCoffee = mongoose.model("favoriteJava", coffeeSchema);

module.exports = FavoriteCoffee;
