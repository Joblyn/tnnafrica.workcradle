import * as ActionTypes from "../../actions/Types";
import { editDataByPatient } from "../initialState";

export const editPatientByPatientReducer = (state = editDataByPatient, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_PATIENT:
      return{
        isSuccessful: true,
        data: action.payload,
      }
    default:
      return state;
  }
}

export default editPatientByPatientReducer;