import { useEffect, useState } from "react";

const Bookmark = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/user/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching bookmarked movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedMovies();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/user/bookmarks/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      } else {
        console.error("Failed to delete movie from bookmarks");
      }
    } catch (error) {
      console.error("Error deleting movie from bookmarks:", error);
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="p-6 bg-[#0B192C] text-white min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-6 bg-[#1E3E62] rounded-full px-5 py-3 max-w-fit">
          Bookmarked Movies
        </h1>
      </div>

      {movies.length === 0 ? (
        <div className="text-gray-500">No bookmarked movies yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-[#1E3E62] text-white rounded-2xl shadow-md overflow-hidden flex flex-col w-auto"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-2xl p-2"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-gray-300 text-sm mt-2">
                    {movie.plot?.length > 100
                      ? movie.plot.slice(0, 100) + "..."
                      : movie.plot}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(movie._id)}
                  className="mt-4 bg-[#0B192C] hover:bg-[#FF6500] text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
