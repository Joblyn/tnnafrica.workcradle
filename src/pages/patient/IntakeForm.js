import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormInput,
  Row,
  Button,
  FormTextarea,
  Alert,
} from "shards-react";
import {
  getIntakeForms,
  createIntakeInfo,
} from "../../actions/dietician/patient";
import {
  getItakeFormsEndpoint,
  createIntakeInfoEndpoint,
} from "../../apiConstants/apiConstants";
import PageSpinner from "../../components/common/PageSpinner";
import PageTitle from "../../components/common/PageTitle";

export default function IntakeForm() {
  const patient = JSON.parse(localStorage.getItem("loggedInUser"));
  const dispatch = useDispatch();
  const intakeForms = useSelector((state) => state.intakeForms);
  const [intakeForm, setIntakeForm] = useState();
  const [control, setControl] = useState();
  const createIntakeInfoState = useSelector((state) => state.createIntakeInfo);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [intakeFormData, setIntakeFormData] = useState();

  useEffect(() => {
    dispatch(getIntakeForms(getItakeFormsEndpoint));
  }, []);

  useEffect(() => {
    if (intakeForms.isSuccessful) {
      let result = intakeForms.data.filter(
        (item) => item.createdFor === patient.id
      );
      result.length && setIntakeForm(result[0].form);
      setIntakeFormData(result[0]);
    }
  }, [intakeForms]);

  const handleChange = ({ target }) => {
    setControl({
      ...control,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (submitted && createIntakeInfoState.data) {
      setSuccess(true);
    }
  }, [submitted, createIntakeInfoState]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        setSubmitted(false);
        window.location.reload();
      }, 2000);
    }
  }, [success]);

  const selectInputType = (item) => {
    switch (item.type) {
      case "text":
        return (
          <FormInput
            required={item.required}
            name={item.field}
            onChange={handleChange}
          />
        );
      case "date":
        return (
          <FormInput
            type="date"
            required={item.required}
            name={item.field}
            onChange={handleChange}
          />
        );
      case "textarea":
        return (
          <FormTextarea
            required={item.required}
            name={item.field}
            onChange={handleChange}
          />
        );
      case "checkbox":
        return (
          <fieldset required={item.required ? "true" : "false"}>
            {item.options &&
              item.options.map((opt, i) => (
                <div key={`${item.field}opt-${i + 1}`}>
                  <input
                    value={opt}
                    type="checkbox"
                    name={item.field}
                    onChange={handleChange}
                  />
                  {opt}
                </div>
              ))}
          </fieldset>
        );
      case "radio":
        return (
          <fieldset required={item.required ? "true" : "false"}>
            {item.options &&
              item.options.map((opt, i) => (
                <div key={`${item.field}opt-${i + 1}`}>
                  <input
                    value={opt}
                    type="radio"
                    name={item.field}
                    onChange={handleChange}
                  />
                  {opt}
                </div>
              ))}
          </fieldset>
        );
      default:
    }
  };

  const handleSubmit = () => {
    let payload = {
      createdBy: intakeFormData.createdBy,
      createdFor: intakeFormData.createdFor,
      companyCode: patient.companyCode,
      information: { ...control },
    };
    dispatch(createIntakeInfo(createIntakeInfoEndpoint, payload));
    setSubmitted(true);
  };

  if(!intakeForms.isSuccessful) {
    return <PageSpinner />
  }

  return (
    <Container className="pb-5">
      {success && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Submitted progress intake form.
          </Alert>
        </Container>
      )}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Progress Intake Form"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      <Col style={{minHeight: '70vh'}}>
        {intakeForm ? (
          <Card className="mx-auto" style={{ width: "100%", maxWidth: "800px" }}>
            <CardHeader className="border-bottom">Progress Intake Form</CardHeader>
            <CardBody>
              <Form id="intake_form">
                {intakeForm.map((item, id) => (
                  <FormGroup key={`item-${id + 1}`}>
                    <label>{item.field}</label>
                    {selectInputType(item)}
                  </FormGroup>
                ))}
                <Button outline form="intake_form" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        ) : (
          <p className="text-muted">
            <em>Intake form not yet created by dietitian.</em>
          </p>
        )}
      </Col>
    </Container>
  );
}
