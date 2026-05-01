import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../Data/MoviesData";
import "./WatchPage.css";

// Saari movies ek array mein
const allMovies = [
  ...movies.trending,
  ...movies.action,
  ...movies.comedy,
];

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentMovie = allMovies.find((m) => m.id === parseInt(id));
  const currentIndex = allMovies.findIndex((m) => m.id === parseInt(id));
  const nextMovie = allMovies[currentIndex + 1];

  const handleFullscreen = () => {
    const elem = document.querySelector(".video-box");
    if (elem.requestFullscreen) elem.requestFullscreen();
  };

  return (
    <div className="watch-page">

      {/* BACK BUTTON — navbar ke neeche */}
      <div className="watch-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span className="watch-movie-name">
          {currentMovie?.title || `Movie ID: ${id}`}
        </span>
      </div>

      {/* VIDEO PLAYER */}
      <div className="video-box">
        <div className="video-screen">
          <div className="play-triangle">▶</div>
          <p className="now-playing">Now Playing</p>
          <p className="movie-name-screen">
            {currentMovie?.title || `Movie ID: ${id}`}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="controls">
          <div className="controls-left">
            <button className="ctrl">▶ Play</button>
            {nextMovie && (
              <button
                className="ctrl"
                onClick={() => navigate(`/watch/${nextMovie.id}`)}
              >
                ⏭ Next: {nextMovie.title}
              </button>
            )}
            <span className="time">24:35 / 1:02:10</span>
          </div>
          <div className="controls-right">
            <button className="ctrl">🔊</button>
            <button className="ctrl" onClick={handleFullscreen}>
              ⛶ Fullscreen
            </button>
          </div>
        </div>
      </div>

      {/* MOVIE INFO */}
      <div className="watch-info">
        <div className="watch-info-left">
          <h2>{currentMovie?.title || `Movie ID: ${id}`}</h2>
          <p className="watch-genre">{currentMovie?.genre} • ⭐ {currentMovie?.rating}</p>
          <p className="watch-desc">
            Enjoy watching this amazing content on Netflex.
            Real project mein movie ka description yahan aayega.
          </p>
          <div className="watch-tags">
            <span className="tag">HD</span>
            <span className="tag">5.1</span>
            <span className="tag">18+</span>
          </div>
        </div>

        {/* NEXT MOVIE SUGGESTION */}
        {nextMovie && (
          <div
            className="next-suggestion"
            onClick={() => navigate(`/watch/${nextMovie.id}`)}
          >
            <p className="next-label">Next Episode →</p>
            <img src={nextMovie.img} alt={nextMovie.title} />
            <p className="next-title">{nextMovie.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchPage;