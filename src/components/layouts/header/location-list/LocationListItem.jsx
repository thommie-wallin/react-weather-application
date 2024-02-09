import React from "react";

const LocationListItem = ({ isActive, onClick, children }) => {
  return (
    <div className={`location-list-item ${isActive && "active"}`}>
      <a href="#" onClick={onClick} className="location-list-link">
        <span className="location-list-item-text">{children}</span>
      </a>
      <div className="location-list-button-container">
        <button className="location-list-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LocationListItem;
