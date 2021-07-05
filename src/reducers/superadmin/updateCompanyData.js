import * as ActionTypes from "../../actions/Types";
import { updateCompanyData } from '../initialState';

export const updateCompanyDataReducer = (state = updateCompanyData, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_COMPANY_DATA: 
      return {
        isSuccessful: true,
        data: action.payload
      }
    default : 
      return state
  }
} 

export default updateCompanyDataReducer;