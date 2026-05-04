import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import { allMovies } from "../Data/MoviesData";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import "./Home.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addToContinueWatching, addToWatchlist, isInWatchlist } = useProfile();

  return (
    <div className="card" onClick={() => { addToContinueWatching(movie); navigate(`/watch/${movie.id}`); }}>
      <img src={movie.img} alt={movie.title} />
      <div className="card-overlay">
        <p className="card-title">{movie.title}</p>
        <p className="card-genre">⭐ {movie.rating}</p>
        <div style={{ display: "flex", gap: "6px" }}>
          <button className="card-play">▶ Play</button>
          <button
            className="card-watchlist"
            onClick={(e) => {
              e.stopPropagation();
              addToWatchlist(movie);
            }}
          >
            {isInWatchlist(movie.id) ? "✅" : "➕"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MovieRow({ title, movies }) {
  return (
    <div className="row">
      <h2 className="row-heading">{title}</h2>
      <div className="row-scroll">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const { activeProfile, continueWatching } = useProfile();
  const navigate = useNavigate();

  const trending = allMovies.slice(0, 6);
  const action = allMovies.filter(m => m.genre === "Action");
  const comedy = allMovies.filter(m => m.genre === "Comedy");
  const thriller = allMovies.filter(m => m.genre === "Thriller");
  const drama = allMovies.filter(m => m.genre === "Drama");
  const featured = allMovies[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home-page">
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80"
          alt="hero"
          className="hero-bg"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-tag">🔥 #1 in India Today</p>
          <h1 className="hero-title">{featured.title}</h1>
          <p className="hero-desc">
            Watch the most popular shows and movies on CinePlay.
          </p>
          <div className="hero-btns">
            <button className="btn-white" onClick={() => navigate(`/watch/${featured.id}`)}>
              ▶ Play
            </button>
            <button className="btn-gray" onClick={() => alert(`🎬 ${featured.title}\n\nGenre: ${featured.genre}\nRating: ⭐ ${featured.rating}/10`)}>
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      <div className="home-rows">
        {continueWatching.length > 0 && (
          <div className="row">
            <h2 className="row-heading">▶ Continue Watching for {activeProfile?.name}</h2>
            <div className="row-scroll">
              {continueWatching.map((m) => (
                <div key={m.id} className="continue-item" onClick={() => navigate(`/watch/${m.id}`)}>
                  <img src={m.img} alt={m.title} />
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${m.progress}%` }} />
                  </div>
                  <p>{m.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <MovieRow title="🔥 Trending Now" movies={trending} />
        <MovieRow title="💥 Action" movies={action} />
        <MovieRow title="😂 Comedy" movies={comedy} />
        <MovieRow title="😱 Thriller" movies={thriller} />
        <MovieRow title="🎭 Drama" movies={drama} />
        <MovieRow title="⭐ Top Picks" movies={allMovies.slice(10, 16)} />

        <Footer />
      </div>
    </div>
  );
}

export default Home;