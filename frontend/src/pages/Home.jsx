import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import noPoster from "../assets/no_poster.png";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import HeroHeader from "../components/HeroHeader";

const Home = () => {
  const [movie, setMovie] = useState(null);
  const [genreMovies, setGenreMovies] = useState({});

  const genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Animation"];

  const handleAction = async (type, movieId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to perform this action");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let endpoint = "";
      if (type === "like") endpoint = "/api/user/likes";
      else if (type === "bookmark") endpoint = "/api/user/bookmarks";
      else if (type === "watched") endpoint = "/api/user/watched";

      await axios.post(`http://localhost:5000${endpoint}`, { movieId }, config);
      alert(`Movie ${type}d!`);
    } catch (err) {
      console.error(`Error while trying to ${type} movie:`, err);
      alert(`Failed to ${type} movie`);
    }
  };

  const fetchRandomMovie = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies/random");
      setMovie(res.data);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  };

  const fetchMoviesByGenre = async () => {
    try {
      const promises = genres.map((genre) =>
        axios.get(`http://localhost:5000/api/movies/genre/${genre.toLowerCase()}`)
      );

      const results = await Promise.all(promises);

      const newGenreMovies = {};
      results.forEach((res, i) => {
        newGenreMovies[genres[i]] = res.data;
      });

      setGenreMovies(newGenreMovies);
    } catch (error) {
      console.error("Failed to fetch genre movies:", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
    fetchMoviesByGenre();
  }, []);

  return (
    <div className="mx-auto bg-[#000000] text-white">
      <div>
        <HeroHeader />
      </div>

      <div className="p-5">
        {movie ? (
          <div className="flex flex-col md:flex-row bg-gradient-to-br from-[#1E3E62] to-[#000000] text-white rounded-t-2xl overflow-hidden">
            <img
              src={movie.poster || noPoster}
              className="w-full md:w-80 object-cover"
              alt={movie.title}
            />
            <div className="p-5 space-y-2">
              <h1 className="text-4xl font-bold">{movie.title}</h1>

              <p className="text-sm italic text-gray-300 bg-[#1E3E62] px-3 py-1 rounded-full max-w-fit">
                {movie.genres?.join(", ") || "No genres"}
              </p>

              <p>
                <span className="font-semibold text-red-400">Rating:</span>{" "}
                {movie.rated || "N/A"} |
                <span className="font-semibold text-green-400"> Runtime:</span>{" "}
                {movie.runtime || "N/A"} mins
              </p>

              <p>
                <span className="font-semibold text-amber-400">IMDb:</span>{" "}
                {movie.imdb?.rating || "N/A"} ⭐
              </p>

              <p>
                <span className="font-semibold text-pink-400">Rotten Tomatoes:</span>{" "}
                Viewer: {movie.tomatoes?.viewer?.rating || "N/A"} ⭐ | Critic:{" "}
                {movie.tomatoes?.critic?.rating || "N/A"} ⭐
              </p>

              <p><span className="font-semibold">Cast:</span> {movie.cast?.join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Directors:</span> {movie.directors?.join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Writers:</span> {movie.writers?.join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Languages:</span> {movie.languages?.join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Countries:</span> {movie.countries?.join(", ") || "N/A"}</p>
              <p><span className="font-semibold">Released:</span> {movie.released ? new Date(movie.released).toDateString() : "N/A"}</p>
              <p><span className="font-semibold">Awards:</span> {movie.awards?.text || "N/A"}</p>

              <p className="text-justify mt-4 bg-[#13263c] p-3 rounded-2xl">{movie.fullplot || movie.plot}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleAction("like", movie._id)}
                  className="bg-[#0B192C] hover:bg-red-200 hover:text-black text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-700"
                >
                  <FaHeart size={16} /> Like
                </button>
                <button
                  onClick={() => handleAction("bookmark", movie._id)}
                  className="bg-[#0B192C] hover:bg-yellow-200 hover:text-black text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-700"
                >
                  <FaBookmark size={16} /> Bookmark
                </button>
                <button
                  onClick={() => handleAction("watched", movie._id)}
                  className="bg-[#0B192C] hover:bg-green-200 hover:text-black text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-700"
                >
                  <BiSolidMoviePlay size={18} /> Watched
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}

        <button
          onClick={fetchRandomMovie}
          className="bg-[#0B192C] font-semibold py-2 px-4 rounded-b-2xl hover:bg-[#FF6500] transition-colors duration-800 w-full mt-1"
        >
          S H U F F L E
        </button>
      </div>

      {genres.map((genre) => {
        const movies = genreMovies[genre] || [];
        if (!movies.length) return null;

        return (
          <div key={genre} className="p-5 bg-[#0B192C] mt-5 rounded-4xl mx-3">
            <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-[#1E3E62] to-[#0B192C] px-5 py-2 rounded-full mb-5">
              {genre} Movies
            </h2>
            <div className="flex overflow-x-auto no-scrollbar space-x-4 pb-2 rounded-2xl">
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="min-w-[200px] bg-[#1E3E62] text-white rounded-xl p-2 shadow-md flex-shrink-0"
                >
                  <img
                    src={movie.poster || noPoster}
                    alt={movie.title}
                    className="h-120 w-full object-cover rounded-md mb-2"
                  />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                    <p className="text-sm text-amber-400">
                      ⭐ {movie.imdb?.rating ?? "N/A"}
                    </p>
                    <p className="text-sm text-red-400">
                      Rated: {movie.rated || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleAction("like", movie._id)}
                      className="bg-[#0B192C] hover:bg-red-200 hover:text-black text-white text-xs px-3 py-2 rounded-full flex items-center gap-1 transition-all duration-700"
                    >
                      <FaHeart size={14} /> Like
                    </button>
                    <button
                      onClick={() => handleAction("bookmark", movie._id)}
                      className="bg-[#0B192C] hover:bg-yellow-200 hover:text-black text-white text-xs px-3 py-2 rounded-full flex items-center gap-1 transition-all duration-700"
                    >
                      <FaBookmark size={14} /> Bookmark
                    </button>
                    <button
                      onClick={() => handleAction("watched", movie._id)}
                      className="bg-[#0B192C] hover:bg-green-200 hover:text-black text-white text-xs px-3 py-2 rounded-full flex items-center gap-1 transition-all duration-700"
                    >
                      <BiSolidMoviePlay size={16} /> Watched
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default Home;
