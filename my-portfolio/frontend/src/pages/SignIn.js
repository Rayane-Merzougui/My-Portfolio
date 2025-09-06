import React, { useState } from "react";
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Veuillez remplir toutes les cases !");
      return;
    }
    fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse du serveur :", data);
        alert("Inscription réussie !");
      })
      .catch((err) => console.error("Erreur :", err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom d'utilisateur</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email de l'utilisateur</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Mot de passe de l'utilisateur</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default SignIn;
