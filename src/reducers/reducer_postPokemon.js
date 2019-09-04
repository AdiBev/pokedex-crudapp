import {
  POST_REQ_FAILURE,
  POST_REQ_SUCCESS,
  RESET_REQUEST_STATUS
} from "../actions";

export default (state = "", action) => {
  switch (action.type) {
    case RESET_REQUEST_STATUS:
      return action.payload;

    case POST_REQ_SUCCESS:
      return action.payload;

    case POST_REQ_FAILURE:
      return action.payload;

    default:
      return state;
  }
};
