import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions';
import Card from '../card/card';
import Loading from '../loading/loading';
import './cards.css';

const POKEMON_PER_PAGE = 18;

const Cards = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(allPokemons.length / POKEMON_PER_PAGE));
  const indexOfLastPokemon = currentPage * POKEMON_PER_PAGE;
  const currentPokemon = allPokemons.slice(indexOfLastPokemon - POKEMON_PER_PAGE, indexOfLastPokemon);

  useEffect(() => {
    dispatch(getPokemons())
      .catch(() => setErrorMessage('No se pudieron cargar los pokemons.'))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  // Al buscar o filtrar cambia la lista: volvemos a la primera página.
  useEffect(() => {
    setCurrentPage(1);
  }, [allPokemons]);

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (errorMessage) return <p role="alert">{errorMessage}</p>;
    return currentPokemon.map((pokemon) => (
      <Card
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        imagen={pokemon.imagen}
        hp={pokemon.hp}
        attack={pokemon.attack}
        speed={pokemon.speed}
        type={(pokemon.types || []).map((type) => type.name).join(', ')}
      />
    ));
  };

  return (
    <div>
      <div className="pagination-buttons">
        <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
      <div className="card-container">{renderContent()}</div>
    </div>
  );
};

export default Cards;
