const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const mongoose = require('mongoose');

router.post("/bookmarks", verifyToken, async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (!user.bookmarked.includes(movieId)) {
      user.bookmarked.push(movieId);
      await user.save();
    }

    res.json({ message: "Bookmarke Saved", bookmarks: user.bookmarked });
  } catch (err) {
    res.status(500).json({ message: "Server error while saving bookmark" });
  }
});

router.get("/bookmarks", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const bookmarkIds = user.bookmarked;

    if (!bookmarkIds || bookmarkIds.length === 0) {
      return res.json({ movies: [] });
    }

    const moviesCollection = mongoose.connection.db.collection('movies');

    const objectIds = bookmarkIds.map(id => new ObjectId(id));

    const movies = await moviesCollection.find({ _id: { $in: objectIds } }).toArray();

    res.json({ movies });
  } catch (err) {
    console.error("Error fetching bookmarked movies:", err);
    res.status(500).json({ message: "Server error while fetching bookmarked movies" });
  }
});

router.delete("/bookmarks/:movieId", verifyToken, async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookmarked = user.bookmarked.filter((id) => id !== movieId);
    await user.save();

    res.json({ message: "Bookmark Removed", bookmarks: user.bookmarked });
  } catch (err) {
    console.error("Error removing bookmark:", err);
    res.status(500).json({ message: "Server error while removing bookmark" });
  }
});

router.post("/likes", verifyToken, async (req, res) => {
  const { movieId } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.liked.includes(movieId)) {
      user.liked.push(movieId);
      await user.save();
    }

    res.json({ message: "Movie liked", liked: user.liked });
  } catch (err) {
    console.error("Error saving like:", err);
    res.status(500).json({ message: "Server error while saving like" });
  }
});

const { ObjectId } = require('mongodb');

router.get("/likes", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const likedIds = user.liked;

    if (!likedIds || likedIds.length === 0) {
      return res.json({ movies: [] });
    }

    const moviesCollection = mongoose.connection.db.collection('movies');

    const objectIds = likedIds.map(id => new ObjectId(id));

    const movies = await moviesCollection.find({ _id: { $in: objectIds } }).toArray();

    res.json({ movies });
  } catch (err) {
    console.error("Error fetching liked movies:", err);
    res.status(500).json({ message: "Server error while fetching liked movies" });
  }
});


router.delete("/likes/:movieId", verifyToken, async (req, res) => {
  const { movieId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.liked = user.liked.filter((id) => id !== movieId);
    await user.save();

    res.json({ message: "Movie removed from likes", liked: user.liked });
  } catch (arr) {
    console.error("Error removing liked movies:", err);
    res
      .status(500)
      .json({ message: "Server error while removing liked movies" });
  }
});

router.post("/watched", verifyToken, async (req, res) => {
  const { movieId } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!user.watched.includes(movieId)) {
      user.watched.push(movieId);
      await user.save();
    }

    res.json({ message: "Movie marked as watched!", watched: user.watched });
  } catch (arr) {
    console.error("Error saving watched movie:", err);
    res
      .status(500)
      .json({ message: "Server error while marking movie as watched" });
  }
});

router.get("/watched", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const watchedIds = user.watched;

    if (!watchedIds || watchedIds.length === 0) {
      return res.json({ movies: [] });
    }

    const moviesCollection = mongoose.connection.db.collection('movies');

    const objectIds = watchedIds.map(id => new ObjectId(id));

    const movies = await moviesCollection.find({ _id: { $in: objectIds } }).toArray();

    res.json({ movies });
  } catch (err) {
    console.error("Error fetching watched movies:", err);
    res.status(500).json({ message: "Server error while fetching watched movies" });
  }
});

router.delete("/watched/:movieId", verifyToken, async (req, res) => {
  const { movieId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.watched = user.watched.filter((id) => id !== movieId);
    await user.save();

    res.json({ message: "Movie removed from watched", watched: user.watched });
  } catch (err) {
    console.error("Error removing watched movie:", err);
    res
      .status(500)
      .json({ message: "Server error while removing watched movie" });
  }
});

module.exports = router;
