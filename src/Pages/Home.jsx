import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import { movies } from "../Data/MoviesData";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import "./Home.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addToContinueWatching } = useProfile();

  return (
    <div className="card" onClick={() => { addToContinueWatching(movie); navigate(`/watch/${movie.id}`); }}>
      <img src={movie.img} alt={movie.title} onError={(e) => e.target.src = "https://via.placeholder.com/300x170/1a1a2e/fff?text=" + movie.title} />
      <div className="card-overlay">
        <p className="card-title">{movie.title}</p>
        <p className="card-genre">{movie.genre}</p>
        <button className="card-play">▶ Play</button>
      </div>
    </div>
  );
}

function MovieRow({ title, movieList }) {
  return (
    <div className="row">
      <h2 className="row-heading">{title}</h2>
      <div className="row-scroll">
        {movieList.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const { activeProfile, continueWatching } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home-page">

      {/* HERO BANNER */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80"
          alt="hero"
          className="hero-bg"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-tag">🔥 #1 in India Today</p>
          <h1 className="hero-title">Stranger Things</h1>
          <p className="hero-desc">
            When a boy disappears, his friends and family must confront
            terrifying supernatural forces to get him back.
          </p>
          <div className="hero-btns">
            <button className="btn-white" onClick={() => navigate("/watch/1")}>
              ▶ Play
            </button>
            <button
              className="btn-gray"
              onClick={() => alert(`🎬 Stranger Things\n\nGenre: Sci-Fi | Thriller\nRating: ⭐ 8.7/10\nYear: 2016\n\nWhen a boy disappears, his friends, family and local police must confront terrifying supernatural forces in order to get him back.`)}
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      <div className="home-rows">

        {/* CONTINUE WATCHING */}
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

        <MovieRow title="🔥 Trending Now" movieList={movies.trending} />
        <MovieRow title="💥 Action & Adventure" movieList={movies.action} />
        <MovieRow title="😂 Comedy & Romance" movieList={movies.comedy} />
        <MovieRow title="⭐ Top Picks" movieList={[...movies.trending].reverse()} />

        <Footer />

      </div>
    </div>
  );
}

export default Home;