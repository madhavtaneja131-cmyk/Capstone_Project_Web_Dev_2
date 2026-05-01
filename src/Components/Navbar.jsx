import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import "./Navbar.css";

function Navbar() {
  const { activeProfile, setActiveProfile } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  window.onscroll = () => setScrolled(window.scrollY > 50);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/categories`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <h1 className="navbar-logo">NETFLIX</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
        </div>
      </div>

      <div className="navbar-right">
        {/* SEARCH */}
        <div className={`search-box ${searchOpen ? "open" : ""}`}>
          {searchOpen && (
            <input
              type="text"
              placeholder="Search titles..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
            />
          )}
          <button
            className="search-icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? "✕" : "🔍"}
          </button>
        </div>

        <span className="navbar-profile-name">{activeProfile?.name}</span>
        <div
          className="navbar-avatar"
          style={{ backgroundColor: activeProfile?.color }}
          onClick={() => setActiveProfile(null)}
          title="Switch Profile"
        >
          {activeProfile?.avatar}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;