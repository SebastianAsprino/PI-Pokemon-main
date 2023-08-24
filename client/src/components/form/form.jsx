import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postpokemon, getPokemons, getTypes } from "../../redux/actions";

function CreatePokemon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    imagen: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: []
  });

  const [nameError, setNameError] = useState("");


  const allPokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const getNextId = () => {
    const highestId = allPokemons.reduce((maxId, pokemon) => Math.max(maxId, pokemon.id), 0);
    return highestId + 1;
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: getNextId().toString()
    }));
  }, [allPokemons]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameAvailable = allPokemons.every(pokemon => pokemon.name !== formData.name);

    if (!formData.name) {
      setNameError("Please enter a name");
    } else if (!isNameAvailable) {
      setNameError("Name is not available");
    } else {

      const finalFormData = {
        ...formData,
        imagen: formData.imagen || "https://w7.pngwing.com/pngs/897/749/png-transparent-pokemon-icon-design-symbol-sign-type-flat-game-cartoon-raining-thumbnail.png",
        hp: formData.hp || 0,
        attack: formData.attack || 0,
        defense: formData.defense || 0,
        speed: formData.speed || 0,
        height: formData.height || 0,
        weight: formData.weight || 0
      };

      dispatch(postpokemon(finalFormData));
      navigate("/home");
    }
  };


  const handleTypeChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setFormData(prevData => ({
        ...prevData,
        types: [...prevData.types, value]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        types: prevData.types.filter(type => type !== value)
      }));
    }
  };

  return (
    <div>
      <h1>Create a New Pokemon</h1>
      {nameError && <p style={{ color: "red" }}>{nameError}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder='your poke name'
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setNameError("");
          }}
        />
        <label>Image:</label>
        <input
          type="text"
          placeholder='URL from your pokemon'
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
        />
        <label>HP:</label>
        <input
          type="number"
          value={formData.hp}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= 0) {
              setFormData({ ...formData, hp: newValue });
            }
          }}
        />
        <label>Attack:</label>
        <input
          type="number"
          value={formData.attack}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= 0) {
              setFormData({ ...formData, attack: newValue });
            }
          }}
        />
        
        <label>Defense:</label>
        <input
          type="number"
          value={formData.defense}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= 0) {
              setFormData({ ...formData, defense: newValue });
            }
          }}
        />
        
        <label>Speed:</label>
        <input
          type="number"
          value={formData.speed}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= 0) {
              setFormData({ ...formData, speed: newValue });
            }
          }}
        />
        
        <label>Height:</label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= 0) {
              setFormData({ ...formData, height: newValue });
            }
          }}
        />
        
        <label>Weight:</label>
        <input
          type="number"
          value={formData.weight}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue >= 0) {
              setFormData({ ...formData, weight: newValue });
            }
          }}
        />
        <label>Types:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="normal"
              checked={formData.types.includes("normal")}
              onChange={handleTypeChange}
            />
            normal
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="fighting"
              checked={formData.types.includes("fighting")}
              onChange={handleTypeChange}
            />
            fighting
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="flying"
              checked={formData.types.includes("flying")}
              onChange={handleTypeChange}
            />
            flying
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="poison"
              checked={formData.types.includes("poison")}
              onChange={handleTypeChange}
            />
            poison
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="ground"
              checked={formData.types.includes("ground")}
              onChange={handleTypeChange}
            />
            ground
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="rock"
              checked={formData.types.includes("rock")}
              onChange={handleTypeChange}
            />
            rock
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="bug"
              checked={formData.types.includes("bug")}
              onChange={handleTypeChange}
            />
            bug
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="ghost"
              checked={formData.types.includes("ghost")}
              onChange={handleTypeChange}
            />
            ghost
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="steel"
              checked={formData.types.includes("steel")}
              onChange={handleTypeChange}
            />
            steel
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="fire"
              checked={formData.types.includes("fire")}
              onChange={handleTypeChange}
            />
            fire
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="water"
              checked={formData.types.includes("water")}
              onChange={handleTypeChange}
            />
            water
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="grass"
              checked={formData.types.includes("grass")}
              onChange={handleTypeChange}
            />
            grass
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="electric"
              checked={formData.types.includes("electric")}
              onChange={handleTypeChange}
            />
            electric
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="psychic"
              checked={formData.types.includes("psychic")}
              onChange={handleTypeChange}
            />
            psychic
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="ice"
              checked={formData.types.includes("ice")}
              onChange={handleTypeChange}
            />
            ice
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="dragon"
              checked={formData.types.includes("dragon")}
              onChange={handleTypeChange}
            />
            dragon
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="dark"
              checked={formData.types.includes("dark")}
              onChange={handleTypeChange}
            />
            dark
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="fairy"
              checked={formData.types.includes("fairy")}
              onChange={handleTypeChange}
            />
            fairy
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="unknown"
              checked={formData.types.includes("unknown")}
              onChange={handleTypeChange}
            />
            unknown
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="shadow"
              checked={formData.types.includes("shadow")}
              onChange={handleTypeChange}
            />
            shadow
          </label>
        </div>
        
        <button type="submit">Create Pokemon</button>
      </form>
      <Link to="/home">Back to home</Link>
    </div>
  );
}

export default CreatePokemon;
