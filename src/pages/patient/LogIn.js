import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  FormInput,
  Col,
  FormFeedback,
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { defaultAuthState, login } from "../../actions/auth";
import {
  useHistory,
  // Link
} from "react-router-dom";
import { loginEndpoint } from "../../apiConstants/apiConstants";

export default function PatientLogin() {
  const [control, setControl] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (authState.isSuccessful && authState.isLoggedIn) {
      if (authState.data.user.role === "patient") {
        localStorage.setItem("tokens", JSON.stringify(authState.data.tokens));
        localStorage.setItem("loggedInUser",JSON.stringify(authState.data.user));
        localStorage.setItem("role", authState.data.user.role);
        setErrorMessage(false);
        history.push("/patient/profile");
      } else {
        if (submitted) {
          setErrorMessage("Invalid email or password");
          dispatch(defaultAuthState);
        }
      }
    } else if (authState.isSuccessful === false && authState.error) {
      if (submitted) {
        setErrorMessage(authState.error);
      }
    }
  }, [authState, submitted]);

  const handleChange = ({ target }) => {
    setControl({
      ...control,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEndpoint, control));
    setSubmitted(true);
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center py-5 px-2 m-0 w-100"
    >
      <Col
        className="bg-white card p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h4 className="mb-4 text-center">Login</h4>
        <Form id="superAdmin_login" onSubmit={handleSubmit}>
          {errorMessage && (
            <FormFeedback style={{ display: "block" }} className="mt-0">
              {errorMessage}
            </FormFeedback>
          )}
          <FormGroup>
            <label htmlFor="emailAdress" style={{ fontSize: "1rem" }}>
              Email
            </label>
            <FormInput
              id="emailAddress"
              name="email"
              type="email"
              placeholder="Email"
              className="form-custom"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <FormInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              onChange={handleChange}
            />
          </FormGroup>
          <Col className="p-0">
            <Button
              type="submit"
              className="w-100 bg-custom btn-custom"
              style={{ fontSize: "1rem" }}
              form="superAdmin_login"
            >
              Log In
            </Button>
          </Col>
        </Form>
        {/* <Col className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/patient/signup" className="text-decoration-none">
            Sign Up
          </Link>
        </Col> */}
      </Col>
    </Container>
  );
}
