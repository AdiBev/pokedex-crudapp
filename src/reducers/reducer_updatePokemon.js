import {
  PUT_REQ_SUCCESS,
  PUT_REQ_FAILURE,
  RESET_REQUEST_STATUS
} from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case RESET_REQUEST_STATUS:
      return action.payload;

    case PUT_REQ_SUCCESS:
      return action.payload;

    case PUT_REQ_FAILURE:
      return action.payload;

    default:
      return state;
  }
};
