import axios from "axios";

export const POST_FAILURE = "POST_FAILURE";
export const POST_SUCCESS = "POST_SUCCESS";
export const GET_DATA = "GET_DATA";

//action creator for success in posting
export const postSuccess = () => {
  return {
    type: POST_SUCCESS,
    payload: "Data posted successfully!"
  };
};

//action creator for error in posting
export const postFailure = err => {
  return {
    type: POST_FAILURE,
    payload: `Error message: ${err}`
  };
};

//action creator for success in get request
export const getPokemons = res => {
  return {
    type: GET_DATA,
    payload: res
  };
};

//This function performs post request
export const postPokemonData = data => {
  const url = "http://localhost:5000/api/pokemon";
  return async dispatch => {
    try {
      await axios.post(url, data);
      dispatch(postSuccess());
    } catch (err) {
      return dispatch(postFailure(err.message));
    }
  };
};

//This function performs get request
export const fetchPokemons = pageNo => {
  const url = `http://localhost:5000/api/pokemons/page=${pageNo}`;

  return async dispatch => {
    let res = await axios.get(url);
    return dispatch(getPokemons(res.data));
  };
};
