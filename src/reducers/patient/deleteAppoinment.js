import * as ActionTypes from "../../actions/Types";
import { deleteAppointment } from '../initialState';

export const deleteAppointmentReducer = (state = deleteAppointment, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_APPOINTMENT: 
      return {
        isSuccessful: true,
        data: action.payload
      }
    default : 
      return state
  }
} 

export default deleteAppointmentReducer;