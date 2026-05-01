import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../Data/MoviesData";
import { useProfile } from "../Context/ProfileContext";
import "./Categories.css";

const allMovies = [
  ...movies.trending,
  ...movies.action,
  ...movies.comedy,
];

const genres = ["All", "Sci-Fi", "Crime", "Thriller", "Drama", "Action", "Comedy", "Romance"];

function Categories() {
  const [selected, setSelected] = useState("All");
  const navigate = useNavigate();
  const { addToContinueWatching } = useProfile();

  const filtered = selected === "All"
    ? allMovies
    : allMovies.filter((m) => m.genre === selected);

  return (
    <div className="cat-page">
      <h1 className="cat-title">Browse by Category</h1>

      <div className="genre-tabs">
        {genres.map((g) => (
          <button
            key={g}
            className={`genre-btn ${selected === g ? "active" : ""}`}
            onClick={() => setSelected(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="cat-grid">
        {filtered.length > 0 ? (
          filtered.map((movie) => (
            <div
              key={movie.id}
              className="cat-card"
              onClick={() => {
                addToContinueWatching(movie);
                navigate(`/watch/${movie.id}`);
              }}
            >
              {/* Background Image */}
              <img
                src={movie.img}
                alt={movie.title}
                className="cat-card-bg"
              />
              <div className="cat-card-gradient" />

              {/* Info — hamesha visible */}
              <div className="cat-card-info">
                <h3 className="cat-card-title">{movie.title}</h3>
                <p className="cat-card-meta">
                  {movie.genre} • ⭐ {movie.rating}
                </p>
                <button className="cat-play-btn">▶ Play Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">No movies in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;