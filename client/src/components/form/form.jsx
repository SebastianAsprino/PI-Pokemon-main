import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postpokemon, getPokemons } from "../../redux/actions";

const DEFAULT_IMAGE =
  "https://w7.pngwing.com/pngs/897/749/png-transparent-pokemon-icon-design-symbol-sign-type-flat-game-cartoon-raining-thumbnail.png";

const STAT_FIELDS = [
  { name: "hp", label: "HP" },
  { name: "attack", label: "Attack" },
  { name: "defense", label: "Defense" },
  { name: "speed", label: "Speed" },
  { name: "height", label: "Height" },
  { name: "weight", label: "Weight" },
];

const POKEMON_TYPES = [
  "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire",
  "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "unknown", "shadow",
];

const INITIAL_FORM = {
  name: "",
  imagen: "",
  hp: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  types: [],
};

function CreatePokemon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPokemons = useSelector((state) => state.pokemons);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    dispatch(getPokemons()).catch(() => {});
  }, [dispatch]);

  // El ID del nuevo pokemon es el siguiente al mayor ID existente.
  const nextId = useMemo(
    () => allPokemons.reduce((maxId, pokemon) => Math.max(maxId, pokemon.id), 0) + 1,
    [allPokemons],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const isNameAvailable = allPokemons.every((pokemon) => pokemon.name !== name);

    if (!name) {
      setNameError("Please enter a name");
      return;
    }
    if (!isNameAvailable) {
      setNameError("Name is not available");
      return;
    }

    const stats = Object.fromEntries(
      STAT_FIELDS.map(({ name: field }) => [field, formData[field] || 0]),
    );

    try {
      await dispatch(postpokemon({
        ...formData,
        ...stats,
        id: nextId,
        name,
        imagen: formData.imagen || DEFAULT_IMAGE,
      }));
      navigate("/home");
    } catch (error) {
      setNameError(`No se pudo crear el pokemon: ${error.message}`);
    }
  };

  const handleStatChange = (field) => (e) => {
    const { value } = e.target;
    if (value === "") {
      setFormData((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    const newValue = parseInt(value, 10);
    if (!Number.isNaN(newValue) && newValue >= 0) {
      setFormData((prev) => ({ ...prev, [field]: newValue }));
    }
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      types: checked ? [...prev.types, value] : prev.types.filter((type) => type !== value),
    }));
  };

  return (
    <div>
      <h1>Create a New Pokemon</h1>
      {nameError && <p style={{ color: "red" }}>{nameError}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-name">Name:</label>
        <input
          id="pokemon-name"
          type="text"
          placeholder="your poke name"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
            setNameError("");
          }}
        />
        <label htmlFor="pokemon-imagen">Image:</label>
        <input
          id="pokemon-imagen"
          type="text"
          placeholder="URL from your pokemon"
          value={formData.imagen}
          onChange={(e) => setFormData((prev) => ({ ...prev, imagen: e.target.value }))}
        />

        {STAT_FIELDS.map(({ name, label }) => (
          <Fragment key={name}>
            <label htmlFor={`pokemon-${name}`}>{label}:</label>
            <input
              id={`pokemon-${name}`}
              type="number"
              min="0"
              value={formData[name]}
              onChange={handleStatChange(name)}
            />
          </Fragment>
        ))}

        <fieldset>
          <legend>Types:</legend>
          {POKEMON_TYPES.map((type) => (
            <div key={type}>
              <label>
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.types.includes(type)}
                  onChange={handleTypeChange}
                />
                {type}
              </label>
            </div>
          ))}
        </fieldset>

        <button type="submit">Create Pokemon</button>
      </form>
      <Link to="/home">Back to home</Link>
    </div>
  );
}

export default CreatePokemon;
