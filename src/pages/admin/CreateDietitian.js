import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  FormInput,
  Col,
  Row,
  Alert,
  FormFeedback,
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { createDietitianEndpoint } from "../../apiConstants/apiConstants";
import {
  createDietitian,
  createDietitianStateToDefault,
} from "../../actions/superadmin/dietitian";
// import { useHistory } from "react-router";

export default function CreateDietitian() {
  let companyCode = JSON.parse(localStorage.getItem("loggedInUser"))
    .companyCode;
  const dispatch = useDispatch();
  const createDietitianState = useSelector((state) => state.createDietitian);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // const history = useHistory();

  // useEffect(() =>  {
  //   if (createPatientState.isCreated === true) {
  //     setErrorMessage(createDietitianState.data.message);
  //   } else if (
  //     createDietitianState.data &&
  //     createDietitianState.data.code === undefined
  //   ) {
  //     alert("Dietitian Created");
  //     dispatch(createDietitianStateToDefault);
  //     setErrorMessage(false);
  //   }
  // }, [createDietitianState]);
  useEffect(() => {
    if (createDietitianState.isCreated) {
      if (createDietitianState.data.code) {
        setSuccess(false);
        setErrorMessage(createDietitianState.data.message);
      } else {
        setSuccess(true);
        setErrorMessage(false);
        dispatch(createDietitianStateToDefault);
      }
    } else if (createDietitianState.isCreated === false) {
      setSuccess(false);
      setErrorMessage(createDietitianState.error);
    }
  }, [createDietitianState]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 3000);
    }
    dispatch(createDietitianStateToDefault);
  }, [success]);

  const [control, setControl] = useState({
    isEmailVerified: true,
    companyCode: `${companyCode}`,
  });

  const handleChange = ({ target }) => {
    setControl({
      ...control,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createDietitian(createDietitianEndpoint, control));
  };

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {success && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Registered Successfully!
          </Alert>
        </Container>
      )}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Create User"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      <Col fluid className="d-flex flex-column align-items-center m-0">
        <Col
          className="bg-white card p-4"
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h4 className="mb-4 text-center">Create User</h4>
          <Form id="dietician_Login" onSubmit={handleSubmit}>
            {errorMessage && (
              <FormFeedback style={{ display: "block" }} className="mt-0">
                {errorMessage}
              </FormFeedback>
            )}
            <FormGroup className="d-flex flex-column">
              <label>User Role</label>
              <select
                onChange={handleChange}
                name="role"
                style={{ width: "100%" }}
                className="form-control text-muted"
                required
              >
                <option></option>
                <option value="admin">Admin</option>
                <option value="dietitian">Dietitian</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <FormInput
                required
                onChange={handleChange}
                id="name"
                name="name"
                placeholder="Name"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="emailAdress" style={{ fontSize: "1rem" }}>
                Email
              </label>
              <FormInput
                required
                onChange={handleChange}
                id="emailAddress"
                name="email"
                type="email"
                placeholder="Email"
                className="form-custom"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">Phone</label>
              <FormInput
                required
                onChange={handleChange}
                id="phone"
                name="phone"
                placeholder="Phone"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <FormInput
                required
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              />
              <p
                style={{
                  width: "100%",
                  marginTop: ".25rem",
                  fontSize: "80%",
                }}
                className="mb-0"
              >
                Minimum of 8 characters. Must contain a letter and a number.
              </p>
            </FormGroup>
            <FormGroup>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <FormInput
                required
                onChange={handleChange}
                id="password"
                name="confirmPassword"
                type="password"
                placeholder="Password"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              />
            </FormGroup>
            <Col className="p-0">
              <Button
                type="submit"
                className="w-100 bg-custom btn-custom"
                style={{ fontSize: "1rem" }}
                form="dietician_Login"
              >
                Create User
              </Button>
            </Col>
            {errorMessage && (
              <FormFeedback style={{ display: "block" }} className="mt-0">
                {errorMessage}
              </FormFeedback>
            )}
          </Form>
        </Col>
      </Col>
    </Container>
  );
}
