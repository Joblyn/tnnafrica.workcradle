import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
// import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import DietitianSidebar from "../components/layout/DietitianSidebar/DietitianSidebar";

import MainFooter from "../components/layout/MainFooter";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const DietitianDefaultSideBar = ({ children, noNavbar, noFooter }) => {
  const authState = useSelector(state => state.authState);

  if(!authState.isLoggedIn || authState.data.user.role !== 'dietitian') {
    return <Redirect to="/"/>
  }

  if(window.location.hash==="#/dietitian/progress_flow_intake_form"){
    noFooter = true
  }
  return (
    <Container fluid>
      <Row>
        <DietitianSidebar />
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
    </Container>
  );
};

DietitianDefaultSideBar.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DietitianDefaultSideBar.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DietitianDefaultSideBar;
