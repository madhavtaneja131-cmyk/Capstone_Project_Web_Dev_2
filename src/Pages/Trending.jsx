import { useNavigate } from "react-router-dom";
import { allMovies } from "../Data/MoviesData";
import { useProfile } from "../Context/ProfileContext";
import "./Trending.css";

function Trending() {
  const navigate = useNavigate();
  const { addToContinueWatching } = useProfile();

  return (
    <div className="trending-page">
      <h1 className="trending-title">🔥 Trending Now</h1>
      <p className="trending-sub">Most watched shows this week</p>

      <div className="trending-grid">
        {allMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="trending-card"
            onClick={() => {
              addToContinueWatching(movie);
              navigate(`/watch/${movie.id}`);
            }}
          >
            <div className="trending-number">{index + 1}</div>
            <img src={movie.img} alt={movie.title} />
            <div className="trending-info">
              <h3>{movie.title}</h3>
              <p>{movie.genre} • ⭐ {movie.rating}</p>
              <button className="trending-play-btn">▶ Play</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;