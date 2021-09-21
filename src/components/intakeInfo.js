import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  CardFooter
} from "shards-react";
import { useHistory } from "react-router";

export default function IntakeInfo({
  setFormPopUp,
  intakeForm,
  infos,
  setDocId,
  setDeleteType,
  setDeletePopup,
  setPFormPopup,
  setFormId,
  admin
}) {
  const history = useHistory();


  const viewIntakeForm = () => {
    setFormPopUp(true);
  };

  const handleDelete = (id) => {
    setDeleteType("form");
    setDocId(id);
    setDeletePopup(true);
  };

  const viewForm = (id) => {
    setPFormPopup(true);
    setFormId(id);
  };

  return (
    <Card>
      <CardHeader className="border-bottom d-flex justify-content-between">
        Intake Information
        <div className="" style={{ width: "fit-content" }}>
          {!admin ? (
            <Button
              outline
              onClick={
                intakeForm
                  ? viewIntakeForm
                  : () => history.push("/dietitian/progress_flow_intake_form")
              }
            >
              {intakeForm ? "View intake form" : "Create intake form"}
            </Button>
          ) : intakeForm ? (
            <Button outline onClick={viewIntakeForm}>
              View Intake Form
            </Button>
          ) : (
            <Button outline disabled>
              No Intake form created
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody style={{ maxHeight: "600px", overflowY: "auto" }}>
        {infos && infos.length ? (
          <Row
            style={{
              display: "grid",
              gridGap: "20px",
              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))"
            }}
          >
            {infos.reverse().map((item, id) => (
              <Card key={`info-${id + 1}`} style={{ height: "fit-content" }}>
                <CardHeader className="border-bottom">
                  {Date(item.createdAt).slice(0, 15)}
                </CardHeader>
                <CardBody style={{ maxHeight: 150, overflowY: "auto" }}>
                  {Object.keys(item.information).map((prop, id) => (
                    <div className="d-flex" key={`li-${id + 1}`}>
                      <span
                        style={{ fontWeight: "bold" }}
                        className="mr-1"
                      >{`${prop}:`}</span>
                      <span>{item.information[prop]}</span>
                    </div>
                  ))}
                </CardBody>
                <CardFooter>
                  <div className="d-flex">
                    <Button
                      size="sm"
                      outline
                      onClick={() => viewForm(id)}
                      className="mr-2"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      outline
                      theme="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </Row>
        ) : (
          <span className="text-muted">No progress intake-forms submitted</span>
        )}
      </CardBody>
    </Card>
  );
}
