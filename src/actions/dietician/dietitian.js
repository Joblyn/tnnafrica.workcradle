import * as ActionTypes from "../Types";
import { 
  // getData, 
  getDataWithToken, 
  // postData 
} from "../services";


const onGetDietitian = (payload) => {
  return {
    type: ActionTypes.GET_DIETITIAN,
    payload
  }
} 

export const getDietitian = (url) => {
  return getDataWithToken(url, onGetDietitian); 
}

const onGetDietitianById = (payload) => {
  return {
    type: ActionTypes.GET_DIETITIAN_BY_ID,
    payload
  }
}

export const getDietitianById = (url) => {
  return getDataWithToken(url, onGetDietitianById)
}

const onGetDocuments = (payload) => {
  return {
    type: ActionTypes.GET_DOCUMENTS,
    payload
  }
}

export const getDocuments = (url) => {
  return getDataWithToken(url, onGetDocuments)
}