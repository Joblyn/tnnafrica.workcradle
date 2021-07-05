import * as ActionTypes from '../../actions/Types';
import { dietitianById } from "../initialState";

const dietitianByIdReducer = (state = dietitianById, action) => {
  switch(action.type) {
    case ActionTypes.GET_DIETITIAN_BY_ID:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default dietitianByIdReducer;