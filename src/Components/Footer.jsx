import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">CinePlay</h2>
        <p className="footer-tagline">Watch anywhere. Cancel anytime.</p>
      </div>

      <div className="footer-links">
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Jobs</a>
          <a href="#">Press</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
          <a href="#">Account</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 CinePlay — Made with ❤️ as Capstone Project</p>
      </div>
    </footer>
  );
}

export default Footer;