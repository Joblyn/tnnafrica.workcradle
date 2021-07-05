import * as ActionTypes from "../../actions/Types";
import { updateDietitianData } from '../initialState';

export const updateDietitianDataReducer = (state = updateDietitianData, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_DIETITIAN_DATA: 
      return {
        isSuccessful: true,
        data: action.payload
      }
    default : 
      return state
  }
} 

export default updateDietitianDataReducer;