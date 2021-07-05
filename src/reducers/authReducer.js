import * as ActionTypes from "../actions/Types";
import { auth } from "./initialState";

const authReducer = (state = auth, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        isSuccessful: true,
        isLoggedIn: true,
        error: null,
        data: action.payload,
      };
    case ActionTypes.LOGIN_FAIL:
      return {
        isSuccessful: false,
        isLoggedIn: false,
        error: action.payload.message,
        data: null,
      };
    case ActionTypes.LOGIN_DEFAULT: 
    return {
      isSuccessful: false,
      isLoggedIn: false
    }
    default:
      return state;
  }
};

export default authReducer;