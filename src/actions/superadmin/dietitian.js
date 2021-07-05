import * as ActionTypes from "../Types";
import { 
  // getData, 
  deleteData,
  getDataWithToken, patchDataWithToken, postData } from "../services";

const oncreateDietitian = (payload) => {
  console.log(payload);
  if(payload.code) {
    console.log(payload.code);
    return {
      type: ActionTypes.CREATE_DIETICIAN_FAIL,
      payload
    }
  } else {
    return {
      type: ActionTypes.CREATE_DIETICIAN_SUCCESS,
      payload
    }
  }
};

export const createDietitian = (url, payload) => {
  return postData(url, payload, oncreateDietitian);
}

export const createDietitianStateToDefault = () => {
  return {
    type: ActionTypes.CREATE_DIETICIAN_DEFAULT,
  }
}

const onGetAllDietitians = (payload) => {
  return {
    type: ActionTypes.GET_ALL_DIETICIANS,
    payload
  }
}

export const getAllDietitians = (url) => {
  return getDataWithToken(url, onGetAllDietitians);
}

const onUpdateDietitianData = (payload) => {
  return{
    type: ActionTypes.UPDATE_DIETITIAN_DATA,
    payload
  }
}

export const updateDietitianData = (url, payload) => {
  return patchDataWithToken(url, payload, onUpdateDietitianData);
};

const onDeleteUserAction = (payload) => {
  return {
    type: ActionTypes.DELETE_USER,
    payload
  }
}

export const deleteUserAction = (url) => {
  return deleteData(url, onDeleteUserAction)
}