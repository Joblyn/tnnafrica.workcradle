import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import PatientSidebar from "../components/layout/PatientSidebar/PatientSidebar";

import MainFooter from "../components/layout/MainFooter";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PatientDefaultSideBar = ({ children, noNavbar, noFooter }) => {
  const authState = useSelector(state => state.authState);

  if(!authState.isLoggedIn || authState.data.user.role !== 'dietitian') {
    return <Redirect to="/"/>
  }

  return <Container fluid>
    <Row>
      <PatientSidebar />
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>;
};

PatientDefaultSideBar.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

PatientDefaultSideBar.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default PatientDefaultSideBar;
