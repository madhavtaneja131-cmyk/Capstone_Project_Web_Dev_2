import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchByGenre } from "../Data/MoviesData";
import { useProfile } from "../Context/ProfileContext";
import "./Categories.css";

const genres = ["All", "Action", "Comedy", "Thriller", "Drama", "Sci-Fi", "Crime", "Romance"];

function Categories() {
  const [selected, setSelected] = useState("All");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToContinueWatching } = useProfile();

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const query = selected === "All" ? "popular" : selected;
      const data = await fetchByGenre(query);
      setMovies(data);
      setLoading(false);
    };
    loadMovies();
  }, [selected]);

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

      {loading ? (
        <p style={{ color: "#aaa", textAlign: "center", marginTop: "50px" }}>
          Loading...
        </p>
      ) : (
        <div className="cat-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="cat-card"
                onClick={() => {
                  addToContinueWatching(movie);
                  navigate(`/watch/${movie.id}`);
                }}
              >
                <img
                  src={
                    movie.img &&
                    !movie.img.includes("resizing.flixster") &&
                    !movie.img.includes("undefined")
                      ? movie.img
                      : `https://picsum.photos/seed/${movie.id}/300/450`
                  }
                  alt={movie.title}
                  className="cat-card-bg"
                  onError={(e) =>
                    (e.target.src = `https://picsum.photos/seed/${movie.id}/300/450`)
                  }
                />
                <div className="cat-card-gradient" />
                <div className="cat-card-info">
                  <h3 className="cat-card-title">{movie.title}</h3>
                  <p className="cat-card-meta">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                  <button className="cat-play-btn">▶ Play Now</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;