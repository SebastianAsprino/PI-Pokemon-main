import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../card/card";
import Loading from "../loading/loading";
import './cards.css'


const Cards = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const pokemonPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  useEffect(() => {
    // Realiza la llamada a la API aquí
    dispatch(getPokemons())
      .then(() => {
        // La llamada a la API se ha completado, establece isLoading en falso
        setIsLoading(false);
      });
  }, []);

  return (
    <div >
      <div>
        <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)} disabled={currentPokemon.length < pokemonPerPage}>
          Next
        </button>
      </div>
      <div className="card-container">
        {isLoading ? ( // Si isLoading es verdadero, muestra "Cargando"
          <Loading />
        ) : (
          currentPokemon.map((individualPokemon) => (
            <Card className="card"
              id={individualPokemon.id}
              name={individualPokemon.name}
              imagen={individualPokemon.imagen}
              hp={individualPokemon.hp}
              attack={individualPokemon.attack}
              speed={individualPokemon.speed}
              type={individualPokemon.types.map((type) => type.name).join(', ')}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Cards;