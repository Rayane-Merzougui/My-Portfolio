import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useRef } from "react";

export default function Navbar() {
  const { user, logout, uploadAvatar } = useAuth();
  const fileRef = useRef();

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
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register" className="btn">
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
                  ? `http://127.0.0.1:8000${user.avatar_url}`
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
            <Link to="/new" className="btn">
              Nouvel article
            </Link>
            <button onClick={logout} className="link">
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
