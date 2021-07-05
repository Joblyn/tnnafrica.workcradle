import * as ActionTypes from "./Types";

const onErrors = (type, payload) => {
  let action;
  switch (type) {
    case ActionTypes.NO_ERRORS:
      action = {
        type: ActionTypes.NO_ERRORS,
        payload,
      };
      break;
    case ActionTypes.GET_ERRORS:
      action = {
        type: ActionTypes.GET_ERRORS,
        payload,
      };
      break;
    default:
      break;
  }
  return action;
};

export default onErrors;
