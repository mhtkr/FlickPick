const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Movie = require("../models/Movie");

router.get("/random", async (req, res) => {
  try {
    const randomMovie = await Movie.aggregate([{ $sample: { size: 1 } }]);

    if (randomMovie.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.json(randomMovie[0]);
  } catch (err) {
    console.error("Error fetching random movie:", err);
    res.status(500).json({ message: "Error fetching random movie" });
  }
});

router.get("/genre/:genre", async (req, res) => {
  const genreParam = req.params.genre;

  try {
    const movies = await Movie.find({
      genres: { $in: [new RegExp(`^${genreParam}$`, "i")] }
    })
      .limit(120)
      .sort({ "year": -1 });

    if (!movies.length) {
      return res.status(404).json({ message: "No movies found in this genre." });
    }

    res.json(movies);
  } catch (error) {
    console.error("Error fetching genre movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
