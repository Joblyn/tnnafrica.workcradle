import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  // FormGroup,
  CardBody,
  Alert,
  FormInput
} from "shards-react";
import { useHistory } from "react-router";

import CustomSelect from "../../components/components-overview/CustomSelect";
import {
  getPatientByIdEndpoint,
  editPatientEndpoint,
  deletePatientEndpoint,
  deleteDocumentEndpoint,
  getIntakeInfosEndpoint,
  deleteProgressFormEndpoint
} from "../../apiConstants/apiConstants";
import {
  getPatientByIdAction,
  editPatient,
  deletePatientAction,
  getIntakeForms
} from "../../actions/dietician/patient";
import PageSpinner from "../../components/common/PageSpinner";
import avatar1 from "../../images/avatars/1.jpg";
import PageTitle from "../../components/common/PageTitle";
import PatientDocs from "../../components/patientDocs";
import IntakeInfo from "../../components/intakeInfo";
import PatientIntakeForm from "../../components/patientIntakeForm";
// import { getIntakeForms } from "../actions/dietician/patient";
import { getItakeFormsEndpoint } from "../../apiConstants/apiConstants";
import { deleteDocument } from "../../actions/superadmin/patients";
import { getIntakeInfos } from "../../actions/patient/patient";

export default function PatientDetails() {
  const dietitian = JSON.parse(localStorage.getItem("loggedInUser"));
  let patientId = JSON.parse(localStorage.getItem("patient")).id;
  const dispatch = useDispatch();
  const patientById = useSelector((state) => state.dietitianPatientById);
  const [control, setControl] = useState();
  const [edit, setEdit] = useState(false);
  const [editted, setEditted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [foodPreference, setFoodPreference] = useState([]);
  const [healthCondition, setHealthCondition] = useState([]);
  const [currentFoodPreference, setCurrentFoodPreference] = useState("");
  const [currentHealthCondition, setCurrentHealthCondition] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [formPopup, setFormPopUp] = useState(false);
  const [deleteType, setDeleteType] = useState("patient");

  const editPatientByDietitian = useSelector(
    (state) => state.editPatientByDietitian
  );
  const deletedPatient = useSelector((state) => state.deletePatientByDietitian);

  const history = useHistory();

  useEffect(() => {
    let endpoint = getPatientByIdEndpoint + patientId;
    dispatch(getPatientByIdAction(endpoint));
  }, []);

  useEffect(() => {
    if (patientById.isSuccessful && patientById.data) {
      setControl(patientById.data.patient);
      setFoodPreference(patientById.data.patient.foodPreference);
      setHealthCondition(patientById.data.patient.healthCondition);
    }
  }, []);

  const handleChange = ({ target }) => {
    setControl({ ...control, [target.name]: target.value });
  };

  const addFoodPreference = () => {
    setFoodPreference([...foodPreference, currentFoodPreference]);
  };

  const restore = () => {
    setControl(patientById.data.patient);
  };

  const addHealthCondition = () => {
    setHealthCondition([...healthCondition, currentHealthCondition]);
  };

  useEffect(() => {
    if (editted && editPatientByDietitian.isSuccessful) {
      setAlert(true);
    }
  }, [editPatientByDietitian, editted]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
        window.location.reload();
      }, 2000);
    }
  }, [alert]);

  const submitChanges = () => {
    let endpoint = editPatientEndpoint + patientId;
    delete control.createdAt;
    delete control.updatedAt;
    delete control.id;
    let payload = {
      ...control,
      healthCondition,
      foodPreference,
      age: `${control.age}`,
      weight: `${control.weight}`
    };
    dispatch(editPatient(endpoint, payload));
    setEditted(true);
  };

  useEffect(() => {
    if (deletedPatient.isSuccessful) {
      history.push("/dietitian/patients");
    }
  }, [deletedPatient]);

  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        setDeleted(false);
        history.push("/dietitian/patients");
      }, 2000);
    }
  }, [deleted]);

  const deletePatient = () => {
    let endpoint = deletePatientEndpoint + patientId;
    dispatch(deletePatientAction(endpoint));
    setDeleted(true);
  };

  const intakeForms = useSelector((state) => state.intakeForms);
  const [intakeForm, setIntakeForm] = useState([]);

  useEffect(() => {
    dispatch(getIntakeForms(getItakeFormsEndpoint));
  }, []);

  useEffect(() => {
    if (intakeForms.isSuccessful) {
      let result = intakeForms.data.filter(
        (item) => item.createdFor === patientId
      );
      setIntakeForm(result[0]);
    }
  }, [intakeForms]);

  const [docId, setDocId] = useState();

  const deleteDoc = () => {
    let endpoint =
      deleteType === "doc"
        ? deleteDocumentEndpoint + docId
        : deleteType === "form"
        ? deleteProgressFormEndpoint + docId
        : "";
    dispatch(deleteDocument(endpoint));
    setDeletePopup(false);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getIntakeInfos(getIntakeInfosEndpoint));
  }, []);

  const [infos, setInfos] = useState();
  const intakeInfos = useSelector((state) => state.intakeInfos);

  useEffect(() => {
    intakeInfos.data &&
      setInfos(
        intakeInfos.data.filter(
          (item) =>
            item.createdFor === patientId && item.createdBy === dietitian.id
        )
      );
  }, [intakeInfos]);

  const [pFormPopup, setPFormPopup] = useState(false);
  const [formId, setFormId] = useState();

  if (!control) {
    return <PageSpinner />;
  }

  if (deleted) {
    return (
      <div
        className={`d-flex justify-content-center align-items-center`}
        style={{ width: "100%", background: "rgba(0,0,0,.14" }}
      >
        <Card
          className={`p-3 mx-auto`}
          style={{ position: "absolute", zIndex: 1000, width: 400, top: "30%" }}
        >
          <div className="text-center">
            <h5>Deleted Patient</h5>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Container fluid className="main-content-container px-4">
      {alert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Editted Patient Profile.
          </Alert>
        </Container>
      )}

      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Patient Profile"
          subtitle="Overview"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <div
        className={`${deletePopup || formPopup ? "d-block" : "d-none"}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 10,
          background: "rgba(0,0,0,.24"
        }}
      ></div>
      {deletePopup && (
        <div
          className="position-fixed d-flex justify-content-center align-items-center"
          style={{
            top: 0,
            left: 0,
            zIndex: 500,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,.12)"
          }}
        >
          <Card
            className={`p-3 mx-auto`}
            style={{
              position: "absolute",
              zIndex: 1000,
              width: 400,
              top: "30%"
            }}
          >
            <div className="text-center">
              <h5>{`${
                deleteType === "doc" || "form" ? "Delete?" : "Delete Patient?"
              }`}</h5>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <Button outline onClick={() => setDeletePopup(false)}>
                Cancel
              </Button>
              <Button
                outline
                theme="danger"
                onClick={
                  deleteType === "doc" || "form" ? deleteDoc : deletePatient
                }
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
      {formPopup && (
        <PatientIntakeForm
          setFormPopUp={setFormPopUp}
          intakeForm={intakeForm}
        />
      )}
      {pFormPopup && (
        <div
          className="position-fixed d-flex justify-content-center align-items-center"
          style={{
            top: 0,
            left: 0,
            zIndex: 500,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,.12)"
          }}
        >
          (
          <Card
            className="mx-auto"
            style={{
              zIndex: 1000,
              maxHeight: "600px",
              overFlowY: "auto",
              maxWidth: "500px"
            }}
          >
            <CardHeader className="border-bottom">{`Progress form submitted on ${Date(
              infos[formId].createdAt
            ).slice(0, 15)}`}</CardHeader>
            <span
              className="material-icons-outlined text-muted text-sm-center"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                cursor: "pointer"
              }}
              onClick={() => setPFormPopup(false)}
            >
              clear
            </span>
            <CardBody className="px-0">
              <ul>
                {Object.keys(infos[formId].information).map((prop, id) => (
                  <li className="d-flex m-2" key={`li-${id + 1}`}>
                    <span
                      style={{ fontWeight: "bold" }}
                      className="mr-1"
                    >{`${prop}:`}</span>
                    <span>{infos[formId].information[prop]}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          )
        </div>
      )}
      <Row>
        <Col md="4">
          <Card style={{ width: "100%", maxWidth: "1000px" }} className="pb-3">
            {/* <Col> */}
            <Col className="px-0">
              <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                  <img
                    className="rounded-circle"
                    src={avatar1}
                    alt={control.name}
                    width="110"
                  />
                </div>
                {!edit ? (
                  <h4 className="mb-0">{control.name}</h4>
                ) : (
                  <FormInput
                    type="email"
                    defaultValue={control.name}
                    name="name"
                    onChange={handleChange}
                  />
                )}
                {!edit ? (
                  <span className="text-muted d-block mb-2">
                    {control.email}
                  </span>
                ) : (
                  <FormInput
                    type="email"
                    defaultValue={control.email}
                    name="email"
                    onChange={handleChange}
                  />
                )}
                {!edit ? (
                  <span className="text-muted d-block mb-2">
                    {control.phone}
                  </span>
                ) : (
                  <FormInput
                    defaultValue={control.phone}
                    name="phone"
                    disabled={!edit}
                    onChange={handleChange}
                  />
                )}
              </CardHeader>
              <Col className={`border-bottom ${edit && "pb-3"}`}>
                <h5 className="mb-1 mt-1">Bio Data</h5>
                <Col
                  className={`d-flex flex-row align-items-center ${edit &&
                    "mb-2"}`}
                >
                  <h6 className={`mr-2 mb-0`}>Age:</h6>
                  <FormInput
                    defaultValue={`${control.age}`}
                    disabled={!edit}
                    style={
                      !edit
                        ? {
                            background: "transparent",
                            border: "none",
                            fontSize: "1rem",
                            color: "#5a6169"
                          }
                        : { fontSize: "1rem", color: "#5a6169" }
                    }
                    name="age"
                    onChange={handleChange}
                  />
                </Col>
                <Col className="d-flex flex-row align-items-center">
                  <h6 className="mr-2 mb-0">Weight:</h6>
                  <FormInput
                    defaultValue={`${control.weight}kg`}
                    disabled={!edit}
                    name="weight"
                    style={
                      !edit
                        ? {
                            background: "transparent",
                            border: "none",
                            fontSize: "1rem"
                          }
                        : { fontSize: "1rem" }
                    }
                    onChange={handleChange}
                  />
                </Col>
              </Col>
            </Col>
            <Col className="pt-3 px-0">
              <Col className={`border-bottom ${edit && "pb-3"}`}>
                <h5 className="mb-1 mt-1">Health</h5>
                <Col
                  className={`d-flex ${edit ? "flex-column mb-3" : "flex-row"}`}
                >
                  <h6 className="mr-2 mb-0">Condition:</h6>
                  {edit && (
                    <div className="d-flex flex-row">
                      <FormInput
                        name="foodPreference"
                        placeholder="Add food item"
                        style={{ width: 200 }}
                        className="ml-3 mr-3"
                        onChange={({ target }) =>
                          setCurrentHealthCondition(target.value)
                        }
                      />
                      <Button onClick={addHealthCondition}>
                        <span>+</span>Add
                      </Button>
                    </div>
                  )}
                  <span className={`${edit && "border-bottom"}`}>
                    {healthCondition && healthCondition.join(", ").toString()}
                  </span>
                </Col>
                <Col
                  className={`d-flex flex-row align-items-center ${
                    edit ? "mb-3" : ""
                  }`}
                >
                  <h6 className="mr-2 mb-0">Goal:</h6>
                  <FormInput
                    defaultValue={control.healthGoal}
                    disabled={!edit}
                    style={
                      !edit
                        ? {
                            background: "transparent",
                            border: "none",
                            fontSize: "1rem",
                            color: "#5a6169"
                          }
                        : { fontSize: "1rem", color: "#5a6169" }
                    }
                    name="healthGoal"
                    onChange={handleChange}
                  />
                </Col>
                <Col className={`d-flex ${edit ? "flex-column" : "flex-row"}`}>
                  <h6 className="mr-2">Food Prefence:</h6>
                  {edit && (
                    <div className="d-flex flex-row">
                      <FormInput
                        name="foodPreference"
                        placeholder="Add food item"
                        style={{ width: 200 }}
                        className="ml-3 mr-3"
                        onChange={({ target }) =>
                          setCurrentFoodPreference(target.value)
                        }
                      />
                      <Button onClick={addFoodPreference}>
                        <span>+</span>Add
                      </Button>
                    </div>
                  )}
                  <span className={`${edit && "border-bottom"}`}>
                    {foodPreference && foodPreference.join(", ").toString()}
                  </span>
                </Col>
              </Col>
              {/* <Col className="d-flex flex-row mt-2 border-bottom">
                <h6 className="mr-2">Dietitian:</h6>
                <span>
                  {assignedDietitian ? (
                    assignedDietitian.name
                  ) : (
                    <em>Unassigned</em>
                  )}
                </span>
              </Col> */}
              <Col className="d-flex flex-row mt-2 mb-2 align-items-center">
                <h6 className="mr-2 mb-0">Subscription:</h6>
                <CustomSelect
                  label=""
                  options={[
                    "Basic Package",
                    "Platinum Package",
                    "Premium Package"
                  ]}
                  type="edit"
                  disabled={!edit}
                  handleChange={handleChange}
                  selected={control.subscriptionPackage}
                />
              </Col>
              <Col className="mb-5">
                <>
                  <Col className="d-flex flex-row align-items-center mb-2">
                    <h6 className="mr-2 mb-0">Subscription Start:</h6>
                    {!edit ? (
                      control.subscriptionStartDate ? (
                        <FormInput
                          type="date"
                          name="subscriptionStartDate"
                          onChange={handleChange}
                          defaultValue={control.subscriptionStartDate}
                          disabled={!edit}
                          style={
                            edit
                              ? { width: 200, background: "transparent" }
                              : {
                                  width: 200,
                                  background: "transparent",
                                  border: "none"
                                }
                          }
                        />
                      ) : (
                        <span>
                          <em>not set</em>
                        </span>
                      )
                    ) : (
                      <FormInput
                        type="date"
                        name="subscriptionStartDate"
                        onChange={handleChange}
                        defaultValue={control.subscriptionStartDate}
                        style={{ width: 200 }}
                      />
                    )}
                  </Col>
                  <Col className="d-flex flex-row align-items-center mb-2">
                    <h6 className="mr-2 mb-0">Subscription End:</h6>
                    {!edit ? (
                      control.subscriptionEndDate ? (
                        <FormInput
                          type="date"
                          name="subscriptionEndDate"
                          onChange={handleChange}
                          defaultValue={control.subscriptionEndDate}
                          disabled={!edit}
                          style={
                            edit
                              ? { width: 200, background: "transparent" }
                              : {
                                  width: 200,
                                  background: "transparent",
                                  border: "none"
                                }
                          }
                        />
                      ) : (
                        <span>
                          <em>not set</em>
                        </span>
                      )
                    ) : (
                      <FormInput
                        type="date"
                        name="subscriptionEndDate"
                        onChange={handleChange}
                        defaultValue={control.subscriptionEndDate}
                        style={{ width: 200 }}
                      />
                    )}
                  </Col>
                </>
              </Col>
              <div className="d-flex flew-row">
                <Button
                  outline
                  className="ml-3"
                  onClick={edit ? submitChanges : () => setEdit(true)}
                >
                  {edit ? "Submit Changes" : "Edit Patient Profile"}
                </Button>
                {edit && (
                  <Button
                    outline
                    theme="danger"
                    className="ml-3"
                    onClick={() => {
                      restore();
                      setEdit(false);
                    }}
                  >
                    Cancel Changes
                  </Button>
                )}
                <Button
                  outline
                  className="ml-3"
                  onClick={() => setDeletePopup(true)}
                  theme="danger"
                >
                  Delete Patient
                </Button>
              </div>
            </Col>
            {/* </Col> */}
          </Card>
        </Col>
        <Col md="8" className="mb-4">
          <PatientDocs
            patient={patientById.data}
            setDeletePopUp={setDeletePopup}
            setDeleteType={setDeleteType}
            setDocId={setDocId}
          />
          <IntakeInfo
            patientId={patientId}
            setFormPopUp={setFormPopUp}
            intakeForm={intakeForm}
            infos={infos}
            setDocId={setDocId}
            setDeletePopup={setDeletePopup}
            setDeleteType={setDeleteType}
            setPFormPopup={setPFormPopup}
            setFormId={setFormId}
          />
        </Col>
      </Row>
    </Container>
  );
}
