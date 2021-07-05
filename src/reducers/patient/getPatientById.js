import * as ActionTypes from '../../actions/Types';
import { patientById } from "../initialState";

const patientByIdReducer = (state = patientById, action) => {
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

export default patientByIdReducer;