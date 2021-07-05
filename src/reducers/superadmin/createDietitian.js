import * as ActionTypes from "../../actions/Types";
import { createDietitian } from "../initialState";

const createDietitianReducer = (state = createDietitian, action) => {
  console.log(action.type);
  switch (action.type) {
    case ActionTypes.CREATE_DIETICIAN_SUCCESS:
      return {
        isCreated: true,
        data: action.payload,
      };
    case ActionTypes.CREATE_DIETICIAN_FAIL:
      return {
        isCreated: false,
        error: action.payload.message,
      };
    case ActionTypes.CREATE_DIETICIAN_DEFAULT:
      return {
        isCreated: false,
        data: null,
        error: null,
      };
    default: 
      return state;
  }
};

export default createDietitianReducer;
