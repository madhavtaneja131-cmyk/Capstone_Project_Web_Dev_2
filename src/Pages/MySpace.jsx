import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import "./MySpace.css";

function MySpace() {
  const {
    activeProfile,
    watchlist,
    addToWatchlist,
    myVideos,
    addMyVideo,
    continueWatching,
  } = useProfile();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addMyVideo({
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        url: url,
        type: "local",
      });
    }
  };

  return (
    <div className="myspace-page">

      {/* PROFILE HEADER */}
      <div className="myspace-header">
        <div
          className="myspace-avatar"
          style={{ backgroundColor: activeProfile?.color }}
        >
          {activeProfile?.avatar}
        </div>
        <div>
          <h1 className="myspace-name">{activeProfile?.name}'s Space</h1>
          <p className="myspace-sub">Your personal entertainment hub</p>
        </div>
      </div>

      {/* STATS */}
      <div className="myspace-stats">
        <div className="stat-card">
          <h2>{watchlist.length}</h2>
          <p>Watchlist</p>
        </div>
        <div className="stat-card">
          <h2>{continueWatching.length}</h2>
          <p>Continue Watching</p>
        </div>
        <div className="stat-card">
          <h2>{myVideos.length}</h2>
          <p>My Videos</p>
        </div>
      </div>

      {/* WATCHLIST */}
      <div className="myspace-section">
        <h2 className="section-title">🎬 My Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="empty-msg">No movies in watchlist yet! Add from Home page.</p>
        ) : (
          <div className="myspace-grid">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="myspace-card"
                onClick={() => navigate(`/watch/${movie.id}`)}
              >
                <img src={movie.img} alt={movie.title} />
                <div className="myspace-card-info">
                  <p className="myspace-card-title">{movie.title}</p>
                  <p className="myspace-card-genre">{movie.genre} • ⭐ {movie.rating}</p>
                  <div className="myspace-card-btns">
                    <button
                      className="ms-play-btn"
                      onClick={(e) => { e.stopPropagation(); navigate(`/watch/${movie.id}`); }}
                    >
                      ▶ Play
                    </button>
                    <button
                      className="ms-remove-btn"
                      onClick={(e) => { e.stopPropagation(); addToWatchlist(movie); }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CONTINUE WATCHING */}
      <div className="myspace-section">
        <h2 className="section-title">▶ Continue Watching</h2>
        {continueWatching.length === 0 ? (
          <p className="empty-msg">Nothing to continue yet!</p>
        ) : (
          <div className="myspace-grid">
            {continueWatching.map((movie) => (
              <div
                key={movie.id}
                className="myspace-card"
                onClick={() => navigate(`/watch/${movie.id}`)}
              >
                <img src={movie.img} alt={movie.title} />
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${movie.progress}%` }}
                  />
                </div>
                <div className="myspace-card-info">
                  <p className="myspace-card-title">{movie.title}</p>
                  <p className="myspace-card-genre">⭐ {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MY VIDEOS */}
      <div className="myspace-section">
        <h2 className="section-title">📹 My Videos</h2>
        <button
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
        >
          ➕ Upload Video
        </button>
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleVideoUpload}
        />

        {myVideos.length === 0 ? (
          <p className="empty-msg">No videos uploaded yet!</p>
        ) : (
          <div className="myspace-videos">
            {myVideos.map((video) => (
              <div key={video.id} className="my-video-card">
                <video
                  src={video.url}
                  controls
                  className="my-video-player"
                />
                <p className="my-video-title">{video.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default MySpace;