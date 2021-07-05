import * as ActionTypes from './Types';
import { getData } from "./services";

const onGetAllCompanies = payload => {
  return {
    type: ActionTypes.GET_ALL_COMPANIES,
    payload
  }
}

export const getAllCompanies = (url) => {
  return getData(url, onGetAllCompanies)
}