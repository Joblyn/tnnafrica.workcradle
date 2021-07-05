import * as ActionTypes from "../../actions/Types";
import { deletePatientByDietitian } from '../initialState';

export const deletePatientByDietitianReducer = (state = deletePatientByDietitian, action) => {
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

export default deletePatientByDietitianReducer;