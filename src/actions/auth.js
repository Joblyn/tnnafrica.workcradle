import * as ActionTypes from "./Types";
import { postData } from "./services";

const onLogin = (payload) => {
  if (payload.code) {
    return {
      type: ActionTypes.LOGIN_FAIL,
      payload: payload,
    };
  } else if (payload) {
    return {
      type: ActionTypes.LOGIN_SUCCESS,
      payload: payload,
    };
  }
};

export const login = (url, payload) => {
  return postData(url, payload, onLogin);
};

export const defaultAuthState = {
  type: ActionTypes.LOGIN_DEFAULT
}