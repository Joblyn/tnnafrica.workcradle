import * as ActionTypes from "../../actions/Types";
import { deletePatient } from '../initialState';

export const deletePatientReducer = (state = deletePatient, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_USER: 
      return {
        isSuccessful: true,
        data: action.payload
      }
    default : 
      return state
  }
} 

export default deletePatientReducer;