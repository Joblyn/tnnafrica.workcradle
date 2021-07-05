import * as ActionTypes from '../../actions/Types';
import { PatientGetBietitianById } from "../initialState";

const patientGetDietitianByIdReducer = (state = PatientGetBietitianById, action) => {
  switch(action.type) {
    case ActionTypes.PATIENT_GET_DIETITIAN_BY_ID:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default patientGetDietitianByIdReducer;