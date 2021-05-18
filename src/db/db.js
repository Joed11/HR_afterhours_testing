const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost/javaApi", {
  useNewUrlParser: true,
  useFindAndModify: false,
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
