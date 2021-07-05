import * as ActionTypes from '../../actions/Types';
import { allDietitians } from "../initialState";

const allDietitiansReducer = (state = allDietitians, action) => {
  switch(action.type) {
    case ActionTypes.GET_ALL_DIETICIANS:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
}

export default allDietitiansReducer;