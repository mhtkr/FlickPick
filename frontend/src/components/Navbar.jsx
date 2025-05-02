import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const genres = [
    { name: "Action", path: "/genre/action" },
    { name: "Comedy", path: "/genre/comedy" },
    { name: "Drama", path: "/genre/drama" },
    { name: "Sci-Fi", path: "/genre/sci-fi" },
    { name: "Horror", path: "/genre/horror" },
    { name: "Romance", path: "/genre/romance" },
    { name: "Animation", path: "/genre/animation" },
  ];

  return (
    <nav className="bg-[#0B192C] text-white p-4 flex justify-between items-center relative">
      <div className="flex gap-6 items-center font-bold">
        <Link to="/">
          <img src="/logo.png" className="w-25 h-auto rounded-2xl" />
        </Link>

        <Link
          to="/"
          className="hover:text-[#FF6500] rounded-full px-3 py-1 hover:bg-[#1E3E62]"
        >
          Home
        </Link>

        <div className="relative">
          <div
            className="cursor-pointer px-3 py-1 hover:text-[#FF6500] hover:bg-[#1E3E62] rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            Genres
          </div>
          {isOpen && (
            <ul className="absolute left-0 mt-2 bg-[#1E3E62] shadow-lg rounded-xl z-30 w-40">
              {genres.map((genre) => (
                <li key={genre.name}>
                  <Link
                    to={genre.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 hover:text-[#FF6500] hover:bg-[#163252] transition duration-150"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {user && (
          <>
            <Link
              to="/liked"
              className="hover:text-[#FF6500] rounded-full px-3 py-1 hover:bg-[#1E3E62]"
            >
              Liked
            </Link>
            <Link
              to="/watched"
              className="hover:text-[#FF6500] rounded-full px-3 py-1 hover:bg-[#1E3E62]"
            >
              Watched
            </Link>
            <Link
              to="/bookmarked"
              className="hover:text-[#FF6500] rounded-full px-3 py-1 hover:bg-[#1E3E62]"
            >
              Bookmarked
            </Link>
          </>
        )}
      </div>

      <div className="flex gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-[#1E3E62] px-4 py-2 rounded-full hover:bg-[#FF6500] hover:text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-[#1E3E62] px-4 py-2 rounded-full hover:text-white hover:bg-blue-500"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#1E3E62] px-4 py-2 rounded-full hover:text-white hover:bg-green-500"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
