import * as ActionTypes from "../../actions/Types";
import { createAppointment } from "../initialState";

export const createAppointmentReducer = (state = createAppointment, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_APPOINTMENT:
      return{
        isSuccessful: true,
        data: action.payload,
      }
    default:
      return state;
  }
}

export default createAppointmentReducer;