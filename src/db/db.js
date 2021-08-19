const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb://localhost/javaApi", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to database established successfully");
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
