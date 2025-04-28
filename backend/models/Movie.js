const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rated: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  directors: [String],
  plot: String,
  poster: String,
  fullplot: String,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
});

module.exports = mongoose.model("Movie", MovieSchema, "movies");
