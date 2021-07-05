import * as ActionTypes from "../../actions/Types";
import { createIntakeInfo } from "../initialState";

export const createIntakeInfoReducer = (state = createIntakeInfo, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_INTAKE_INFO:
      return{
        isSuccessful: true,
        data: action.payload,
      }
    default:
      return state;
  }
}

export default createIntakeInfoReducer;