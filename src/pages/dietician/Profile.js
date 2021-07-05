import React, { useEffect, useState } from "react";
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
import PageTitle from "../../components/common/PageTitle";
import { getDietitianByIdEndpoint, updateCompanyDataEndpoint } from "../../apiConstants/apiConstants";
import { getDietitianById } from "../../actions/dietician/dietitian";
import { useDispatch, useSelector } from "react-redux";
import PageSpinner from "../../components/common/PageSpinner";
import { updateDietitianData } from "../../actions/superadmin/dietitian";
import avatar1 from "../../images/avatars/1.jpg";


export default function DietitianProfile() {
  let dietitian = JSON.parse(localStorage.getItem("loggedInUser"));

  const dispatch = useDispatch();
  const [control, setControl] = useState();
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [alert, setAlert] = useState(false);
  const dietitianById = useSelector((state) => state.dietitianById);
  const updatedDietitianData = useSelector(
    (state) => state.updateDietitianData
  );

  useEffect(() => {
    let endpoint = getDietitianByIdEndpoint + dietitian.id;
    console.log(endpoint);
    dispatch(getDietitianById(endpoint));
  }, []);

  useEffect(() => {
    console.log(dietitianById);
    dietitianById.data && setControl(dietitianById.data);
  }, [dietitianById]);

  const handleChange = ({ target }) => {
    setControl({ ...control, [target.name]: target.value });
  };
  
  const submitChanges = () => {
    let endpoint = updateCompanyDataEndpoint + control.id;
    delete control.createdAt;
    delete control.updatedAt;
    delete control.id;
    delete control.isSuperAdmin;
    console.log(control);
    dispatch(updateDietitianData(endpoint, control));
    setUpdated(true);
  }

  useEffect(() => {
    if (updated && updatedDietitianData.data) {
      setAlert(true);
    }
  }, [updated, updatedDietitianData]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
        window.location.reload();
      }, 2000);
    }
  }, [alert]);

  const restore = () => {
    setControl(dietitianById.data);
    setEdit(false);
  };


  if (!control) {
    return <PageSpinner />;
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      {alert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className={`mb-0 text-center`}>
            <i className="fa fa-info mx-2"></i>
            Edited Profile.
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
      <Col>
        <Card
          className="pb-2 mx-auto d-flex flex-colum justify-content-center align-items center"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <CardHeader className="text-center">
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
              <span className="text-muted d-block mb-2">{control.email}</span>
            ) : (
              <FormInput
                type="email"
                defaultValue={control.email}
                name="email"
                onChange={handleChange}
              />
            )}
            {!edit ? (
              <span className="text-muted d-block mb-2">{control.phone}</span>
            ) : (
              <FormInput
                defaultValue={control.phone}
                name="phone"
                disabled={!edit}
                onChange={handleChange}
              />
            )}
          </CardHeader>
          <div className="d-flex flex-row justify-content-center mt-5 pb-1">
            <Button
              outline
              className="ml-3"
              onClick={edit ? submitChanges : () => setEdit(true)}
            >
              {edit ? "Upload Changes" : "Edit Profile"}
            </Button>
            {edit && (
              <Button outline className="ml-3" onClick={restore}>
                Cancel Changes
              </Button>
            )}
          </div>
        </Card>
      </Col>
    </Container>
  );
}
