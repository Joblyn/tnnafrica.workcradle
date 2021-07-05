import * as ActionTypes from "../../actions/Types";
import { createIntakForm } from "../initialState";

export const createIntakeFormReducer = (state = createIntakForm, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_INTAKE_FORM:
      return{
        isSuccessful: true,
        data: action.payload,
      }
    default:
      return state;
  }
}

export default createIntakeFormReducer;