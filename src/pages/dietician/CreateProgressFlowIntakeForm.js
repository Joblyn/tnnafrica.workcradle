import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  Alert,
  Button,
  FormGroup,
} from "shards-react";
import FormItemCatalogue from "../../components/components-overview/FormItemCatalogue";
import PageTitle from "../../components/common/PageTitle";
import FormBuilder from "../../components/components-overview/FormBuilder";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../actions/superadmin/patients";
import { createIntakeForm } from "../../actions/dietician/patient";
import {
  getPatients,
  createIntakeFormEndpoint,
} from "../../apiConstants/apiConstants";

export default function CreateProgressFlowIntakeForm() {
  const dietitian = JSON.parse(localStorage.getItem("loggedInUser"));
  const [selectedPatient, setSelectedPatient] = useState();
  const allPatients = useSelector((state) => state.allPatients);
  const [patients, setPatients] = useState();
  const createIntakeFormState = useSelector((state) => state.createIntakeForm);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const formItems = useSelector((state) => state.formItems);

  const dispatch = useDispatch();

  useEffect(() => {
    let endpoint = getPatients + dietitian.companyCode;
    dispatch(getAllPatients(endpoint));
  }, []);

  useEffect(() => {
    setPatients(
      allPatients.data &&
        allPatients.data.filter(
          (item) => item.Patient.assignedDietitian === dietitian.id
        )
    );
  }, [allPatients]);

  const handleSubmit = () => {
    let endpoint = createIntakeFormEndpoint + selectedPatient;
    let arr = [...formItems];
    let items = arr.map((item) => {
      delete item.component;
      delete item.default;
      return { ...item };
    });
    let payload = {
      createdBy: dietitian.id,
      createdFor: selectedPatient,
      form: items,
    };
    dispatch(createIntakeForm(endpoint, payload));
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && createIntakeFormState.isSuccessful) {
      setAlert(true);
    }
  }, [createIntakeFormState, submitted]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
        setSubmitted(false);
        setModal(false);
        window.location.reload();
      }, 2000);
    }
  }, [alert]);

  const close = () => {
    setSubmitted(false);
    setModal(false);
  };
  const [show, setShow] = useState();

  return (
    <Container fluid>
      {modal && (
        <div
          className={`d-flex justify-content-center align-items-center position-fixed`}
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            background: "rgba(0,0,0,.14)",
          }}
        >
          <Card
            className="pb-3 position-absolute"
            style={{ zIndex: 1000, width: 500, top: "30%" }}
          >
            <span
              className="material-icons"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
              }}
              onClick={close}
            >
              close
            </span>
            <CardHeader className="border-bottom">Select Patient</CardHeader>
            <Col
              className={`p-3 pb-0 ${selectedPatient ? "border-bottom" : ""}`}
            >
              <fieldset>
                {patients &&
                  patients.map((item, id) => (
                    <FormGroup
                      key={`item-${id + 1}`}
                      style={{ cursor: "pointer" }}
                      className="mb-1"
                    >
                      <input
                        type="radio"
                        value={item.Patient.id}
                        onChange={({ target }) =>
                          setSelectedPatient(target.value)
                        }
                        name="patient"
                        className="mr-2"
                      />
                      <spam>{item.Patient.name}</spam>
                    </FormGroup>
                  ))}
              </fieldset>
            </Col>
            {selectedPatient && (
              <Col className="pt-2">
                <Button
                  disabled={selectedPatient ? false : true}
                  className="ml-3"
                  onClick={handleSubmit}
                >
                  Upload to patient
                </Button>
              </Col>
            )}
          </Card>
        </div>
      )}
      {alert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Created Intake Form for Patient!
          </Alert>
        </Container>
      )}
      {error && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Cannot upload form with empty
            title.
          </Alert>
        </Container>
      )}
      <Col className="main-content-container px-4 pb-5">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Progress Intake Form"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row className="position-relative">
          <span class="material-icons-outlined position-absolute form-toggle" style={{top: 0, left: 0}} onClick={() => setShow(true)}>menu_open</span>
          <FormItemCatalogue show={show} setShow={setShow}/>
          <FormBuilder setModal={setModal} setError={setError} />
        </Row>
      </Col>
    </Container>
  );
}
