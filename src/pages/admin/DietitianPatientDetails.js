import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
} from "shards-react";
import PageSpinner from "../../components/common/PageSpinner";
import PageTitle from "../../components/common/PageTitle";
import avatar1 from "../../images/avatars/1.jpg";

export default function DietitianPatientDetails() {
  const patient = JSON.parse(localStorage.getItem("patient"));

  if(!patient) {
    return <PageSpinner />
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Patient Profile"
          subtitle="Dietitian"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Col
        lg="12"
        className="d-flex flex-column justify-content-center align-items-center mb-5"
      >
        <Card style={{ width: "100%", maxWidth: "500px" }}>
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={avatar1}
                alt={patient.name}
                width="110"
              />
            </div>
            <h4 className="mb-0">{patient.name}</h4>
            <span className="text-muted d-block mb-2">{patient.email}</span>
            <span className="text-muted d-block mb-2">{patient.phone}</span>
          </CardHeader>
          <Col className="border-bottom">
            <h5 className="mb-1 mt-1">Bio Data</h5>
            <Col className="d-flex flex-row">
              <h6 className="mr-2">Age:</h6> {"  "}
              <span>{patient.age}</span>
            </Col>
            <Col className="d-flex flex-row">
              <h6 className="mr-2">Weight:</h6>
              {"  "}
              <span>{patient.weight}kg</span>
            </Col>
          </Col>
          <Col className="border-bottom">
            <h5 className="mb-1 mt-1">Health</h5>
            <Col className="d-flex flex-row">
              <h6 className="mr-2">Condition:</h6> {"  "}
              <span>{patient.healthCondition.join(", ").toString()}</span>
            </Col>
            <Col className="d-flex flex-row">
              <h6 className="mr-2">Goal:</h6>
              {"  "}
              <span>{patient.healthGoal}</span>
            </Col>
            <Col className="d-flex flex-row">
              <h6 className="mr-2">Food Prefence:</h6>
              {"  "}
              <span>{patient.foodPreference.join(", ").toString()}</span>
            </Col>
          </Col>
          <Col className="d-flex flex-row mb-3 mt-2">
            <h6 className="mr-2">Subscription:</h6> {"  "}
            <span>{patient.subscriptionPackage}</span>
          </Col>
        </Card>
      </Col>
    </Container>
  );
}
