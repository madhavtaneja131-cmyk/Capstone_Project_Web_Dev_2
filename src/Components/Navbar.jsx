import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import { searchMovies } from "../Data/MoviesData";
import "./Navbar.css";

function Navbar() {
  const { activeProfile, setActiveProfile } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  window.onscroll = () => setScrolled(window.scrollY > 50);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) setSearchResults([]);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      const results = await searchMovies(searchQuery);
      setSearchResults(results.slice(0, 5));
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchResults([]);
      setSearchQuery("");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <h1 className="navbar-logo">CinePlay</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/myspace">My Space</Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className={`search-box ${searchOpen ? "open" : ""}`}>
          {searchOpen && (
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search... (Press Enter)"
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      className="search-item"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                        navigate(`/watch/${movie.id}`);
                      }}
                    >
                      <img src={movie.img} alt={movie.title} />
                      <div>
                        <p className="search-title">{movie.title}</p>
                        <p className="search-year">⭐ {movie.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            className="search-icon-btn"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setSearchResults([]);
              setSearchQuery("");
            }}
          >
            {searchOpen ? "✕" : "🔍"}
          </button>
        </div>

        <span className="navbar-profile-name">{activeProfile?.name}</span>
        <div
          className="navbar-avatar"
          style={{ backgroundColor: activeProfile?.color }}
          onClick={() => setActiveProfile(null)}
        >
          {activeProfile?.avatar}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;