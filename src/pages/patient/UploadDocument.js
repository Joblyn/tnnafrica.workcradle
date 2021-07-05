import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  Card,
  CardHeader,
  Alert,
  FormInput,
} from "shards-react";
import nProgress from "nprogress";
import PageTitle from "../../components/common/PageTitle";
import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
// import CustomSelect from "../../components/components-overview/CustomSelect";
// import { getAllPatients } from "../../actions/superadmin/patients";
import { 
  // getPatients, 
  createDocument } from "../../apiConstants/apiConstants";
// import PageSpinner from "../../components/common/PageSpinner";

export default function UploadDocument() {
  let patient = JSON.parse(localStorage.getItem("loggedInUser"));
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [docName, setDocName] = useState();
  const [popUp, setPopUp] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const inpFile = document.getElementById("file");
    console.log(inpFile.files[0]);

    if(!patient.assignedDietitian) {
      setPopUp(true);
    } else {
      formData.append("docName", docName);
      formData.append("fileUpload", inpFile.files[0]);
      formData.append("createdBy", patient.id);
      formData.append("createdFor", patient.assignedDietitian);
      formData.append("companyCode", `${patient.companyCode}`);
      formData.append("docType", "document");
  
      let localUrl = "https://dev-workcradle.herokuapp.com/api/";
      let prodUrl = "https://dev-workcradle.herokuapp.com/api/";
      let baseUrl = process.env.NODE_ENV === "production" ? prodUrl : localUrl;
      const endpoint = baseUrl + createDocument;
      const token = JSON.parse(localStorage.getItem("tokens")).access.token;
      const bearerToken = "Bearer " + token;
      nProgress.start();
      console.log(endpoint);
      console.log(formData);
      fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: bearerToken,
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          nProgress.done();
          nProgress.remove();
          console.log(data);
          setSuccess(true);
          setIsLoading(false);
        })
        .catch((err) => {
          nProgress.done();
          nProgress.remove();
          console.log(err);
          alert("An error occured, please check internet connection try again");
          window.location.reload();
        });
    }

  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    }
  }, [success]);

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {success && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Uploaded document to dietitian
          </Alert>
        </Container>
      )}
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
            <h5>Not yet assigned to a dietitian, kindly contact management.</h5>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3">
            <Button outline onClick={() => setPopUp(false)}>
              Ok
            </Button>
          </div>
        </Card>
      </div>
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Upload Document to Dietitian"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      <Col className="p-3">
        <Card style={{ maxWidth: "506px" }} className="mx-auto">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Upload Document</h6>
          </CardHeader>
          <Form className="p-4" id="Upload_Diet_Plan" onSubmit={submitForm}>
            <FormGroup className="mb-3">
              <label>Document Name</label>
              <FormInput
                required
                onChange={({ target }) => setDocName(target.value)}
                name="docName"
                placeholder="Document Name"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <label>Document</label>
              <CustomFileUpload label="Document" id="file" required />
            </FormGroup>
            <Button
              form="Upload_Diet_Plan"
              className="mt-1"
              disabled={isLoading}
            >
              Upload
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  );
}
