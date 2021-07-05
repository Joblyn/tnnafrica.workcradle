import * as ActionTypes from '../../actions/Types';
import { deleteData, getDataWithToken, patchDataWithToken, postDataWithToken,
  //  deleteData 
} from '../services';


const onGetPatientDataWithToken = (payload) => {
  return {
    type: ActionTypes.GET_PATIENT_BY_ID,
    payload
  }
}
export const getPatientByIdAction = (url) => {
  return getDataWithToken(url, onGetPatientDataWithToken)
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

const onGetDietitianById = (payload) => {
  return {
    type: ActionTypes.PATIENT_GET_DIETITIAN_BY_ID,
    payload
  }
}


export const getDietitianById = (url) => {
  return getDataWithToken(url, onGetDietitianById)
}


export const setContentUrl = (contentUrl) => {
  return {
    type: ActionTypes.DOC_CONTENT_URL,
    payload: contentUrl
  }
}

const onGetAppointments = (payload) => {
  return {
    type: ActionTypes.GET_APPOINTMENTS,
    payload
  }
}


export const getAppointments = (url) => {
  return getDataWithToken(url, onGetAppointments);
}

const onGetIntakeInfos = (payload) => {
  return {
    type: ActionTypes.GET_INTAKE_INFOS,
    payload
  }
}

export const getIntakeInfos = (url) => {
  return getDataWithToken(url, onGetIntakeInfos);
}

const onCreateAppointment = (payload) => {
  return {
    type: ActionTypes.CREATE_APPOINTMENT,
    payload
  }
}

export const createAppointment = (url, payload) => {
  return postDataWithToken(url, payload, onCreateAppointment);
}

const onUpdateAppointment = (payload) => {
  return {
    type: ActionTypes.UPDATE_APPOINTMENT,
    payload
  }
}

export const updateAppointment = (url, payload) => {
  return patchDataWithToken(url, payload, onUpdateAppointment);
}

const onDeleteAppointment = (payload) => {
  return {
    type: ActionTypes.DELETE_APPOINTMENT,
    payload
  }
}

export const deleteAppointment = (url) => {
  return deleteData(url, onDeleteAppointment);
}