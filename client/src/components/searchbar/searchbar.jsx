import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = pokemon.trim();
    if (!name) {
      setMessage('Escribí un nombre para buscar');
      return;
    }

    setMessage('');
    dispatch(getPokemonByName(name))
      .then(() => setPokemon(''))
      .catch(() => setMessage('Pokemon no encontrado'));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar pokemon"
          aria-label="Buscar pokemon"
          value={pokemon}
          onChange={(event) => setPokemon(event.target.value)}
        />
        <button type="submit">SEARCH</button>
      </form>
      {message && <small role="alert">{message}</small>}
    </div>
  );
}
