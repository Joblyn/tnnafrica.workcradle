import * as ActionTypes from "../../actions/Types";
import { editDataByDietitian } from "../initialState";

export const editPatientByDietitianReducer = (state = editDataByDietitian, action) => {
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

export default editPatientByDietitianReducer;