import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import avatar1 from "../../images/avatars/1.jpg";
import { Container, Row, Col, Card, CardHeader, Button } from "shards-react";

import { getAllDietitians } from "../../actions/superadmin/dietitian";
import { getDietitians } from "../../apiConstants/apiConstants";
import PageTitle from "../../components/common/PageTitle";
import PageSpinner from "../../components/common/PageSpinner";

export default function Dietitians(params) {
  const [dietitians, setDietitians] = useState();
  const allDietitians = useSelector((state) => state.allDietitians);
  const dispatch = useDispatch();
  const history = useHistory();
  let companyCode = JSON.parse(localStorage.getItem("loggedInUser")).companyCode;

  useEffect(() => {
    let endpoint = getDietitians + companyCode;
    dispatch(getAllDietitians(endpoint));
  }, []);

  useEffect(() => {
    
    allDietitians.data && setDietitians(allDietitians.data);
  }, [allDietitians]);

  if (!dietitians) {
    return <PageSpinner />;
  }

  return (
    <Container>
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Dietitians"
          subtitle="Dashboard"
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
        className="m-0 mb-5"
      >
        {dietitians && dietitians.length ? (
          dietitians.reverse().map((dietitian, i) => {
            return (
              <Col className="p-0" key={`dietitian-${i + 1}`}>
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
                      {dietitian.Dietitian.name}
                    </h4>
                    <span
                      className="text-muted d-block mb-1"
                      style={{ fontSize: ".9rem" }}
                    >
                      {dietitian.Dietitian.email}
                    </span>
                    <span
                      className="text-muted d-block mb-2"
                      style={{ fontSize: ".9rem" }}
                    >
                      {dietitian.Dietitian.phone}
                    </span>
                  </CardHeader>

                  <div className="d-flex flex-row justify-content-between px-1">
                    {dietitian.Patient ? (
                      <Button
                        pill
                        outline
                        size="sm"
                        className="mb-2 mt-2"
                        style={{ fontSize: ".85rem" }}
                        onClick={() => {
                          localStorage.setItem(
                            "dietitian",
                            JSON.stringify(dietitian.Dietitian)
                          );
                          history.push("/admin/dietitian/patients");
                        }}
                      >
                        View Patients
                      </Button>
                    ) : (
                      <Button
                        pill
                        outline
                        size="sm"
                        className="mb-2 mt-2"
                        style={{ fontSize: ".85rem" }}
                        disabled={true}
                      >
                        No patients assigned
                      </Button>
                    )}
                    <Button
                      pill
                      outline
                      size="sm"
                      className="mb-2 mt-2"
                      style={{ fontSize: ".85rem" }}
                      onClick={() => {
                          localStorage.setItem(
                            "dietitian",
                            JSON.stringify(dietitian.Dietitian)
                          );
                          history.push("/admin/dietitian/details");
                        }}
                    >
                      View Profile
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })
        ) : (
          <h5 className="text-muted">No dietitians registered.</h5>
        )}
      </Row>
    </Container>
  );
}
