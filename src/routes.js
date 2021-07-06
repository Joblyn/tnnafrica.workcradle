// Layout Types
import { DefaultLayout, DietitianDefaultSideBar, PatientDefaultSideBar, Plain } from "./layouts";

// Route Views
// import BlogOverview from "./pages/BlogOverview";
// import UserProfileLite from "./pages/UserProfileLite";
// import AddNewPost from "./pages/AddNewPost";
// import Errors from "./pages/Errors";
import ComponentsOverview from "./pages/ComponentsOverview";
// import Tables from "./pages/Tables";
// import BlogPosts from "./pages/BlogPosts";
import Interface from "./pages/Interface";
import PageNotFound from "./pages/404";
import DietitianLogin from "./pages/dietician/LogIn";
import PatientLogin from "./pages/patient/LogIn";
// import PatientSignUp from "./pages/patient/signup";
import RegisterPatient from "./pages/dietician/RegisterPatient";
import UploadDietPlan from "./pages/dietician/UploadDietPlan";
import Patients from "./pages/dietician/Patients";
import CreateProgressFlowIntakeForm from "./pages/dietician/CreateProgressFlowIntakeForm.js";
// import Landing from "./pages/Landing";
// import RegisterCompany from "./pages/superadmin/RegisterCompany";
import SuperAdminLogin from "./pages/admin/Login";
import CompanyPatients from "./pages/admin/Patients";
import CreateDietitian from "./pages/admin/CreateDietitian";
import Dietitians from "./pages/admin/Dietitians";
import CreatePatient from "./pages/admin/CreatePatient";
import PatientDetails from "./pages/admin/PatientDetails";
import DietitianPatients from './pages/admin/DietitianPatients';
import DietitianPatientDetails from './pages/admin/DietitianPatientDetails'
import AdminAppointments from './pages/admin/Appointments';
import UploadDocument from "./pages/dietician/UploadDocument";
import PatientProfile from './pages/patient/Profile'
import DietitianProfile from "./pages/dietician/Profile";
import SuperAdminProfile from "./pages/admin/Profile";
import DietitianDetails from './pages/admin/DietitianDetails';
import DietitianViewPatientDetails from './pages/dietician/PatientDetails';
import DietitianDocuments from './pages/dietician/Documents';
import DieitianDietPlans from './pages/dietician/DietPlans';
import PatientIntakeForms from './pages/dietician/PatientIntakeForms';
import DietitianAppointments from './pages/dietician/appointments';
import PatientDietPlan from "./pages/patient/dietPlan";
import PatientDocuments from "./pages/patient/Documents";
import PatientUploadDocument from './pages/patient/UploadDocument';
import AdminDocuments from "./pages/admin/Documents";
import AdminDietPlans from "./pages/admin/DietPlans";
// import DocViewer from "./pages/Document";
import PatientAppointments from './pages/patient/Appointments';
import IntakeForm from "./pages/patient/IntakeForm";
import IntakeInfo from "./pages/patient/intakeInfo";


