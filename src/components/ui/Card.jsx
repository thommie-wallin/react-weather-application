import React from "react";

const Card = ({ title, children }) => {
  return (
    <section className="card">
      <header className="card-header">
        <h3>{title}</h3>
      </header>
      <article className="card-content">{children}</article>
    </section>
  );
};

export default Card;
