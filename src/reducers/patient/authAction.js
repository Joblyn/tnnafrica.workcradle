import * as ActionTypes from "../../actions/Types";
import { patientAuth } from "../initialState";

const createPatientReducer = (state = patientAuth, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_PATIENT_SUCCESS: 
      return {
        isCreated: true,
        data: action.payload,
      };
    case ActionTypes.CREATE_PATIENT_FAIL: 
      return {
        isCreated: false,
        error: action.payload.message
      };
    default: 
      return state;
  }
}

export default createPatientReducer;