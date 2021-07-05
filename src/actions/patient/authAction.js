import * as ActionTypes from "../Types";
import { postData } from "../services";

const onCreatePatient = (payload) => {
  if(payload.code) {
    return {
      type: ActionTypes.CREATE_PATIENT_FAIL,
      payload
    }
  } else {
    return {
      type: ActionTypes.CREATE_PATIENT_SUCCESS,
      payload
    }
  }
}

export const createPatient = (url, payload) => {
  return postData(url, payload, onCreatePatient);
}