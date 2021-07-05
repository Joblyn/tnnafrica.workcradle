import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "shards-react";
import { Link } from "react-router-dom";

import { allCompanies } from "../apiConstants/apiConstants";
import { getAllCompanies } from "../actions/getAllCompanies";
import PageSpinner from "../components/common/PageSpinner";

export default function Landing() {
  const dispatch = useDispatch();
  const AllCompanies = useSelector((state) => state.allCompanies);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    dispatch(getAllCompanies(allCompanies));
  }, []);

  useEffect(() => {
    if (AllCompanies.isSuccessful && AllCompanies.data) {
      setCompanies(AllCompanies.data);
    }
  }, [AllCompanies]);

  return (
    <Col className="d-flex justify-content-center py-5 landing">
      <Row
        noGutters
        className="page-header py-5 px-4 bg-white card landing-cont"
      >
        <h2 className="mb-3" style={{ fontWeight: "600" }}>
          Welcome!
        </h2>
        <h4 className="mb-4 text-left">Select Company:</h4>
        <Row className="d-flex justify-content-center align-items-center" style={{minHeight: '30vh'}}>
          {companies.length ?
            companies.map((item, i) => (
              <Link to="/interface" key={`item-${i+1}`} onClick={() => localStorage.setItem('companyCode', item.companyCode)}>
                <div
                  className="btn-custom bg-custom m-3 btn card d-flex justify-content-center align-items-center btn btn-outline-primary"
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    width: "200px",
                    height: "200px",
                    border: "1px solid #660066",
                  }}
                >
                  {item.name}
                </div>
              </Link>
            )) : <PageSpinner />}
            {/* <Link to="/register_company">
                <div
                  className="btn-custom bg-custom m-3 btn card d-flex justify-content-center align-items-center btn btn-outline-primary"
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: "1.2rem",
                    width: "200px",
                    height: "200px",
                    border: "1px solid #660066",
                    boxShadow: "none"
                  }}
                >
                  <span style={{fontSize: "2.5rem"}}>+</span> Register Company
                </div>
              </Link> */}
        </Row>
      </Row>
    </Col>
  );
}
