import * as ActionTypes from '../../actions/Types';
import { dietitianPatientById } from "../initialState";

const dietitianPatientByIdReducer = (state = dietitianPatientById, action) => {
  switch(action.type) {
    case ActionTypes.GET_PATIENT_BY_ID:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default dietitianPatientByIdReducer;