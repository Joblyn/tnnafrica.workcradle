import * as ActionTypes from '../../actions/Types';
import { dietitian } from "../initialState";

const dietitianReducer = (state = dietitian, action) => {
  switch(action.type) {
    case ActionTypes.GET_DIETITIAN:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default dietitianReducer;