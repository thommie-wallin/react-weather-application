import React from "react";

const HeroCard = ({ title, children }) => {
  return (
    <section className="hero-card">
      <header className="hero-card-header">
        <h3>{title}</h3>
      </header>
      <article className="card-content">{children}</article>
    </section>
  );
};

export default HeroCard;
