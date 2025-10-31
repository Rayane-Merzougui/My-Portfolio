import { useState } from "react";
import api from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx"; // ← Ajoutez cette ligne

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useAuth(); // ← Récupérez l'utilisateur

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Debug: vérifiez l'état de l'utilisateur
    console.log("User auth state:", user);

    if (!user) {
      setMsg("Erreur: Vous n'êtes pas connecté");
      return;
    }

    try {
      console.log("Sending article creation request...");
      const response = await api.post("/articles", { title, body });
      console.log("Article creation response:", response);

      setTitle("");
      setBody("");
      setMsg("Article publié !");
    } catch (e) {
      console.error("Article creation error:", e);
      setMsg(e.response?.data?.error || "Erreur");
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Nouvel article</h2>
      {user && (
        <div style={{ color: "green" }}>Connecté en tant que: {user.name}</div>
      )}
      {!user && <div style={{ color: "red" }}>Non connecté</div>}
      {msg && <div className="info">{msg}</div>}
      <input
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenu"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
      />
      <button className="btn">Publier</button>
    </form>
  );
}
