import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import "./Banner.css";

function Banner() {
  const navigate = useNavigate();
  const { addToContinueWatching } = useProfile();

  const featuredMovie = {
    id: 99,
    title: "Stranger Things",
    description:
      "When a boy disappears, his friends, family and local police must confront terrifying supernatural forces in order to get him back.",
    img: "https://via.placeholder.com/1280x500/1a1a2e/e50914?text=Stranger+Things",
    genre: "Sci-Fi | Thriller",
    rating: 8.7,
  };

  const handlePlay = () => {
    addToContinueWatching(featuredMovie);
    navigate(`/watch/${featuredMovie.id}`);
  };

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${featuredMovie.img})` }}
    >
      <div className="banner-overlay" />
      <div className="banner-content">
        <p className="banner-genre">{featuredMovie.genre}</p>
        <h1 className="banner-title">{featuredMovie.title}</h1>
        <p className="banner-desc">{featuredMovie.description}</p>
        <div className="banner-buttons">
          <button className="btn-play" onClick={handlePlay}>
            ▶ Play
          </button>
          <button className="btn-info">ℹ More Info</button>
        </div>
        <div className="banner-rating">⭐ {featuredMovie.rating} / 10</div>
      </div>
    </div>
  );
}

export default Banner;