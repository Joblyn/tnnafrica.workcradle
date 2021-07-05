import * as ActionTypes from '../../actions/Types';
import { allAdmins } from '../initialState';

const allAdminsReducer = (state = allAdmins, action) => {
  switch(action.type) {
    case ActionTypes.GET_ALL_ADMINS:
      return {
        isSuccessful: true,
        data: action.payload
      }
    default: 
      return state;
  }
}

export default allAdminsReducer;