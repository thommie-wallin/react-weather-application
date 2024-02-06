import React from "react";

const HeroCard = ({ title, timeOfUpdate, children }) => {
  return (
    <section className="hero-card">
      <header className="hero-card-header">
        <h1>{title}</h1>
        <span>Updated {timeOfUpdate}</span>
      </header>
      <article className="card-content">{children}</article>
    </section>
  );
};

export default HeroCard;
