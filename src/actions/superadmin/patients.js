import * as ActionTypes from '../Types';
import { deleteData, getData, patchDataWithToken } from "../services";

const onGetAllPatients = payload => {
  return {
    type: ActionTypes.GET_ALL_PATIENTS,
    payload
  }
}

export const getAllPatients = (url) => {
  return getData(url, onGetAllPatients);
}

const onEditPatient = payload => {
  return {
    type: ActionTypes.EDIT_PATIENT,
    payload
  }
}

export const editPatient = (url, payload) => {
  return patchDataWithToken(url, payload, onEditPatient);
}

const onDeletePatientAction = (payload) => {
  return {
    type: ActionTypes.DELETE_PATIENT,
    payload
  }
}

export const deletePatientAction= (url) => {
  return deleteData(url, onDeletePatientAction)
}

const onDeleteDocument = (payload) => {
  return {
    type: ActionTypes.DELETE_DOCUMENT,
    payload
  }
}

export const deleteDocument = (url) => {
  return deleteData(url, onDeleteDocument);
}