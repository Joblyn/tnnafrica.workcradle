import * as ActionTypes from '../../actions/Types';
import { intakeForms } from "../initialState";

const intakeFormsReducer = (state = intakeForms, action) => {
  switch(action.type) {
    case ActionTypes.GET_INTAKE_FORMS:
    return {
      isSuccessful: true,
      data: action.payload
    }
    default: 
    return state;
  }
};

export default intakeFormsReducer;