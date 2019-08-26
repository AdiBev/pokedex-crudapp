import { combineReducers } from "redux";

import postPokemonReducer from "./reducer_postPokemon";
import getPokemonsReducer from "./reducer_getPokemons";

const rootReducer = combineReducers({
  postStatus: postPokemonReducer,
  pokemonData: getPokemonsReducer
});

export default rootReducer;
