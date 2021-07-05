import * as ActionTypes from '../../actions/Types';
import { documents } from "../initialState";

const documentsReducer = (state = documents, action) => {
  switch(action.type) {
    case ActionTypes.GET_DOCUMENTS:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default documentsReducer;