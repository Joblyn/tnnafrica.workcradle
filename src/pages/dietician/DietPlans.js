import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormInput,
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import {
  deleteDocumentEndpoint,
  getDocumentsByCompanyCodeEndpoint,
} from "../../apiConstants/apiConstants";
import { getDocuments } from "../../actions/dietician/dietitian";
import { deleteDocument } from "../../actions/superadmin/patients";
import PageSpinner from "../../components/common/PageSpinner";

export default function DietitianDietPlans() {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);
  let dietitian = JSON.parse(localStorage.getItem("loggedInUser"));
  const deleteDocumentState = useSelector((state) => state.deleteDocument);
  const [documentsState, setDocumentsState] = useState();
  const [popUp, setPopUp] = useState(false);
  const [documentId, setDocumentId] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    let endpoint = getDocumentsByCompanyCodeEndpoint + dietitian.companyCode;
    dispatch(getDocuments(endpoint));
  }, []);

  useEffect(() => {
    console.log(documents);
    documents.data &&
      setDocumentsState(
        documents.data.filter(
          (item) =>
            item.Dietitian.id === dietitian.id &&
            item.Document.docType === "patientDietPlan"
        )
      );
  }, [documents]);
  console.log(documentsState);

  useEffect(() => {
    documentsState && setSearchItems(documentsState);
  }, [documentsState]);

  useEffect(() => {
    if (submitted && deleteDocumentState.isSuccessful) {
      setTimeout(() => {
        setSubmitted(false);
        window.location.reload();
      }, 2000);
    }
  }, [submitted, deleteDocumentState]);

  const deleteDietPlan = () => {
    let endpoint = deleteDocumentEndpoint + documentId;
    dispatch(deleteDocument(endpoint));
    setPopUp(false);
    setSubmitted(true);
    window.location.reload();
  };

  const search = ({ target }) => {
    if (target.value === "") {
      setSearchItems(documentsState);
    } else {
      setSearchItems(
        documentsState.filter(
          (item) =>
            item.Document.docName.includes(target.value) ||
            item.Patient.name.includes(target.value)
        )
      );
    }
  };

  if (!documentsState) {
    return <PageSpinner />;
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div
        className={`${
          popUp ? "d-flex" : "d-none"
        } justify-content-center align-items-center`}
        style={{ width: "100%" }}
      >
        <Card
          className={`p-3 mx-auto`}
          style={{ position: "absolute", zIndex: 1000, width: 400, top: "30%" }}
        >
          <div className="text-center">
            <h5>Delete Document?</h5>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3">
            <Button outline onClick={() => setPopUp(false)}>
              Cancel
            </Button>
            <Button outline theme="danger" onClick={deleteDietPlan}>
              Delete
            </Button>
          </div>
        </Card>
      </div>
      <Row noGutters className="page-header py-4 d-flex align-items-center">
        <PageTitle
          sm="4"
          title="Library"
          subtitle="Dashboard"
          className="text-sm-left"
        />
        <div className="ml-auto">
          <Button theme="primary" size="sm" href="#/dietitian/upload_diet_plan">
            Upload Diet Plan
          </Button>
        </div>
      </Row>
      <Col>
        {documentsState.length ? (
          <Card>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Diet Plans</h6>
            </CardHeader>
            <div
              style={{ width: "fit-content" }}
              className="d-flex flex-row align-items-center ml-auto p-2"
            >
              <label className="text-muted mr-2 mb-0">Search:</label>
              <FormInput onChange={search} style={{ width: 100, height: 30 }} />
            </div>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Patient
                    </th>
                    <th scope="col" className="border-0">
                      Date Uploaded
                    </th>
                    <th scope="col" className="border-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchItems.reverse().map((document, id) => {
                    let d = Date(document.Document.createdAt);
                    return (
                      <tr>
                        <td>{id + 1}</td>
                        <td>{document.Patient.name}</td>
                        <td>
                          {d.toString().slice(0, 15)}
                        </td>
                        <td className="d-flex flex-row">
                          <Button
                            outline
                            size="sm"
                            theme="success"
                            className="mr-lg-3"
                            href={document.Document.docContentUrl}
                            target="_blank"
                          >
                            View
                          </Button>
                          <Button
                            outline
                            size="sm"
                            theme="danger"
                            onClick={() => {
                              setDocumentId(document.Document.id);
                              setPopUp(true);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        ) : (
          <p>
            <em>No diet plan uploaded to patient.</em>
          </p>
        )}
      </Col>
    </Container>
  );
}
