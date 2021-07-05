import * as ActionTypes from "../../actions/Types";
import { postDataWithToken, getDataWithToken, patchDataWithToken, deleteData } from "../services";

const onGetPatientDataWithToken = (payload) => {
  return {
    type: ActionTypes.GET_PATIENT_BY_ID,
    payload,
  };
};

export const getPatientByIdAction = (url) => {
  return getDataWithToken(url, onGetPatientDataWithToken);
};

const onEditPatient = (payload) => {
  return {
    type: ActionTypes.EDIT_PATIENT,
    payload,
  };
};

export const editPatient = (url, payload) => {
  return patchDataWithToken(url, payload, onEditPatient);
};

const onDeletePatientAction = (payload) => {
  return {
    type: ActionTypes.DELETE_PATIENT,
    payload,
  };
};

export const deletePatientAction = (url) => {
  return deleteData(url, onDeletePatientAction);
};

export const addFormItem = (payload) => {
  return {
    type: ActionTypes.ADD_FORM_ITEM,
    payload,
  };
};

export const removeFormItem = (id) => {
  return {
    type: ActionTypes.REMOVE_FORM_ITEM,
    payload: id,
  };
};

export const removeItemOption = (itemId, id) => {
  return {
    type: ActionTypes.REMOVE_ITEM_OPTION,
    payload: { itemId, id },
  };
};

export const addItemOption = (itemId) => {
  return {
    type: ActionTypes.ADD_ITEM_OPTION,
    payload: { itemId },
  }
};

export const setFieldTitle = (value, itemId) => {
  return {
    type: ActionTypes.SET_FIELD_TITLE,
    payload: { value, itemId }
  }
}

export const setRequired = (checked, itemId) => {
  return{
    type:ActionTypes.SET_REQUIRED,
    payload: { checked, itemId }
  }
}

export const setInputValue = (value, itemId, id) => {
  return {
    type: ActionTypes.SET_INPUT_VALUE,
    payload: { value, itemId, id }
  }
}

export const onCreateIntakeForm = (payload) => {
  return {
    type: ActionTypes.CREATE_INTAKE_FORM,
    payload
  }
}

export const createIntakeForm = (url, payload) => {
  return postDataWithToken(url, payload, onCreateIntakeForm)
}

export const onGetIntakeForms = (payload) => {
  return {
    type: ActionTypes.GET_INTAKE_FORMS,
    payload
  }
}

export const getIntakeForms = (url) => {
  return getDataWithToken(url, onGetIntakeForms)
}

const onCreateIntakeInfo = (payload) => {
  return {
    type: ActionTypes.CREATE_INTAKE_INFO,
    payload
  }
}

export const createIntakeInfo = (url, payload) => {
  return postDataWithToken(url, payload, onCreateIntakeInfo);
}

// export const onGetIntakeFormByPatientId = (payload) => {
//   return {
//     type: ActionTypes.GET_INTAKE_FORM_BY_PATIENT_ID,
//     payload
//   }
// }

// export const getIntakeFormsByPatientId = (url) => {
//   return getDataWithToken(url, onGetIntakeFormByPatientId);
// }