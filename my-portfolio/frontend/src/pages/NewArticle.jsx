import { useState } from "react";
import api from "../lib/api.js";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/articles", { title, body });
      setTitle("");
      setBody("");
      setMsg("Article publié !");
    } catch (e) {
      setMsg(e.response?.data?.error || "Erreur");
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Nouvel article</h2>
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
