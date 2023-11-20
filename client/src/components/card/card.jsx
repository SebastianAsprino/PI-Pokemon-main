import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loader from "./loader.svg";
import './card.css';

function Card({ id, name, imagen, hp, attack, speed, type }) {
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    setLoadingImage(true);

    const image = new Image();
    image.onload = () => {
      setLoadingImage(false);
    };
    image.src = imagen;
  }, [imagen]);

  return (
    <div>
      <Link to={`/pokemons/${id}`}>
        <div className="card">
          <div className="content">
            <div className="top">
              <p>{name}</p>
              <div className="color"></div>
            </div>
            <div className="middle">
              <div>
                <p>Type:</p>
                <p>{type}</p>
              </div>
              {loadingImage ? (
                <img src={loader} alt="Loading" />
              ) : (
                <img src={imagen} alt={name} />
              )}
            </div>
            <div className="bottom">
              <div>
                <p>HP</p>
                <p>{hp}</p>
              </div>
              <div>
                <p>ATK</p>
                <p>{attack}</p>
              </div>
              <div>
                <p>SPD</p>
                <p>{speed}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
