import React from "react";
import { useHistory } from 'react-router-dom';
import { Container, Button } from "shards-react";

const PageNotFound = () => {
  const history = useHistory();

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>404</h2>
          <h3>Page Not Found!</h3>
          <p>It appears the page you are looking for does not exist.</p>
          <Button pill className="btn-custom bg-custom" onClick={() => history.goBack()}>
            &larr; Go Back
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PageNotFound;
