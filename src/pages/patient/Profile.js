import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  // FormGroup,
  Alert,
  FormInput,
} from "shards-react";
import CustomSelect from "../../components/components-overview/CustomSelect";
import {
  getDietitianByIdEndpoint,
  getPatientByIdEndpoint,
} from "../../apiConstants/apiConstants";
import { getPatientByIdAction } from "../../actions/patient/patient";
import PageTitle from "../../components/common/PageTitle";
import { editPatientEndpoint } from "../../apiConstants/apiConstants";
import { editPatient } from "../../actions/patient/patient";
import avatar1 from "../../images/avatars/1.jpg";
import { getDietitianById } from "../../actions/patient/patient";
import PageSpinner from "../../components/common/PageSpinner";

export default function PatientProfile() {
  const patient = JSON.parse(localStorage.getItem("loggedInUser"));
  const dispatch = useDispatch();
  const [control, setControl] = useState();
  const [foodPreference, setFoodPreference] = useState();
  const [healthCondition, setHealthCondition] = useState();
  const [currentHealthCondition, setCurrentHealthCondition] = useState("");
  const [currentFoodPreference, setCurrentFoodPreference] = useState("");
  const [edit, setEdit] = useState(false);
  const [editted, setEditted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [assignedDietitian, setAssignedDietitian] = useState();

  const editPatientByPatient = useSelector(
    (state) => state.editPatientByPatient
  );

  useEffect(() => {
    let endpoint = getPatientByIdEndpoint + patient.id;
    dispatch(getPatientByIdAction(endpoint));
  }, []);

  const patientById = useSelector((state) => state.patientById);

  useEffect(() => {
    if (patientById.isSuccessful && patientById.data.patient) {
      setControl(patientById.data.patient);
      setFoodPreference(patientById.data.patient.foodPreference);
      setHealthCondition(patientById.data.patient.healthCondition);
    }

  }, [patientById]);

  const handleChange = ({ target }) => {
    setControl({ ...control, [target.name]: target.value });
  };

  const addFoodPreference = () => {
    currentFoodPreference &&
      setFoodPreference([...foodPreference, currentFoodPreference]);
  };

  const restore = () => {
    setControl(patientById.data.patient);
  };

  const addHealthCondition = () => {
    currentHealthCondition &&
      setHealthCondition([...healthCondition, currentHealthCondition]);
  };

  useEffect(() => {
    if ((editPatientByPatient, editted)) {
      setAlert(true);
    }
  }, [editPatientByPatient, editted]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
        window.location.reload();
      }, 2000);
    }
  }, [alert]);

  const patientGetDietitianById = useSelector(state => state.patientGetDietitianById);

  useEffect(() => {
    console.log(patientGetDietitianById);
    patientGetDietitianById.data && setAssignedDietitian(patientGetDietitianById.data.name);
  }, [patientGetDietitianById]);

  useEffect(() => {
    if (patient.assignedDietitian) {
      let endpoint = getDietitianByIdEndpoint + patient.assignedDietitian;
      console.log(endpoint);
      dispatch(getDietitianById(endpoint));
    }
  }, []);

  const submitChanges = () => {
    let endpoint = editPatientEndpoint + patient.id;
    console.log(endpoint);
    delete control.createdAt;
    delete control.updatedAt;
    delete control.id;
    let payload = {
      ...control,
      healthCondition,
      foodPreference,
      age: `${control.age}`,
      weight: `${control.weight}`,
    };
    console.log(payload);
    dispatch(editPatient(endpoint, payload));
    setEditted(true);
  };

  if (!control) {
    return <PageSpinner />;
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      {alert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Editted Profile.
          </Alert>
        </Container>
      )}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Profile"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>

      <Col
        lg="12"
        className="d-flex flex-column justify-content-center align-items-center mb-5"
      >
        <Card style={{ width: "100%", maxWidth: "1000px" }} className="pb-3">
          <Row>
            <Col md="6">
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
                            color: "#5a6169",
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
                    defaultValue={`${control.weight}`}
                    disabled={!edit}
                    name="weight"
                    style={
                      !edit
                        ? {
                            background: "transparent",
                            border: "none",
                            fontSize: "1rem",
                          }
                        : { fontSize: "1rem" }
                    }
                    onChange={handleChange}
                  />
                </Col>
              </Col>
            </Col>

            <Col md="6" className="pt-3">
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
                  <span className={`${edit && "border-bottom mt-2"}`}>
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
                            color: "#5a6169",
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
                  <span className={`${edit && "border-bottom mt-2"}`}>
                    {foodPreference && foodPreference.join(", ").toString()}
                  </span>
                </Col>
              </Col>

              <Col className="d-flex flex-row mt-2 border-bottom">
                <h6 className="mr-2">Dietitian:</h6>
                <span>
                  {assignedDietitian ? (
                    assignedDietitian
                  ) : (
                    <em>Unassigned</em>
                  )}
                </span>
              </Col>
              <Col className="d-flex flex-row mt-2 mb-2 align-items-center">
                <h6 className="mr-2 mb-0">Subscription:</h6>
                <CustomSelect
                  label=""
                  options={[
                    "Basic Package",
                    "Platinum Package",
                    "Premium Package",
                  ]}
                  type="edit"
                  disabled={true}
                  handleChange={handleChange}
                  selected={control.subscriptionPackage}
                />
              </Col>
              <Col className="mb-5">
                <>
                  <Col className="d-flex flex-row align-items-center mb-2">
                    <h6 className="mr-2 mb-0">Subscription Start:</h6>
                    {control.subscriptionStartDate ? (
                      <FormInput
                        type="date"
                        name="subscriptionStartDate"
                        defaultValue={control.subscriptionStartDate}
                        disabled={true}
                        style={{
                          width: 200,
                          background: "transparent",
                          border: "none",
                        }}
                      />
                    ) : (
                      <span>
                        <em>not set</em>
                      </span>
                    )}
                  </Col>
                  <Col className="d-flex flex-row align-items-center mb-2">
                    <h6 className="mr-2 mb-0">Subscription End:</h6>
                    {control.subscriptionEndDate ? (
                      <FormInput
                        type="date"
                        name="subscriptionEndDate"
                        defaultValue={control.subscriptionEndDate}
                        disabled={true}
                        style={{
                          width: 200,
                          background: "transparent",
                          border: "none",
                        }}
                      />
                    ) : (
                      <span>
                        <em>not set</em>
                      </span>
                    )}
                  </Col>
                </>
              </Col>
              <div className="d-flex flew-row">
                <Button
                  className="ml-3"
                  onClick={edit ? submitChanges : () => setEdit(true)}
                >
                  {edit ? "Submit Changes" : "Edit Profile"}
                </Button>
                {edit && (
                  <Button
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
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
  );
}
