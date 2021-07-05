import * as ActionTypes from "../../actions/Types";
import { formItemsState } from "../initialState";

export const formItems = (state = formItemsState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FORM_ITEM:
      delete action.payload.title;
      return [...state, { ...action.payload, field: "", required: false }];
    case ActionTypes.REMOVE_FORM_ITEM:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    case ActionTypes.ADD_ITEM_OPTION:
      var arr = [ ...state ];
      arr[action.payload.itemId].options.push("");
      return arr;
    case ActionTypes.REMOVE_ITEM_OPTION:
      var arr = [...state];
      arr[action.payload.itemId].options.splice(action.payload.id, 1);
      return arr;
    case ActionTypes.SET_FIELD_TITLE:
      var arr  = [...state];
      arr[action.payload.itemId].field = action.payload.value;
      return arr;
    case ActionTypes.SET_INPUT_VALUE:
      var arr = [ ...state ];
      arr[action.payload.itemId].options[action.payload.id] = action.payload.value;
      return arr;
    case ActionTypes.SET_REQUIRED:
      var arr = [ ...state ];
      arr[action.payload.itemId].required = action.payload.checked;
      return arr;
    default:
      return state;
  }
};

export default formItems;
