import * as ActionTypes from "../../actions/Types";
import { superadminAuth } from "../initialState";

const superAdminAuthReducer = (state = superadminAuth, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_COMPANY_SUCCESS:
      return {
        isRegistered: true,
        data: action.payload,
      };
    case ActionTypes.REGISTER_COMPANY_FAIL:
      return {
        isRegistered: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default superAdminAuthReducer;
