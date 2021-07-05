import * as ActionTypes from '../../actions/Types';
import { allPatients } from "../initialState";

const allPatientsReducer = (state = allPatients, action) => {
  switch(action.type) {
    case ActionTypes.GET_ALL_PATIENTS: 
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
      return state;
  }
}

export default allPatientsReducer; 