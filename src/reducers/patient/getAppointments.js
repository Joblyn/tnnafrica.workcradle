import * as ActionTypes from '../../actions/Types';
import { getAppointments } from "../initialState";

const getAppointmentsReducer = (state = getAppointments, action) => {
  switch(action.type) {
    case ActionTypes.GET_APPOINTMENTS:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default getAppointmentsReducer;