import * as ActionTypes from "../actions/Types";
import { errors } from "./initialState";

export default function errorReducer(state = errors, action) {
  switch (action.type) {
    case ActionTypes.GET_ERRORS:
      // alert('An error occured please check internet  connection and try again');
      return {
        isError: true,
        data: action.payload,
      };
    case ActionTypes.NO_ERRORS:
      return {
        isError: false,
        data: action.payload,
      };
    default:
      return state;
  }
}
