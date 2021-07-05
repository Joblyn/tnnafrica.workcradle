import * as ActionTypes from "../../actions/Types";
import { editData } from "../initialState";

export const editPatientReducer = (state = editData, action) => {
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

export default editPatientReducer;