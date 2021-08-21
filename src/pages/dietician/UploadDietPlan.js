import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "shards-react";
import nProgress from "nprogress";
import PageTitle from "../../components/common/PageTitle";
import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
import CustomSelect from "../../components/components-overview/CustomSelect";
import { getAllPatients } from "../../actions/superadmin/patients";
import { getPatients, createDocument } from "../../apiConstants/apiConstants";
import PageSpinner from "../../components/common/PageSpinner";

export default function UploadDietPlan() {
  let dietitian = JSON.parse(localStorage.getItem("loggedInUser"));
  const allPatients = useSelector((state) => state.allPatients);
  const [patients, setPatients] = useState([]);
  const dispatch = useDispatch();
  const [createdFor, setCreatedFor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(dietitian);
    let endpoint = getPatients + dietitian.companyCode;
    dispatch(getAllPatients(endpoint));
  }, []);

  useEffect(() => {
    setPatients(
      allPatients.data &&
        allPatients.data.filter(
          (item) => item.Patient.assignedDietitian === dietitian.id
        )
    );
    console.log(allPatients);
  }, [allPatients]);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const inpFile = document.getElementById("file");
    console.log(inpFile.files[0]);
    console.log(createdFor);
    
      formData.append("docName", "Diet plan");
      formData.append("fileUpload", inpFile.files[0]);
      formData.append("createdBy", createdFor);
      formData.append("createdFor", dietitian.id);
      formData.append("companyCode", `${dietitian.companyCode}`);
      formData.append("docType", "patientDietPlan");

      let localUrl = "https://workcradle.herokuapp.com/api/";
      let prodUrl = "https://workcradle.herokuapp.com/api/";
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
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    }
  }, [success]);

  if (!patients) {
    return <PageSpinner />;
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {success && (
        <Container fluid className="px-0 sticky-top">
          <Alert className="mb-0 text-center">
            <i className="fa fa-info mx-2"></i>Uploaded Diet Plan to patient
          </Alert>
        </Container>
      )}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Upload Patient Diet Plan"
          subtitle="Dashboard"
          className="text-sm-left"
        />
      </Row>
      <Col className="p-3">
        <Card style={{ maxWidth: "506px" }} className="mx-auto">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Upload Client Diet Plan</h6>
          </CardHeader>
          <Form className="p-4" id="Upload_Diet_Plan" onSubmit={submitForm}>
            <FormGroup className="mb-3">
              <label>Document</label>
              <CustomFileUpload label="Document" id="file" required />
            </FormGroup>

            <FormGroup className="mb-3">
              <label>Select Patient</label>
              {patients && (
                <CustomSelect
                  label="Patient"
                  options={patients}
                  setSelectedPatient={setCreatedFor}
                />
              )}
            </FormGroup>

            <Button
              form="Upload_Diet_Plan"
              className="mt-1"
              disabled={isLoading}
            >
              Upload Diet Plan
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  );
}
