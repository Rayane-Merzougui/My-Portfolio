import React from "react";
const SignIn = () => {
  return (
    <div>
      <form
        action="http://localhost:8000"
        method="post"
        entype="multipart/form-data"
      >
        <label htmlFor="name">Nom d'utilisateur</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="email">Email de l'utilisateur</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Mot de passe de l'utilisateur</label>
        <input name="password" type="password" id="password" />
        <input type="submit" name="signIN" value="Inscription" />
      </form>
    </div>
  );
};

export default SignIn;
