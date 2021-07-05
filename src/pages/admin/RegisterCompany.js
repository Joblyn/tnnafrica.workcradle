import React, { useState } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  FormInput,
  Col,
  Row,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Alert,
  FormFeedback
} from "shards-react";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createCompany } from "../../apiConstants/apiConstants";
import { registerCompany } from "../../actions/superadmin/authAction";

export default function RegisterCompany() {
  const [control, setControl] = useState({ companyType: "Health" });
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  // const superadminAuth = useSelector((state) => state.superAdminAuth);
  const dispatch = useDispatch();
  // const history = useHistory();

  // useEffect(() => {
  //   if (superadminAuth.isRegistered) {
  //     setSuccess(true);
  //     setErrorMessage(false)
  //   } else {  
  //     setErrorMessage(superadminAuth.error);
  //   }
  // }, [superadminAuth]);

  // useEffect(() => {
  //   if (success) {
  //     setTimeout(() => {
  //       setSuccess(false);
  //       history.push("/interface");
  //     }, 3000);
  //   }
  // }, [success]);

  const handleChange = ({ target }) => {
    if (target.dataset.kind === "address") {
      setControl({
        ...control,
        address: {
          ...control.address,
          [target.name]: target.value,
        },
      });
    } else if (target.dataset.kind === "userInfo") {
      setControl({
        ...control,
        userInfo: {
          ...control.userInfo,
          [target.name]: target.value,
        },
      });
    } else {
      setControl({
        ...control,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerCompany(createCompany, control));
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center pt-0 pb-5 px-0 m-0 w-100"
    >
      {success && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Company Registered!
          </Alert>
        </Container>
      )}
      <Col
        className="bg-white card py-4 mt-5 px-0"
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h4 className="mb-0 text-center">Register Company</h4>
        <Form id="registerCompany" onSubmit={handleSubmit}>
          {errorMessage && <FormFeedback style={{display: 'block'}} className="mt-0 px-4">{errorMessage}</FormFeedback>}
          <CardHeader className="border-bottom" style={{ fontSize: "1rem" }}>
            <h6 className="m-0">Company Details</h6>
          </CardHeader>
          <Col className="px-4 py-3">
            <FormGroup>
              <label htmlFor="companyName" style={{ fontSize: "1rem" }}>
                Name
              </label>
              <FormInput
                id="companyName"
                name="name"
                type="text"
                placeholder="Company Name"
                className="form-custom"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                required
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="emailAdress" style={{ fontSize: "1rem" }}>
                Email
              </label>
              <FormInput
                id="emailAddress"
                name="email"
                type="email"
                placeholder="Company Email"
                className="form-custom"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                required
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="companyPhoneNumber" style={{ fontSize: "1rem" }}>
                Phone
              </label>
              <FormInput
                id="companyPhoneNumber"
                name="phone"
                type="text"
                placeholder="Company Phone Number"
                className="form-custom"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                required
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="addressLine1" style={{ fontSize: "1rem" }}>
                Address Line 1
              </label>
              <FormInput
                id="addressLine1"
                name="addressLine1"
                type="text"
                placeholder="Address Line 1"
                className="form-custom"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                required
                onChange={(e) => handleChange(e)}
                data-kind="address"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="addressLine2" style={{ fontSize: "1rem" }}>
                Address Line 2
              </label>
              <FormInput
                id="addressLine2"
                name="addressLine2"
                type="text"
                placeholder="Address Line 2"
                className="form-custom"
                style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                data-kind="address"
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="city" style={{ fontSize: "1rem" }}>
                  City
                </label>
                <FormInput
                  id="city"
                  placeholder="City"
                  name="city"
                  type="text"
                  className="form-custom"
                  style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                  required
                  onChange={(e) => handleChange(e)}
                  data-kind="address"
                />
              </Col>
              <Col md="4" className="form-group">
                <label htmlFor="inputState">State</label>
                <FormInput
                  id="inputState"
                  className="form-custom"
                  name="parish"
                  placeholder="State"
                  style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                  required
                  onChange={(e) => handleChange(e)}
                  data-kind="address"
                />
              </Col>
              <Col md="2" className="form-group">
                <label htmlFor="zipCode">Zip</label>
                <FormInput
                  id="zipCode"
                  placeholder="Zip"
                  name="zip"
                  style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                  className="form-custom"
                  required
                  onChange={(e) => handleChange(e)}
                  data-kind="address"
                />
              </Col>
            </Row>
          </Col>
          <Col className="m-0 p-0">
            <CardHeader className="border-bottom" style={{ fontSize: "1rem" }}>
              <h6 className="m-0">SuperAdmin Details</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Col>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName" style={{ fontSize: "1rem" }}>
                        UserName
                      </label>
                      <FormInput
                        id="feUserName"
                        placeholder="User Name"
                        style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                        className="form-custom"
                        name="userName"
                        required
                        onChange={(e) => handleChange(e)}
                        data-kind="userInfo"
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="phoneNumber">Phone</label>
                      <FormInput
                        id="phoneNumber"
                        placeholder="Phone Number"
                        style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                        className="form-custom"
                        required
                        name="userPhone"
                        onChange={(e) => handleChange(e)}
                        data-kind="userInfo"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                        placeholder="Email Address"
                        autoComplete="email"
                        required
                        name="userEmail"
                        onChange={(e) => handleChange(e)}
                        data-kind="userInfo"
                      />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput
                        type="password"
                        id="fePassword"
                        style={{ padding: ".5rem .75rem", fontSize: ".9rem" }}
                        placeholder="Password"
                        autoComplete="current-password"
                        name="userPassword"
                        required
                        onChange={(e) => handleChange(e)}
                        data-kind="userInfo"
                      />
                      <p
                        style={{
                          width: "100%",
                          marginTop: ".25rem",
                          fontSize: "80%",
                        }}
                        className="mb-0"
                      >
                        Minimum of 8 characters. Must contain a letter and a
                        number.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col className="px-4">
            <Button
              form="registerCompany"
              type="submit"
              className="w-100 bg-custom btn-custom"
              style={{ fontSize: "1rem" }}
            >
              Log In
            </Button>
          </Col>
        </Form>
      </Col>
    </Container>
  );
}
