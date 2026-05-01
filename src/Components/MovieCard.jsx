import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addToContinueWatching } = useProfile();

  const handleClick = () => {
    addToContinueWatching(movie);
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movie.img} alt={movie.title} className="movie-card-img" />
      <div className="movie-card-overlay">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-genre">{movie.genre}</p>
        <div className="movie-card-actions">
          <button className="card-play-btn">▶ Play</button>
          <span className="card-rating">⭐ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;