import * as ActionTypes from '../../actions/Types';
import { getIntakeInfos } from "../initialState";

const getIntakeInfosReducer = (state = getIntakeInfos, action) => {
  switch(action.type) {
    case ActionTypes.GET_INTAKE_INFOS:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default getIntakeInfosReducer;