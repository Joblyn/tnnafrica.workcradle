import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
import {
  getAllDietitians,
  deleteUserAction,
  updateDietitianData,
} from "../../actions/superadmin/dietitian";
import {
  getDietitians,
  deleteUserEndpoint,
  updateCompanyDataEndpoint,
} from "../../apiConstants/apiConstants";
import PageSpinner from "../../components/common/PageSpinner";
import PageTitle from "../../components/common/PageTitle";
import avatar1 from "../../images/avatars/1.jpg";

export default function DietitianDetails() {
  const dietitian = JSON.parse(localStorage.getItem("dietitian"));
  const [control, setControl] = useState();
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [alert, setAlert] = useState(false);
  const [popUp, setPopup] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const allDietitians = useSelector((state) => state.allDietitians);
  const updatedDietitianData = useSelector(
    (state) => state.updateDietitianData
  );
  const deletedUser = useSelector((state) => state.deleteUser);

  useEffect(() => {
    let endpoint = getDietitians + dietitian.companyCode;
    dispatch(getAllDietitians(endpoint));
  }, []);

  useEffect(() => {
    if (allDietitians.data) {
      let dietitianArr = allDietitians.data.filter(
        (item) => item.Dietitian.id === dietitian.id
      );
      setControl(dietitianArr[0].Dietitian);
    }
  }, [allDietitians]);

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

  useEffect(() => {
    if (deleted && deletedUser.isSuccessful) {
      setAlert(true);
      history.push("/admin/dietitians");
    }
  }, [deleted, deletedUser]);

  const handleChange = ({ target }) => {
    setControl({ ...control, [target.name]: target.value });
  };

  const submitChanges = () => {
    let endpoint = updateCompanyDataEndpoint + control.id;
    delete control.createdAt;
    delete control.updatedAt;
    delete control.id;
    delete control.isSuperAdmin;
    dispatch(updateDietitianData(endpoint, control));
    setUpdated(true);
  };

  const deleteUser = () => {
    let endpoint = deleteUserEndpoint + control.id;
    dispatch(deleteUserAction(endpoint));
    setDeleted(true);
  };

  if (!control) {
    return <PageSpinner />;
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Profile"
          subtitle="Dietitian"
          className="text-sm-left"
        />
      </Row>
      <div
        className={`${popUp ? "d-block" : "d-none"}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 10,
          background: "rgba(0,0,0,.24",
        }}
      ></div>
      <div
        className={`${
          popUp ? "d-flex" : "d-none"
        } justify-content-center align-items-center`}
        style={{ width: "100%" }}
      >
        <Card
          className={`p-3 mx-auto`}
          style={{ position: "absolute", zIndex: 1000, width: 400, top: "30%" }}
        >
          <div className="text-center">
            <h5>Delete Dietitian?</h5>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3">
            <Button onClick={() => setPopup(false)}>Cancel</Button>
            <Button theme="danger" onClick={deleteUser}>
              Delete
            </Button>
          </div>
        </Card>
      </div>
      {alert && (
        <Container fluid className="px-0 sticky-top">
          <Alert className={`mb-0 text-center ${deleted && "bg-danger"}`}>
            <i className="fa fa-info mx-2"></i>
            {deleted ? "Deleted Dietitian" : "Edited Dietitian Profile."}
          </Alert>
        </Container>
      )}
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
            {edit && (
              <Button className="ml-3" onClick={() => setEdit(false)}>
                Cancel Changes
              </Button>
            )}
            <Button
              className="ml-3"
              onClick={edit ? submitChanges : () => setEdit(true)}
            >
              {edit ? "Upload Changes" : "Edit Dietitian Profile"}
            </Button>
            <Button
              theme="danger"
              className="ml-3"
              onClick={() => setPopup(true)}
            >
              Delete dietitian
            </Button>
          </div>
        </Card>
      </Col>
    </Container>
  );
}
