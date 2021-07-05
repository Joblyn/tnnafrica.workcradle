import * as ActionTypes from "../../actions/Types";
import { deleteDocument } from '../initialState';

export const deleteDocumentReducer = (state = deleteDocument, action) => {
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

export default deleteDocumentReducer;