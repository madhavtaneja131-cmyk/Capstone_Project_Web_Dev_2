import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="netflix-loader">
        <span>N</span>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
}

export default Loader;