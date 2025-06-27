import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
const Home = () => {
  return (
    <div>
      <Logo />
      <section className="sec">
        <Navigation />
        <h1>Acceil</h1>
      </section>
    </div>
  );
};

export default Home;
