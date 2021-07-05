import React, { useState, useEffect } from "react";
import {
  Container,
  FormInput,
  Button,
  Form,
  FormGroup,
  Col,
  Row,
  Alert,
  FormFeedback,
} from "shards-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPatientEndpoint } from "../../apiConstants/apiConstants";
import { createPatient } from "../../actions/patient/authAction";

export default function PatientSignUp() {
  let companyCode = localStorage.getItem("companyCode");  const [foodPreferences, setFoodPreferences] = useState([]);
  const [currentFoodPreference, setCurrentFoodPreference] = useState("");
  const [healthConditions, setHealthConditions] = useState([]);
  const [currentHealthCondition, setCurrentHealthCondition] = useState("");
  const [control, setControl] = useState({
    companyCode,
    isEmailVerified: false,
    role: "patient",
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [subscriptionPackage, setSubscriptionPackage] = useState("");

  const dispatch = useDispatch();
  const createPatientState = useSelector((state) => state.createPatient);
  const history = useHistory();

  useEffect(() => {
    console.log(createPatientState);
    if (createPatientState.isCreated === true) {
      setSuccess(true);
      setErrorMessage(false);
    } else if (createPatientState.isCreated === false) {
      setErrorMessage(createPatientState.error);
    }
  }, [createPatientState]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        alert("Patient signup successful, kindly login.")
        history.push("/patient/login");
      });
    }
  }, [success]);

  const addFoodPreference = () => {
    setFoodPreferences([...foodPreferences, currentFoodPreference]);
  };

  const handleChange = ({ target }) => {
    setControl({
      ...control,
      [target.name]: target.value,
    });
  };

  const handleCheckbox = ({ target }) => {
    if (target.checked) {
      setHealthConditions([...healthConditions, target.value]);
    } else {
      setHealthConditions(() => {
        let arr = [...healthConditions];
        let itemIndex = arr.indexOf(target.value);
        arr.splice(itemIndex, 1);
        return arr;
      });
    }
  };

  const handleRadio = ({ target }) => {
    setSubscriptionPackage(target.value);
  };

  const addHealthCondition = () => {
    setHealthConditions([...healthConditions, currentHealthCondition]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload;
    payload = {
      ...control,
      age: parseInt(control.age),
      weight: parseInt(control.weight),
      healthCondition: healthConditions,
      foodPreference: foodPreferences,
      subscriptionPackage,
    };
    console.log(payload);
    dispatch(createPatient(createPatientEndpoint, payload));
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
        {success && (
          <Container fluid className="px-0 sticky-top">
            <Alert className="mb-0 text-center">
              <i className="fa fa-info mx-2"></i>Registered Successfully!
            </Alert>
          </Container>
        )}
        <h4 className="mb-4 text-center">Create Patient</h4>
        <Form id="signUp" onSubmit={handleSubmit}>
          {errorMessage && (
            <FormFeedback style={{ display: "block" }} className="mt-0 px-4">
              {errorMessage}
            </FormFeedback>
          )}
          <Row>
            <Col className="col-sm-12 col-md-12 col-lg-12">
              <FormGroup>
                <label htmlFor="name" style={{ fontSize: "1rem" }}>
                  Name
                </label>
                <FormInput
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="form-custom"
                  style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <FormInput
              required
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="form-custom"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Phone</label>
            <FormInput
              required
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              className="form-custom"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              onChange={handleChange}
            />
          </FormGroup>
          <Row>
            <Col className="col-sm-6 col-md-6 col-lg-6">
              <FormGroup>
                <label htmlFor="age" style={{ fontSize: "1rem" }}>
                  Age
                </label>
                <FormInput
                  required
                  id="age"
                  name="age"
                  placeholder="Age"
                  className="form-custom"
                  style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col className="col-sm-6 col-md-6 col-lg-6">
              <FormGroup>
                <label htmlFor="weight" style={{ fontSize: "1rem" }}>
                  Weight
                </label>
                <FormInput
                  required
                  id="weight"
                  name="weight"
                  placeholder="Weight"
                  className="form-custom"
                  style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <label>Health Condition</label>
            <fieldset style={{ fontSize: ".85rem" }}>
              <div className="d-block">
                <input
                  type="checkbox"
                  className="m-2"
                  value="Obese"
                  onChange={handleCheckbox}
                />
                Obese
              </div>
              <div className="d-block">
                <input
                  type="checkbox"
                  className="m-2"
                  value="Diabetic"
                  onChange={handleCheckbox}
                />
                Diabetic
              </div>
              <div className="d-block">
                <input
                  type="checkbox"
                  className="m-2"
                  value="Hypertensive"
                  onChange={handleCheckbox}
                />
                Hypertensive
              </div>
              <div className="d-block">
                <input
                  type="checkbox"
                  className="m-2"
                  value="Heart disease"
                  onChange={handleCheckbox}
                />
                Heart disease
              </div>
            </fieldset>
            <Row>
              <FormInput
                type="text"
                name="others"
                placeholder="Others"
                id="health-other"
                style={{ width: "200px" }}
                className="ml-3 mr-3"
                defaultValue={currentHealthCondition}
                onChange={({ target }) =>
                  setCurrentHealthCondition(target.value)
                }
              />
              <Button onClick={addHealthCondition}>
                <span>+</span>Add
              </Button>
            </Row>
            <div className="border-bottom p-1" style={{ minHeight: "2rem" }}>
              {healthConditions.map((item, i) => {
                return (
                  <span style={{ fontSize: ".85rem" }} key={`item=${i + 1}`}>
                    {`${item}, `}
                  </span>
                );
              })}
            </div>
          </FormGroup>
          <FormGroup>
            <label htmlFor="healthGoal">Health Goal</label>
            <FormInput
              required
              id="healthGoal"
              name="healthGoal"
              placeholder="Health Goal"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="foodPreference">Food Preference</label>
            <FormGroup>
              <Row className="ml-0">
                <FormInput
                  required
                  id="foodPreference"
                  name="foodPreference"
                  placeholder="Specify food preference"
                  onChange={({ target }) =>
                    setCurrentFoodPreference(target.value)
                  }
                  style={{ width: "300px" }}
                  className="mr-3"
                  defaultValue={currentFoodPreference}
                />
                <Button onClick={addFoodPreference}>
                  <span>+</span>Add
                </Button>
              </Row>
              <div className="border-bottom p-1" style={{ minHeight: "2rem" }}>
                {foodPreferences.map((item, i) => {
                  return (
                    <span style={{ fontSize: ".85rem" }} key={`item=${i + 1}`}>
                      {`${item}, `}
                    </span>
                  );
                })}
              </div>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <label>Subscription Package</label>
            <fieldset style={{ fontSize: ".85rem" }}>
              <div className="d-block">
                <input
                  type="radio"
                  className="m-2"
                  value="Basic Package"
                  onChange={handleRadio}
                  name="subscription"
                />
                Basic Package
              </div>
              <div className="d-block">
                <input
                  type="radio"
                  className="m-2"
                  value="Platinum Package"
                  onChange={handleRadio}
                  name="subscription"
                />
                Platinum Package
              </div>
              <div className="d-block">
                <input
                  type="radio"
                  className="m-2"
                  value="Premium Package"
                  onChange={handleRadio}
                  name="subscription"
                />
                Premium Package
              </div>
            </fieldset>
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <FormInput
              required
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
              onChange={handleChange}
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
          {/* <FormGroup>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <FormInput
              required
              id="comfirmPassword"
              name="confirmPasswordInput"
              type="password"
              placeholder="Confirm Password"
              style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
            />
            <FormFeedback></FormFeedback>
          </FormGroup> */}
          <Col className="p-0">
            <Button
              type="submit"
              className="w-100 bg-custom btn-custom"
              style={{ fontSize: "1rem" }}
              form="signUp"
            >
              Register
            </Button>
          </Col>
          {errorMessage && (
            <FormFeedback style={{ display: "block" }} className="mt-2 px-4">
              {errorMessage}
            </FormFeedback>
          )}
        </Form>
      </Col>
      <Col className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/patient/login" className="text-decoration-none">
          Log In
        </Link>
      </Col>
    </Container>
  );
}
