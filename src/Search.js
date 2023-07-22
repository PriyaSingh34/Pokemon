import React, { useState } from "react";
import axios from "axios";
import "./style1.css";

const SearchPage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching Pokémon. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div>
      <input
        className="search-input"
        type="text"
        placeholder="Enter the pokemon name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {searchResult && (
        <>
    <div className="pokemon-details1">
          <div className="pokemon-details">
            <h2 className="pokemon-name">{searchResult.name}</h2>
            <img
              className="pokemon-image"
              src={searchResult.sprites.other.dream_world.front_default}
              alt={searchResult.name}
            />
          </div>
          <div className="abilities">
            {searchResult.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          <div className="base-stat">
            {searchResult.stats.map((poke) => {
              return (
                <>
                  <h3>
                    {poke.stat.name}:{poke.base_stat}
                  </h3>
                </>
              );
            })}
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
