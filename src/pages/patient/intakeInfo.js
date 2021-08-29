import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  CardBody,
  Col,
  Card,
  CardHeader,
  Button,
  CardFooter,
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { getIntakeInfosEndpoint, deleteProgressFormEndpoint } from "../../apiConstants/apiConstants";
import { getIntakeInfos } from "../../actions/patient/patient";
import PageSpinner from "../../components/common/PageSpinner";
import { deleteDocument } from "../../actions/superadmin/patients";

export default function IntakeInfo() {
  const patient = JSON.parse(localStorage.getItem("loggedInUser"));
  const dispatch = useDispatch();
  const intakeInfos = useSelector((state) => state.intakeInfos);
  const [infos, setInfos] = useState();
  const [popUp, setPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [formId, setFormId] = useState();

  useEffect(() => {
    dispatch(getIntakeInfos(getIntakeInfosEndpoint));
  }, []);

  useEffect(() => {
    intakeInfos.data && console.log(intakeInfos.data);
    intakeInfos.data &&
      setInfos(
        intakeInfos.data.results.filter(
          (item) => item.createdFor === patient.id
        )
      );
  }, [intakeInfos]);

  const viewForm = (id) => {
    setFormId(id);
    setPopUp(true);
  };

  const deleteForm = (id) => {
    let endpoint = deleteProgressFormEndpoint + formId;
    dispatch(deleteDocument(endpoint));
    setDeletePopUp(false);
    window.location.reload();
  }

  if (!intakeInfos.isSuccessful) {
    return <PageSpinner />;
  }

  return (
    <Container>
      {(popUp || deletePopUp) && (
        <div
          className={`d-flex justify-content-center align-items-center position-fixed`}
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            background: "rgba(0,0,0,.14)",
          }}
        >
          {popUp && <Card
            className="mx-auto"
            style={{
              top: "30%",
              position: "absolute",
              maxHeight: "600px",
              overFlowY: "auto",
              maxWidth: "500px",
              left: "30%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CardHeader className="border-bottom">{`Progress form submitted on ${Date(
              infos[formId].createdAt
            ).slice(0, 15)}`}</CardHeader>
            <span
              className="material-icons-outlined text-muted text-sm-center"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                cursor: "pointer",
              }}
              onClick={() => setPopUp(false)}
            >
              clear
            </span>
            <CardBody className="px-0">
              <ul>
                {Object.keys(infos[formId].information).map((prop, id) => (
                  <li className="d-flex m-2" key={`li-${id + 1}`}>
                    <span
                      style={{ fontWeight: "bold" }}
                      className="mr-1"
                    >{`${prop}:`}</span>
                    <span>{infos[formId].information[prop]}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card> }

          {deletePopUp && <Card
          className={`p-3 mx-auto`}
          style={{ position: "absolute", zIndex: 1000, width: 400, top: "30%" }}
        >
          <div className="text-center">
            <h5>Delete progress info?</h5>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3">
            <Button outline onClick={() => setDeletePopUp(false)}>Cancel</Button>
            <Button outline theme="danger" onClick={deleteForm}>
              Delete
            </Button>
          </div>
        </Card>}
        </div>
      )}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Progress Forms"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      <Col style={{ minHeight: "70vh" }}>
        {infos && infos.length ? (
          <Row
            style={{
              display: "grid",
              gridGap: "20px",
              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
              minHeight: "65vh",
            }}
          >
            {infos.reverse().map((item, id) => (
              <Card
                key={`info-${id + 1}`}
                style={{ height: "fit-content", cursor: "pointer" }}
              >
                <CardHeader className="border-bottom">
                  {Date(item.createdAt).slice(0, 15)}
                </CardHeader>
                <CardBody style={{ height: 200, overflow: "auto" }}>
                  {Object.keys(item.information).map((prop, id) => (
                    <div className="d-flex" key={`li-${id + 1}`}>
                      <span
                        style={{ fontWeight: "bold" }}
                        className="mr-1"
                      >{`${prop}:`}</span>
                      <span>{item.information[prop]}</span>
                    </div>
                  ))}
                </CardBody>
                <CardFooter>
                  <div className="d-flex">
                    <Button size="sm" outline onClick={() => viewForm(id)} className="mr-2">
                      View
                    </Button>
                    <Button
                      size="sm"
                      outline
                      theme="danger"
                      onClick={() => setDeletePopUp(true)}
                    >
                      Delete
                    </Button>
                  </div>

                </CardFooter>
              </Card>
            ))}
          </Row>
        ) : (
          <p className="text-muted">
            <em>No progress form uploaded</em>
          </p>
        )}
      </Col>
    </Container>
  );
}
