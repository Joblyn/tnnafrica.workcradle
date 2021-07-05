import * as ActionTypes from "../../actions/Types";
import { updateAppointment } from "../initialState";

export const updateAppointmentReducer = (state = updateAppointment, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_APPOINTMENT:
      return{
        isSuccessful: true,
        data: action.payload,
      }
    default:
      return state;
  }
}

export default updateAppointmentReducer;