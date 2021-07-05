import * as ActionTypes from "../../actions/Types";
import { deleteUser } from '../initialState';

export const deleteUserReducer = (state = deleteUser, action) => {
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

export default deleteUserReducer;