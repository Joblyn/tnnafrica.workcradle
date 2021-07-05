import * as ActionTypes from "../../actions/Types";
import { docContentUrl } from "../initialState";

export const docContentUrlReducer = (state = docContentUrl, action) => {
  switch (action.type) {
    case ActionTypes.DOC_CONTENT_URL:
      return{
        isSuccessful: true,
        data: action.payload,
      }
    default:
      return state;
  }
};

export default docContentUrlReducer;