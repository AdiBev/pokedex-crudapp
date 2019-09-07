import { combineReducers } from "redux";

import postPokemonReducer from "./reducer_postPokemon";
import paginationDataReducer from "./reducer_paginationData";
import updatePokemonReducer from "./reducer_updatePokemon";
import pokemonDataReducer from "./reducer_pokemonData";
import nearbyPokemonsReducer from "./reducer_nearbyPokemons";

const rootReducer = combineReducers({
  postStatus: postPokemonReducer,
  updateStatus: updatePokemonReducer,
  paginationData: paginationDataReducer,
  pokemonList: pokemonDataReducer,
  nearbyPokemons: nearbyPokemonsReducer
});

export default rootReducer;
