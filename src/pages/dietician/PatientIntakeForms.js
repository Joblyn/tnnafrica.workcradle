import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { Container, Row, Card, CardHeader } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { getItakeFormsEndpoint } from '../../apiConstants/apiConstants';
import { getIntakeForms } from '../../actions/dietician/patient';
import PageSpinner from "../../components/common/PageSpinner";

export default function PatientIntakeForms() {
  const dietitian = JSON.parse(localStorage.getItem('loggedInUser'));
  const dispatch = useDispatch();
  const intakeForms = useSelector(state => state.intakeForms);
  const [items, setItems] = useState();

  useEffect(() => {
    dispatch(getIntakeForms(getItakeFormsEndpoint))
  }, []);

  useEffect(() => {
    intakeForms.isSuccessful && setItems(intakeForms.data.results.filter(item => item.createdBy === dietitian.id));  
  }, [intakeForms]);  

  if(!items) {
    return <PageSpinner />
  }

  return (
    <Container>
      <Row noGutters className="page-header py-4 d-flex align-items-center">
        <PageTitle
          sm="4"
          title="Intake Forms"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      {items.length ? 
      <Row>
          {items.reverse().map(item => <Card>
            <CardHeader></CardHeader>
          </Card>)}
      </Row> : <p className="text-muted"><em>No intake forms created for patient</em></p>

      }
    </Container>
  );
}
