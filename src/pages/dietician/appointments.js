import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import {
  Container,
  FormGroup,
  FormInput,
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardFooter,
  DropdownItem,
  Alert,
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import {
  getAppointmentsEndpoint,
  updateAppointmentEdnpoint,
  deleteAppointmentEndpoint,
  getPatients
} from "../../apiConstants/apiConstants";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment
} from "../../actions/patient/patient";
import PageSpinner from "../../components/common/PageSpinner";
import CreateAppointment from "../../components/createAppointment";
import { getAllPatients } from "../../actions/superadmin/patients";

const D = styled(DropdownItem)`
  display: none;
  background-color: #fff;
`;

const Span = styled.span`
  & :hover {
    > ${D} {
      display: block;
      & :hover {
        background-color: #eceeef;
      }
    }
  }
`;

export default function Appointments() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const dispatch = useDispatch();
  const getAppointmentsState = useSelector((state) => state.getAppointments);
  const createAppointmentState = useSelector(
    (state) => state.createAppointment
  );

  const [appointmentsState, setAppointmentsState] = useState();
  const [appointments, setAppointments] = useState();
  const [formPopup, setFormPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let appointmentsEndpoint = getAppointmentsEndpoint + user.companyCode;
    let patientsEndpoint = getPatients + user.companyCode;
    dispatch(getAppointments(appointmentsEndpoint));
    dispatch(getAllPatients(patientsEndpoint));
  }, []);

  useEffect(() => {
    getAppointmentsState.data &&
      setAppointmentsState(
        getAppointmentsState.data.filter((item) => item.Dietitian.id === user.id)
      );
  }, [getAppointmentsState]);

  useEffect(() => {
    appointmentsState && setAppointments(appointmentsState);
  }, [appointmentsState]);

  useEffect(() => {
    if (createAppointmentState && submitted) {
      setAlert(true);
    }
  }, [submitted, createAppointmentState]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setFormPopup(false);
        setSubmitted(false);
        setAlert(false);
        window.location.reload();
      }, 2000);
    }
  }, [alert]);

  const handleSearch = ({ target }) => {
    if (target.value === "") {
      setAppointments(appointmentsState);
    } else {
      setAppointments(
        appointmentsState.filter(
          (item) =>
            item.Appointment.appointmentNotes &&
            item.Appointment.appointmentNotes.includes(target.value)
        )
      );
    }
  };

  const [updated, setUpdated] = useState(false);

  const onUpdateAppointment = (id, type) => {
    const payload = { ...appointments[id].Appointment };
    if (type === "accept") {
      payload.isDeleted = false;
      payload.isAccepted = true;
    } else if (type === "reject") {
      payload.isAccepted = false;
      payload.isDeleted = true;
    }
    delete payload.createdAt;
    delete payload.upDatedAt;
    let endpoint = updateAppointmentEdnpoint + payload.id;
    delete payload.id;
    dispatch(updateAppointment(endpoint, payload));
    setUpdated(true);
  };

  const updateAppointmentState = useSelector(
    (state) => state.updateAppointment
  );

  useEffect(() => {
    if (updated && updateAppointment.isSuccessful) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [updateAppointmentState, updated]);

  const [deleted, setDeleted] = useState(false);

  const onDeleteAppointment = (id) => {
    let endpoint = deleteAppointmentEndpoint + id;
    dispatch(deleteAppointment(endpoint));
    setDeleted(true);
  }

  const deleteAppointmentState = useSelector(state => state.deleteAppointment);

  useEffect(() => {
    if(deleted && deleteAppointmentState.isSuccessful) {
      setTimeout(window.location.reload(), 1500);
    }
  }, [deleteAppointmentState, deleted]);

  const [patients, setPatients] = useState();
  const allPatients = useSelector((state) => state.allPatients);

  useEffect(() => {
    setPatients(
      allPatients.data &&
        allPatients.data.filter(
          (item) => item.Patient.assignedDietitian === user.id
        )
    );
  }, [allPatients]);

  if (!appointments) {
    return <PageSpinner />;
  }

  return (
    <Container>
      {alert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Created Appointment with
            Dietitian
          </Alert>
        </Container>
      )}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Appointments"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      <Col style={{ minHeight: "70vh" }} className="pb-5">
        {formPopup && (
          <div
            className="position-fixed d-flex justify-content-center align-items-center"
            style={{
              top: 0,
              left: 0,
              zIndex: 500,
              width: "100vw",
              minHeight: "100%",
              background: "rgba(0,0,0,.12)",
              overflowY: "auto"
            }}
          >
            <CreateAppointment
              user={user}
              setFormPopup={setFormPopup}
              setSubmitted={setSubmitted}
              patients={patients}
            />
          </div>
        )}
        <div>
          <FormGroup className="row d-flex align-items-center">
            <label className="mb-0 mr-3">Search keyword:</label>
            <FormInput onChange={handleSearch} style={{ width: 200 }} />
          </FormGroup>
        </div>

        <Row
          style={{
            display: "grid",
            gridGap: "20px",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          }}
        >
          <Card className="p-3" style={{ height: "fit-content" }}>
            <Button
              outline
              className="text-center"
              style={{ fontSize: "1.2rem", height: 140 }}
              onClick={() => setFormPopup(true)}
            >
              <div style={{ fontSize: "3rem", fontWeight: 600 }}>+</div>
              Create Appointment
            </Button>
          </Card>
          {appointments.length
            ? appointments.reverse().map((item, id) => {
                let d = new Date(`${item.Appointment.appointmentDate}`);
                return (
                  <Card
                    className="position-relative"
                    key={`appointment-${id + 1}`}
                    style={{ height: "fit-content" }}
                  >
                    <Span>
                      <span
                        class="material-icons-outlined position-absolute text-muted"
                        style={{ top: 10, right: 10, cursor: "pointer" }}
                      >
                        more_vert
                      </span>
                      <D
                        className="text-danger position-absolute"
                        style={{ top: 35, right: 10, width: "fit-content" }}
                        onClick={() => onDeleteAppointment(item.Appointment.id)}
                      >
                        Delete
                      </D>
                    </Span>
                    <CardBody className="px-4 pb-2">
                      <div className="d-flex justify-content-between">
                        <span>{d.toString().slice(0, 15)}</span>
                        <span>{d.toTimeString().slice(0, 5)}</span>
                      </div>
                      <div
                        className={`btn text-white ${
                          item.Appointment.isAccepted
                            ? "bg-success"
                            : item.Appointment.isDeleted
                            ? "bg-danger"
                            : "bg-warning"
                        } rounded p-1`}
                        style={{ cursor: "default" }}
                      >
                        {item.Appointment.isAccepted
                          ? "Accepted"
                          : item.Appointment.isDeleted
                          ? "Rejected"
                          : "Pending"}
                      </div>
                      <div>
                        Duration:
                        <span className="ml-1 text-muted">{`${item.Appointment.appointmentDuration}`}</span>
                      </div>
                      <div style={{ maxHeight: 70, overflowY: "auto" }}>
                        Note:
                        <span className="text-muted">
                          {item.Appointment.appointmentNotes}
                        </span>
                      </div>
                    </CardBody>
                    <div className="px-4">
                      {item.Appointment.appointmentPlatform && (
                        <div>
                          Platform:
                          <span className="text-muted ml-1">
                            {item.Appointment.appointmentPlatform}
                          </span>
                        </div>
                      )}
                      {item.Appointment.appointmentPlatformLink && (
                        <div>
                          Link:
                          <span className="text-muted ml-1">
                            <Link
                              to={
                                item.appointmentPlatformLink
                                  ? item.appointmentPlatformLink
                                  : ""
                              }
                              target="_blank"
                            >
                              {item.Appointment.appointmentPlatformLink}
                            </Link>
                          </span>
                        </div>
                      )}
                    </div>
                    <CardFooter className="border-top px-5">
                      <div className="row">
                        <div className="">
                        <span className="mr-3">Patient:</span>
                          <span>{item.Patient.name}</span>
                        </div>
                        {/* {!(
                          item.Appointment.isAccepted ||
                          item.Appointment.isDeleted
                        ) && (
                          <div className="btn-group-sm ml-auto">
                            <Button
                              className="btn-white"
                              onClick={() => onUpdateAppointment(id, "accept")}
                            >
                              <span className="text-success">
                                <i className="material-icons">check</i>
                              </span>
                              Accept
                            </Button>
                            <Button
                              className="btn-white"
                              onClick={() => onUpdateAppointment(id, "reject")}
                            >
                              <span className="text-danger">
                                <i className="material-icons">clear</i>
                              </span>
                              Reject
                            </Button>
                          </div>
                        )} */}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            : ""}
        </Row>
      </Col>
    </Container>
  );
}
