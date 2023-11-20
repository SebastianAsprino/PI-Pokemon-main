import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import Loading from "../loading/loading";
import "./detail.css";
import loader from "./loader.svg";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.detail);
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    setLoading(true);

    dispatch(getDetail(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon detail:", error);
        setLoading(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    setLoadingImage(true);

    const image = new Image();
    image.onload = () => {
      setLoadingImage(false);
    };
    image.src = pokemonDetail.imagen;
  }, [pokemonDetail.imagen]);

  if (loading || loadingImage) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="textContainer">
        <div>
          <button>
            <Link to="/home">HOME</Link>
          </button>
        </div>
        <h1>ID: {pokemonDetail.id}</h1>
        <h1>Pokemon: {pokemonDetail.name}</h1>
        <h2>HP: {pokemonDetail.hp}</h2>
        <h2>ATTACK: {pokemonDetail.attack}</h2>
        <h2>DEFENSE: {pokemonDetail.defense}</h2>
        <h2>SPEED: {pokemonDetail.speed}</h2>
        <h2>HEIGHT: {pokemonDetail.height}</h2>
        <h2>WEIGHT: {pokemonDetail.weight}</h2>
        <h2>Types: {pokemonDetail.types?.map((t) => t.name).join(", ")}</h2>
        <h2>
          DB Create: {pokemonDetail.createdByDB ? "Created by database" : "Not created by database"}
        </h2>
      </div>
      <div className="imageContainer">
        {loadingImage ? (
          <img src={loader} alt="Loading" />
        ) : (
          <img src={pokemonDetail.imagen} alt={`Imagen del pokemon ${pokemonDetail.name}`} />
        )}
      </div>
    </div>
  );
}

export default Detail;

