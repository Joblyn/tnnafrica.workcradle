let localUrl = 'https://workcradle.herokuapp.com/api/';
let prodUrl = 'https://workcradle.herokuapp.com/api/';

export let baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : localUrl;

// get all companies
export let allCompanies = 'Company/GetAllCompany/';

// Authentication
export let createCompany = 'Company/CreateCompany/';
export let loginEndpoint = 'Auth/login/';
export let createDietitianEndpoint = "Users/CreateUser";
export let getDietitians = 'Users/GetDietitianByCompanyCode/';

export let getDietitiansByPatient = 'Users/GetDietitianByCompanyCode/';

export let updateCompanyDataEndpoint = 'Users/UpdateUser/';
export let deleteUserEndpoint = 'Users/DeleteUser/';

export let getDietitianEndpoint = 'Users/GetDietitianByCompanyCode/';
export let getDietitianByIdEndpoint = 'Users/GetUserById/';

export let getAdmins = 'Users/GetUserAdminByCompanyCode/';

export let createPatientEndpoint = "Patient/CreatePatient/";
export let getPatients = "Patient/GetPatientByCompanyCode/";


export let editPatientEndpoint = "Patient/UpdatePatient/";
export let getPatientByIdEndpoint = 'Patient/GetPatient/';

export let editDietitianOrAdmin ="Users/UpdateUser/";
export let createDocument = 'Document/CreateDocument/';
export let deletePatientEndpoint = 'Patient/DeletePatient/';
export let getDocumentsByCompanyCodeEndpoint = 'Document/GetDocumentByCompanyCode/';
export let deleteDocumentEndpoint = 'Document/DeleteDocumentById/';


// Appointments 
export let getAppointmentsEndpoint = 'Appointment/GetAppointmentByCompanyCode/';
// http://dev-workcradle.herokuapp.com/api/Appointment/GetAppointmentByCompanyCode/:companyCode
// http://dev-workcradle.herokuapp.com/api/Appointment/CreateAppointment/


// intake Form
export let createIntakeFormEndpoint = 'IntakeForm/CreateIntakeForm/';
export let getItakeFormsEndpoint = 'IntakeForm/GetIntakeForm/';
export let createIntakeInfoEndpoint = 'IntakeInformation/CreateIntakeInformation/';
export let getIntakeInfosEndpoint = 'IntakeInformation/GetIntakeInformation/';
export let deleteProgressFormEndpoint = 'IntakeInformation/DeleteIntakeInformation/';

// appointment
export let createAppointmentEndpoint = 'Appointment/CreateAppointment/';
export let updateAppointmentEdnpoint = 'Appointment/UpdateAppointment/';
export let deleteAppointmentEndpoint = 'Appointment/DeleteAppointment/';
// http://dev-workcradle.herokuapp.com/api/Appointment/DeleteAppointment/:appointmentId/;
// http://dev-workcradle.herokuapp.com/api/Appointment/UpdateAppointment/:appointmentId/
// http://dev-workcradle.herokuapp.com/api/Appointment/CreateAppointment/