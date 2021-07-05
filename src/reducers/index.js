import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import allCompaniesReducer from './allCompaniesReducer';
import superAdminAuthReducer from './superadmin/Auth';
import authReducer from './authReducer';
import allPatientsReducer from './superadmin/getAllPatients';
import createDietitianReducer from './superadmin/createDietitian';
import createPatientReducer from './patient/authAction';
import allDietitiansReducer from './superadmin/getAllDietitians';
import editPatientReducer from './superadmin/editPatient';
import dietitianReducer from './dietician/dietitianReducer';
import updateCompanyDataReducer from './superadmin/updateCompanyData';
import allAdminsReducer from './superadmin/getAllAdmins';
import updateDietitianDataReducer from './superadmin/updateDietitianData';
import deleteUserReducer from './superadmin/deleteUser';
import deletePatientReducer from './superadmin/deletePatient';
import dietitianPatientByIdReducer from './dietician/dietitianPatientById';
import patientByIdReducer from './patient/getPatientById';
import editPatientByDietitianReducer from './dietician/editPatientByDietitian';
import deletePatientByDietitianReducer from './dietician/deletePatient';
import editPatientByPatientReducer from './patient/editPatient';
import dietitianByIdReducer from './dietician/dietitianById';
import patientGetDietitianByIdReducer from './patient/getDietitianById';
import documentsReducer from './dietician/getDocuments';
import deleteDocumentReducer from './superadmin/deleteDocument';
import docContentUrlReducer from './patient/docContentUrl';
import getAppointmentsReducer from './patient/getAppointments';
import formItemsReducer from './dietician/formItems';
import createIntakeFormReducer from './dietician/createIntakeForm';
import intakeFormsReducer from './dietician/geIntakeForms';
import createIntakeInfoReducer from './patient/intakeInfo';
import getIntakeInfosReducer from './patient/getIntakeInfos';
import createAppointmentReducer from './patient/createAppointment';
import updateAppointmentReducer from './patient/updateAppointment';
import deleteAppointmentReducer from './patient/deleteAppoinment';


export default combineReducers({
  allCompanies: allCompaniesReducer,
  superAdminAuth: superAdminAuthReducer,
  authState: authReducer,
  allPatients: allPatientsReducer,
  createDietitian:createDietitianReducer,
  createPatient: createPatientReducer, 
  allDietitians: allDietitiansReducer,
  allAdmins: allAdminsReducer,
  dietitian: dietitianReducer,
  editPatient: editPatientReducer,
  updatedCompanyData: updateCompanyDataReducer,
  updateDietitianData: updateDietitianDataReducer,
  deleteUser: deleteUserReducer,
  deletePatient: deletePatientReducer,
  dietitianPatientById: dietitianPatientByIdReducer,
  patientById: patientByIdReducer,
  editPatientByDietitian: editPatientByDietitianReducer,
  editPatientByPatient:editPatientByPatientReducer,
  deletePatientByDietitian: deletePatientByDietitianReducer,
  dietitianById: dietitianByIdReducer,
  patientGetDietitianById: patientGetDietitianByIdReducer,
  documents: documentsReducer,
  deleteDocument: deleteDocumentReducer,
  docContentUrl: docContentUrlReducer,
  getAppointments: getAppointmentsReducer,
  formItems: formItemsReducer,
  createIntakeForm: createIntakeFormReducer,  
  intakeForms: intakeFormsReducer,
  createIntakeInfo: createIntakeInfoReducer,
  intakeInfos: getIntakeInfosReducer, 
  createAppointment: createAppointmentReducer,
  updateAppointment: updateAppointmentReducer,
  deleteAppointment: deleteAppointmentReducer,
  
  errors: errorReducer
})