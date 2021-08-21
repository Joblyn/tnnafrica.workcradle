import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import PageTitle from "../../components/common/PageTitle";
import { Container, Row, Col, Card, CardHeader, Button } from "shards-react";
import avatar1 from "../../images/avatars/1.jpg";
import { useDispatch } from "react-redux";
import { getAllPatients } from "../../actions/superadmin/patients";
import { getPatients } from "../../apiConstants/apiConstants";
import PageSpinner from "../../components/common/PageSpinner";

export default function DietitianPatients() {
  const Dietitian = JSON.parse(localStorage.getItem("dietitian"));
  const history = useHistory();
  const dispatch = useDispatch();
  const allPatients = useSelector((state) => state.allPatients);
  const [patients, setPatients] = useState();

  useEffect(() => {
    let endpoint = getPatients + Dietitian.companyCode;
    dispatch(getAllPatients(endpoint));
  }, []);

  useEffect(() => {
    console.log(allPatients);
      allPatients.data && setPatients(allPatients.data.filter(item => item.Patient.assignedDietitian === Dietitian.id));
  }, [allPatients]);

  if(!patients) {
    return <PageSpinner />
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Patients"
          subtitle="Dietitian"
          className="text-sm-left"
        />
      </Row>
      <Row
        style={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          minHeight: "65vh",
        }}
        className="m-0"
      >
        {patients.length
          ? patients.reverse().map((patient, i) => {
              return (
                <Col className="p-0" key={`patient-${i + 1}`}>
                  <Card small className="p-3">
                    <CardHeader className="border-bottom text-center">
                      <div className="mb-3 mx-auto">
                        <img
                          className="rounded-circle"
                          src={avatar1}
                          alt="John Doe"
                          width="110px"
                        />
                      </div>
                      <h4 className="mb-0" style={{ fontSize: "1.3rem" }}>
                        {patient.Patient.name}
                      </h4>
                      <span
                        className="text-muted d-block mb-1"
                        style={{ fontSize: ".9rem" }}
                      >
                        {patient.Patient.email}
                      </span>
                      <span
                        className="text-muted d-block mb-2"
                        style={{ fontSize: ".9rem" }}
                      >
                        {patient.Patient.phone}
                      </span>
                    </CardHeader>
                    <div>
                      <div>
                        <strong
                          className="text-muted d-block mb-1 mt-2"
                          style={{ fontSize: ".955rem" }}
                        >
                          Health Conditions
                        </strong>
                        <p
                          style={{
                            fontSize: ".85rem",
                            lineHeight: "1.2rem",
                            width: "100%",
                            height: "38px",
                            // whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineClamp: "2",
                          }}
                          className="mb-2"
                        >
                          {patient.Patient.healthCondition &&
                            patient.Patient.healthCondition.join(", ").toString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      pill
                      outline
                      size="sm"
                      className="mb-2"
                      style={{ fontSize: ".85rem" }}
                      onClick={() => {
                        localStorage.setItem("patient",JSON.stringify(patient.Patient));
                        history.push("/admin/dietitian/patient_details");
                      }}
                    >
                      View
                    </Button>
                  </Card>
                </Col>
              );
            })
          : <p><em>No patient assigned.</em></p>}
      </Row>
    </Container>
  );
}
