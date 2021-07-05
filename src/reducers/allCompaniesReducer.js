import * as ActionTypes from '../actions/Types';
import { allCompanies } from "./initialState";

const allCompaniesReducer = (state = allCompanies, action) => {
  console.log(action);
  switch(action.type) {
    case ActionTypes.GET_ALL_COMPANIES: 
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
      return state;
  }
}

export default allCompaniesReducer;