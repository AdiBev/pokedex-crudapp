import axios from "axios";

export const POST_REQ_FAILURE = "POST_REQ_FAILURE";
export const POST_REQ_SUCCESS = "POST_REQ_SUCCESS";
export const PUT_REQ_SUCCESS = "PUT_REQ_SUCCESS";
export const PUT_REQ_FAILURE = "PUT_REQ_FAILURE";
export const RESET_REQUEST_STATUS = "RESET_REQUEST_STATUS";
export const GET_PAGINATION_DATA = "GET_PAGINATION_DATA";
export const GET_POKEMON_DATA = "GET_POKEMON_DATA";
export const GET_NEARBY_POKEMONS = "GET_NEARBY_POKEMONS";
export const DELETE_POKEMON = "DELETE_POKEMON";

const url = "https://pokemon-api-server.herokuapp.com/api";

//action creator for post req success
const postReqSuccess = () => {
  return {
    type: POST_REQ_SUCCESS,
    payload: "Data posted successfully!"
  };
};

//action creator for post req failure
const postReqFailure = err => {
  return {
    type: POST_REQ_FAILURE,
    payload: `Error message: ${err}`
  };
};

//action creator for put req success
const putReqSuccess = () => {
  return {
    type: PUT_REQ_SUCCESS,
    payload: "Data updated successfully!"
  };
};

//action creator for put req failure
const putReqFailure = err => {
  return {
    type: PUT_REQ_FAILURE,
    payload: `Error message: ${err}`
  };
};

//action creator for deleting
export const deletePokemon = id => {
  return {
    type: DELETE_POKEMON,
    id
  };
};

//resets the put, post request status
export const resetReqStatus = () => {
  return {
    type: RESET_REQUEST_STATUS,
    payload: ""
  };
};

//action creator for success in get request
const getPokemons = res => {
  return {
    type: GET_PAGINATION_DATA,
    payload: res
  };
};

const getPokemonData = res => {
  return {
    type: GET_POKEMON_DATA,
    payload: res
  };
};

const getNearbyPokemons = res => {
  return {
    type: GET_NEARBY_POKEMONS,
    payload: res
  };
};

//This function performs get request to fetch data by page
export const fetchPokemons = pageNo => {
  return async dispatch => {
    let res = await axios.get(`${url}/pokemons/page=${pageNo}`);
    await dispatch(getPokemonData(res.data.pokemons));
    await dispatch(getPokemons(res.data));
  };
};

//This function fetches pokemon by id
export const fetchPokemonById = id => {
  return async dispatch => {
    try {
      let res = await axios.get(`${url}/pokemon/${id}`);
      dispatch(getPokemons(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };
};

//This function finds nearest pokemon
export const findNearbyPokemons = (lng, lat) => {
  return async dispatch => {
    try {
      const res = await axios.get(`${url}/nearbypokemons`, {
        params: {
          lng,
          lat
        }
      });
      dispatch(getNearbyPokemons(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };
};

//This function performs post request
export const postPokemonData = data => {
  return async dispatch => {
    try {
      await axios.post(`${url}/pokemon`, data);
      dispatch(postReqSuccess());
    } catch (err) {
      dispatch(postReqFailure(err.message));
    }
  };
};

//This function updates pokemon data
export const updatePokemons = (id, data) => {
  const url = `http://localhost:5000/api`;

  return async dispatch => {
    try {
      dispatch(putReqSuccess());
      await axios.put(`${url}/pokemon/${id}`, data);
    } catch (err) {
      dispatch(putReqFailure(err.message));
    }
  };
};

//This function deletes the pokemon data
export const deletePokemonById = id => {
  return async dispatch => {
    try {
      dispatch(deletePokemon(id));
      await axios.delete(`${url}/pokemon/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  };
};
