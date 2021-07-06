import React from "react";
import { Col, Row } from "shards-react";
import { Link, 
  // useHistory 
} from "react-router-dom";
import { useSelector } from "react-redux";

export default function Interface() {
  // const history = useHistory();
  const authState = useSelector((state) => state.authState);
  console.log(authState);
  return (
    <Col
      className="d-flex justify-content-start align-items-center landing px-5"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <Row
        noGutters
        className="page-header py-4 px-4 bg-white card"
        style={{
          width: " 100%",
          maxWidth: "600px",
        }}
      >
        <h2 className="mb-3" style={{ fontWeight: "600" }}>
          Welcome!
        </h2>
        <h4 className="mb-4 text-left">Continue as:</h4>
        <Row className="d-flex justify-content-center">
        <Link
            to="/admin/login"
            className="m-3"
          >
            <div
              className="home-link d-flex flex-column align-items-center btn"
              style={{
                border: "1px solid  #660066",
                width: "160px",
                height: "200px",
              }}
            >
              <img
                id="dietician-avatar"
                className="d-inline-block align-middle "
                style={{ borderRadius: "50%" }}
                width="120px"
                height="auto"
                src={require("../images/avatars/portrait.jpg")}
                alt="tnnafrica.workcradle"
              />
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "1.2rem",
                  color: "#3d5170",
                }}
                className="my-2 card-header"
              >
                Admin
              </p>
            </div>
          </Link>
          <Link
            to="/dietitian/login"
            className="m-3"
          >
            <div
              className="home-link d-flex flex-column align-items-center btn"
              style={{
                border: "1px solid  #660066",
                width: "160px",
                height: "200px",
              }}
            >
              <img
                id="dietician-avatar"
                className="d-inline-block align-middle "
                style={{ borderRadius: "50%" }}
                width="120px"
                height="auto"
                src={require("../images/avatars/portrait.jpg")}
                alt="tnnafrica.workcradle"
              />
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "1.2rem",
                  color: "#3d5170",
                }}
                className="my-2 card-header"
              >
                Dietitian
              </p>
            </div>
          </Link>
          <Link
            to="/patient/login"
            className="m-3"
          >
            <div
              className="d-flex flex-column align-items-center btn"
              style={{
                border: "1px solid  #660066",
                width: "160px",
                height: "200px",
              }}
            >
              <img
                id="patient-avatar"
                className="d-inline-block align-middle"
                width="120px"
                height="auto"
                style={{ borderRadius: "50%" }}
                src={require("../images/avatars/portrait.jpg")}
                alt="workcradle"
              />
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "1.2rem",
                  color: "#3d5170",
                }}
                className="my-2 card-header"
              >
                Patient
              </p>
            </div>
          </Link>
          {/* </Col> */}
        </Row>
      </Row>
    </Col>
  );
}
