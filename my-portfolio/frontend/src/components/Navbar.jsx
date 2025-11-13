import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useRef, useState } from "react";

export default function Navbar() {
  const { user, logout, uploadAvatar } = useAuth();
  const fileRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onPick = () => fileRef.current?.click();
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Mon Portfolio
        </Link>
      </div>

      <button
        className="hamburger-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "var(--text)",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      <div className={`nav-right ${isMenuOpen ? "mobile-open" : ""}`}>
        {!user ? (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Connexion
            </Link>
            <Link
              to="/register"
              className="btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Inscription
            </Link>
          </>
        ) : (
          <div className="user-box">
            <span className="name">{user.name}</span>
            <img
              className="avatar"
              src={
                user.avatar_url
                  ? `http://localhost:8000${user.avatar_url}`
                  : "https://via.placeholder.com/40"
              }
              alt="avatar"
              onClick={onPick}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onChange}
            />
            <Link
              to="/new"
              className="btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Nouvel article
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="link"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