export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: Plain,
  //   component: Landing,
  // },
  {
    path: "/",
    exact: true,
    layout: Plain,
    component: Interface,
  },
  // {
  //   path: "/register_company",
  //   layout: Plain,
  //   component: RegisterCompany,
  // },

  // superadmin routes
  {
    path: "/admin/login",
    layout: Plain,
    component: SuperAdminLogin,
  },
  {
    path: "/dietitian/login",
    layout: Plain,
    component: DietitianLogin,
  },
  {
    path: "/patient/login",
    layout: Plain,
    component: PatientLogin,
  },
  {
    path: "/admin/dashboard",
    layout: DefaultLayout,
    component: ComponentsOverview,
  },
  {
    path: "/admin/profile",
    layout: DefaultLayout,
    component: SuperAdminProfile
  },
  {
    path: '/admin/dietitians',
    layout: DefaultLayout,
    component: Dietitians
  },
  {
    path: '/admin/dietitian/details',
    layout: DefaultLayout,
    component: DietitianDetails
  },
  {
    path: '/admin/dietitian/patients',
    layout: DefaultLayout,
    component: DietitianPatients,
  },
  {
    path: "/admin/dietitian/patient_details",
    layout: DefaultLayout,
    component: DietitianPatientDetails
  },
  {
    path: "/admin/patients",
    layout: DefaultLayout,
    component: CompanyPatients,
  },
  {
    path: "/admin/create_user",
    layout: DefaultLayout,
    component: CreateDietitian,
  },
  {
    path: "/admin/create_patient",
    layout: DefaultLayout,
    component: CreatePatient,
  },
  {
    path: "/admin/patient/details",
    layout: DefaultLayout,
    component: PatientDetails,
  },
  {
    path: "/admin/documents",
    layout: DefaultLayout,
    component: AdminDocuments,
  },
  {
    path: '/admin/diet_plans',
    layout: DefaultLayout,
    component: AdminDietPlans
  },
{
  path: '/admin/appointments',
  layout: DefaultLayout,
  component: AdminAppointments
},
  // {
  //   path: "/patient/signup",
  //   layout: Plain,
  //   component: PatientSignUp,
  // },
  {
    path: '/dietitian/dashboard',
    layout: DietitianDefaultSideBar,
    component: ComponentsOverview
  },
  {
    path: "/dietitian/register_patient",
    layout: DietitianDefaultSideBar,
    component: RegisterPatient,
  },
  {
    path: "/dietitian/patients",
    layout: DietitianDefaultSideBar,
    component: Patients,
  },
  {
    path: '/dietitian/patient/details',
    layout: DietitianDefaultSideBar,
    component: DietitianViewPatientDetails
  },
  {
    path: "/dietitian/upload_diet_plan",
    layout: DietitianDefaultSideBar,
    component: UploadDietPlan,
  },
  {
    path: "/dietitian/upload_document",
    layout: DietitianDefaultSideBar,
    component: UploadDocument,
  },
  {
    path: "/dietitian/progress_flow_intake_form",
    layout: DietitianDefaultSideBar,
    component: CreateProgressFlowIntakeForm,
  },
  {
    path: "/dietitian/patient_intake_forms",
    layout: DietitianDefaultSideBar,
    component: PatientIntakeForms
  },
  {
    path: "/dietitian/documents",
    layout: DietitianDefaultSideBar,
    component: DietitianDocuments
  },
  {
    path: "/dietitian/diet_plans",
    layout: DietitianDefaultSideBar,
    component: DieitianDietPlans,
  },
  {
    path: '/dietitian/appointments',
    layout: DietitianDefaultSideBar,
    component: DietitianAppointments
  },
  {
    path: "/patient/dashboard",
    layout: PatientDefaultSideBar,
    component: ComponentsOverview,
  },
  {
    path: '/patient/profile',
    layout: PatientDefaultSideBar,
    component: PatientProfile,
  },
  {
    path: '/patient/diet_plan',
    layout: PatientDefaultSideBar,
    component: PatientDietPlan,
  },
  {
    path: '/patient/documents',
    layout: PatientDefaultSideBar,
    component: PatientDocuments
  },
  {
    path: "/dietitian/profile",
    layout: DietitianDefaultSideBar,
    component: DietitianProfile
  },
  {
    path: '/patient/upload_document',
    layout: PatientDefaultSideBar,
    component: PatientUploadDocument
  },
  {
    path: '/patient/intake_form',
    layout: PatientDefaultSideBar,
    component: IntakeForm,
  },
  {
    path: '/patient/appointments',
    layout: PatientDefaultSideBar,
    component: PatientAppointments
  },
  {
    path: '/patient/progress_intake_infos',
    layout: PatientDefaultSideBar,
    component: IntakeInfo,
  },
  // {
  //   path: '/view_document',
  //   layout: Plain,
  //   component: DocViewer
  // },
  {
    layout: Plain,
    component: PageNotFound,
  },
  // {
  //   path: "/blog-overview",
  //   layout: DefaultLayout,
  //   component: BlogOverview,
  // },
  // {
  //   path: "/user-profile-lite",
  //   layout: DefaultLayout,
  //   component: UserProfileLite,
  // },
  // {
  //   path: "/add-new-post",
  //   layout: DefaultLayout,
  //   component: AddNewPost,
  // },
  // {
  //   path: "/errors",
  //   layout: DefaultLayout,
  //   component: Errors,
  // },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: ComponentsOverview,
  // },
  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: Tables,
  // },
  // {
  //   path: "/blog-posts",
  //   layout: DefaultLayout,
  //   component: BlogPosts,
  // },
  
];
