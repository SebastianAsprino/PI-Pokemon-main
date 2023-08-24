import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../card/card";
import Filter from "../filter/filter";
import styles from "../Cards/Cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const pokemonPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className={styles.cards_container}>
      <div className={styles.card_filters}>
      <Filter/> 
      </div>
      <div className={styles.cards}>
        {currentPokemon.map((individualPokemon) => (
          <Card
            id={individualPokemon.id}
            name={individualPokemon.name}
            imagen={individualPokemon.imagen}
            type={individualPokemon.types.map((type) => type.name).join(', ')}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)} disabled={currentPokemon.length < pokemonPerPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;