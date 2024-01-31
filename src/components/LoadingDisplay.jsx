import React from "react";
import Card from "./ui/Card";

const LoadingDisplay = () => {
  return (
    <section className="skeleton-card">
      <header className="skeleton-header">
        <p className="skeleton-header-content"></p>
      </header>
      <article className="skeleton-content"></article>
      <footer className="skeleton-footer"></footer>
    </section>
  );
};

export default LoadingDisplay;
