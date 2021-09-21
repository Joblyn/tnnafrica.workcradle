import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Col,
  Button,
  Alert,
} from "shards-react";
import { FormInput } from "shards-react";
import PageSpinner from "../../components/common/PageSpinner";
import PageTitle from "../../components/common/PageTitle";
import {
  getAdmins,
  updateCompanyDataEndpoint,
} from "../../apiConstants/apiConstants";
import {
  updateCompanyData,
  getAllAdmins,
} from "../../actions/superadmin/authAction";
import { defaultAuthState } from "../../actions/auth";

export default function SuperAdminProfile() {
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("loggedInUser"));

  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const allAdmins = useSelector((state) => state.allAdmins);
  const updatedCompanyData = useSelector((state) => state.updatedCompanyData);

  const [control, setControl] = useState();
  const [customAlert, setCustomAlert] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const handleChange = ({ target }) => {
    setControl({ ...control, [target.name]: target.value });
  };

  useEffect(() => {
    if (allAdmins.isSuccessful && allAdmins.data) {
      let currentAdmin = allAdmins.data.filter(
        (admin) => admin.id === profile.id
      )[0];
      setControl(currentAdmin);
    }
  }, [allAdmins]);

  useEffect(() => {
    const endpoint = getAdmins + profile.companyCode;
    dispatch(getAllAdmins(endpoint));
  }, []);

  const submitChanges = () => {
    let endpoint = updateCompanyDataEndpoint + control.id;
    delete control.createdAt;
    delete control.updatedAt;
    delete control.id;
    delete control.isSuperAdmin;
    if (control.email !== profile.email) {
      setEmailChanged(true);
      setUpdated(true);
      dispatch(updateCompanyData(endpoint, control));
    } else {
      dispatch(updateCompanyData(endpoint, control));
      setUpdated(true);
      setEmailChanged(false);
    }
  };

  useEffect(() => {
    if (updated && updatedCompanyData.isSuccessful) {
      if (emailChanged) {
        alert("Changed email. Kindly login with new email");
        setCustomAlert(false);
        window.localStorage.clear();
        dispatch(defaultAuthState);
        window.location.hash = "#/";
      } else {
        setCustomAlert(true);
      }
    }
  }, [updatedCompanyData, updated, emailChanged]);

  useEffect(() => {
    if (customAlert) {
      setTimeout(() => {
        setCustomAlert(false);
        window.location.reload();
      }, 2000);
    }
  }, [customAlert]);

  const restore = () => {
    setControl(allAdmins.data.filter((admin) => admin.id === profile.id)[0]);
  };

  if (!control) {
    return <PageSpinner />;
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      {customAlert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Edited Company Profile.
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

      <Card style={{ width: "100%", maxWidth: "506px" }} className="mx-auto">
        <CardHeader
          className="border-bottom"
          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Company Profile
        </CardHeader>
        <CardBody>
          <Col className="d-flex flex-row align-items-center">
            <h6 className="mb-0 mr-2">Name:</h6>
            <FormInput
              defaultValue={`${control.name}`}
              disabled={!edit}
              name="name"
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
          <Col className="d-flex flex-row align-items-center">
            <h6 className="mb-0 mr-2">Email:</h6>
            <FormInput
              defaultValue={`${control.email}`}
              disabled={!edit}
              name="email"
              type="email"
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
          <Col className="d-flex flex-row align-items-center">
            <h6 className="mb-0 mr-2">Phone:</h6>
            <FormInput
              defaultValue={`${control.phone}`}
              disabled={!edit}
              name="phone"
              type="email"
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
          <Col className="d-flex flex-row align-items-center">
            <h6 className="mb-0 mr-2">Role:</h6>
            <span>Admin</span>
          </Col>

          <div className="d-flex flew-row mt-5">
            <Button
              size="sm"
              theme="primary"
              className="ml-3"
              onClick={edit ? submitChanges : () => setEdit(true)}
            >
              {edit ? "Submit Changes" : "Update Profile"}
            </Button>
            {edit && (
              <Button
                size="sm"
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
        </CardBody>
      </Card>
    </Container>
  );
}
