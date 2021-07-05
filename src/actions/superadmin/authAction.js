import * as ActionTypes from "../Types";
import { postData, patchDataWithToken, getDataWithToken } from "../services";

const onRegisterCompany = (payload) => {
  if(payload.code) {
    return {
      type: ActionTypes.REGISTER_COMPANY_FAIL,
      payload
    }
  } else {
    return {
      type: ActionTypes.REGISTER_COMPANY_SUCCESS,
      payload
    }
  }
};

export const registerCompany = (url, payload) => {
  return postData(url, payload, onRegisterCompany);
};

const onUpdateCompanyData = (payload) => {
  return {
    type: ActionTypes.UPDATE_COMPANY_DATA,
    payload
  }
}

export const updateCompanyData = (url, payload) => {
  return patchDataWithToken(url, payload, onUpdateCompanyData);
}

const onGetAllAdmins = (payload) => {
  return {
    type: ActionTypes.GET_ALL_ADMINS,
    payload
  }
}

export const getAllAdmins = (url) => {
  return getDataWithToken(url, onGetAllAdmins);
}