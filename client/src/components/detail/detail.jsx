import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import useImageLoaded from '../../hooks/useImageLoaded';
import Loading from '../loading/loading';
import './detail.css';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.detail);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const imageLoaded = useImageLoaded(pokemonDetail.imagen);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    dispatch(getDetail(id))
      .catch((error) => setErrorMessage(error.message || 'No se pudo cargar el pokemon'))
      .finally(() => setLoading(false));
  }, [dispatch, id]);

  const homeButton = (
    <div>
      <button>
        <Link to="/home">HOME</Link>
      </button>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <div className="container">
        <div className="textContainer">
          {homeButton}
          <h1>{errorMessage}</h1>
        </div>
      </div>
    );
  }

  if (!imageLoaded) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="textContainer">
        {homeButton}
        <h1>ID: {pokemonDetail.id}</h1>
        <h1>Pokemon: {pokemonDetail.name}</h1>
        <h2>HP: {pokemonDetail.hp}</h2>
        <h2>ATTACK: {pokemonDetail.attack}</h2>
        <h2>DEFENSE: {pokemonDetail.defense}</h2>
        <h2>SPEED: {pokemonDetail.speed}</h2>
        <h2>HEIGHT: {pokemonDetail.height}</h2>
        <h2>WEIGHT: {pokemonDetail.weight}</h2>
        <h2>Types: {pokemonDetail.types?.map((t) => t.name).join(', ')}</h2>
        <h2>
          DB Create: {pokemonDetail.createdByDB ? 'Created by database' : 'Not created by database'}
        </h2>
      </div>
      <div className="imageContainer">
        <img src={pokemonDetail.imagen} alt={`Imagen del pokemon ${pokemonDetail.name}`} />
      </div>
    </div>
  );
}

export default Detail;
