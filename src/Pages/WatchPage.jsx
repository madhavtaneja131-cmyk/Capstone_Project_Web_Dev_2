import { useParams, useNavigate } from "react-router-dom";
import { allMovies } from "../Data/MoviesData";
import "./WatchPage.css";

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = allMovies.find((m) => m.id === parseInt(id));
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie?.title + " official trailer")}`;

  return (
    <div className="watch-page">
      <div className="watch-topbar">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <span className="watch-movie-name">
          {movie?.title || "Now Playing"}
        </span>
      </div>

      <div className="video-box">
        <div className="video-screen">
          <img
            src={movie?.img}
            alt={movie?.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.4,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <div style={{
            position: "absolute",
            textAlign: "center",
            zIndex: 2,
          }}>
            <div className="play-triangle">▶</div>
            <p className="now-playing">NOW PLAYING</p>
            <p className="movie-name-screen">{movie?.title}</p>
            <button
              className="open-yt-btn"
              onClick={() => window.open(trailerUrl, "_blank")}
            >
              🎬 Watch "{movie?.title}" Trailer
            </button>
          </div>
        </div>

        <div className="controls">
          <div className="controls-left">
            <button
              className="ctrl"
              onClick={() => window.open(trailerUrl, "_blank")}
            >
              ▶ Play Trailer
            </button>
            <span className="time">Trailer</span>
          </div>
          <div className="controls-right">
            <button className="ctrl">🔊</button>
          </div>
        </div>
      </div>

      <div className="watch-info">
        <div className="watch-info-left">
          <h2>{movie?.title || "Now Playing"}</h2>
          <p className="watch-genre">
            {movie?.genre} • ⭐ {movie?.rating}
          </p>
          <p className="watch-desc">
            Click the button above to watch the official trailer on YouTube.
          </p>
          <div className="watch-tags">
            <span className="tag">HD</span>
            <span className="tag">5.1</span>
            <span className="tag">18+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchPage;