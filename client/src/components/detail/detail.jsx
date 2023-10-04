import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";



function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <button>
          <Link to="/home">HOME</Link>
        </button>
      </div>
      <h1>ID: {pokemonDetail.id}</h1>
      <h1>Pokemon: {pokemonDetail.name}</h1>
      <img  src={pokemonDetail.imagen}/>
      <h2>HP: {pokemonDetail.hp}</h2>
      <h2>ATTACK: {pokemonDetail.attack}</h2>
      <h2>DEFENSE: {pokemonDetail.defense}</h2>
      <h2>SPEED: {pokemonDetail.speed}</h2>
      <h2>HEIGHT: {pokemonDetail.height}</h2>
      <h2>WEIGHT: {pokemonDetail.weight}</h2>
      <h2>Types: {pokemonDetail.types?.map(t => t.name).join(', ')}</h2>
    </div>
  );
}

export default Detail;
