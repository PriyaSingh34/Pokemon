import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${500}`);
      const newPokemonList = response.data.results;
      setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      setOffset((prevOffset) => prevOffset + limit);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.log('Error fetching Pokémon list:', error);
    }
  };

  const loadMorePokemon = () => {
    fetchPokemonList();
  };

  return (
    <div className='main'>
      <h2>Pokémon List</h2>
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={loadMorePokemon}
        hasMore={hasMore}
        loader={<p>Loading more Pokémon...</p>}
      >
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <img className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
              <h3 className="pokemon-name">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ListingPage;
