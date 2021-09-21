import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
} from "shards-react";

export default function PatientIntakeForm({ intakeForm, setFormPopUp }) {
  const [control, setControl] = useState();
  useEffect(() => {
    intakeForm && setControl(intakeForm.form);
  }, [intakeForm]);


  const selectInputType = (item) => {
    switch (item.type) {
      case "text":
        return <FormInput disabled />;
      case "date":
        return <FormInput disabled type="date" />;
      case "textarea":
        return <FormTextarea disabled />;
      case "checkbox":
        return (
          <fieldset>
            {item.options &&
              item.options.map((opt, i) => (
                <div key={`${item.field}opt-${i + 1}`}>
                  <input
                    value={opt}
                    type="checkbox"
                    name={item.field}
                    disabled
                  />
                  {opt}
                </div>
              ))}
          </fieldset>
        );
      case "radio":
        return (
          <fieldset>
            {item.options &&
              item.options.map((opt, i) => (
                <div key={`${item.field}opt-${i + 1}`}>
                  <input value={opt} type="radio" name={item.field} disabled />
                  {opt}
                </div>
              ))}
          </fieldset>
        );
      default:
    }
  };

  return (
    <Card
      className="position-absolute"
      style={{
        zIndex: 1000,
        width: "100%",
        maxWidth: "800px",
        height: "fit-content",
        top: '30%',
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CardHeader className="border-bottom">Intake Form</CardHeader>
      <span
        className="material-icons-outlined text-muted text-sm-center"
        style={{
          position: "absolute",
          top: 20,
          right:20,
          cursor: 'pointer'
        }}
        onClick={() => setFormPopUp(false)}
      >
        clear
      </span>
      <CardBody>
        {control ? (
          <Form>
            {control.map((item) => (
              <FormGroup>
                <label>{item.field}</label>
                {selectInputType(item)}
              </FormGroup>
            ))}
          </Form>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
}
