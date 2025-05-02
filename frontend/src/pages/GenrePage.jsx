import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import noPoster from "../assets/no_poster.png";

function GenrePage() {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/movies/genre/${genre.toLowerCase()}`
        );
        setMovies(res.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genre]);

  return (
    <div className="min-h-screen px-6 py-8 text-white bg-[#0B192C]">
      <h1 className="text-3xl font-bold mb-6 text-[#FF6500] bg-[#1E3E62] rounded-full px-5 py-3 max-w-fit capitalize">
        {genre} Movies
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-lg">No movies found in this genre.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-[#1E3E62] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >
              <img
                src={movie.poster || noPoster}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold line-clamp-2">{movie.title}</h2>
                <p className="text-sm italic text-gray-300">
                  {movie.genres?.join(", ") || "No genres"}
                </p>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold text-red-400">Rating:</span>{" "}
                    {movie.rated || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-green-400">Runtime:</span>{" "}
                    {movie.runtime || "N/A"} mins
                  </p>
                  <p>
                    <span className="font-semibold text-yellow-400">IMDb:</span>{" "}
                    {movie.imdb?.rating || "N/A"} ⭐
                  </p>
                  <p>
                    <span className="font-semibold text-pink-400">Tomatoes:</span>{" "}
                    Viewer: {movie.tomatoes?.viewer?.rating || "N/A"} ⭐ | Critic:{" "}
                    {movie.tomatoes?.critic?.rating || "N/A"} ⭐
                  </p>
                  <p className="line-clamp-3 text-sm text-gray-200">
                    {movie.plot || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenrePage;
