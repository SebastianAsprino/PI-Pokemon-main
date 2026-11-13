import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useImageLoaded from '../../hooks/useImageLoaded';
import loader from './loader.svg';
import './card.css';

function Card({ id, name, imagen, hp, attack, speed, type }) {
  const imageLoaded = useImageLoaded(imagen);

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
              {imageLoaded ? (
                <img src={imagen} alt={name} />
              ) : (
                <img src={loader} alt="Loading" />
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

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  imagen: PropTypes.string,
  hp: PropTypes.number,
  attack: PropTypes.number,
  speed: PropTypes.number,
  type: PropTypes.string,
};

export default Card;
