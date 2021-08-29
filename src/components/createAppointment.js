import React, { useState } from "react";
import { createAppointmentEndpoint } from "../apiConstants/apiConstants";
import { createAppointment } from "../actions/patient/patient";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  Form,
  FormGroup,
  Row,
  FormInput,
  Col,
  FormTextarea,
  Button
} from "shards-react";
import CustomSelect from "./components-overview/CustomSelect";

export default function CreateAppointment({
  setFormPopup,
  patients,
  user,
  setSubmitted
}) {
  const [control, setControl] = useState({});
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setControl({ ...control, [target.name]: target.value });
  };
  const [selectedPatient, setSelectedPatient] = useState();

  const submit = (e) => {
    e.preventDefault();
    const { date, hour, minute } = control;
    const appointmentDate = `${date}T${hour.length < 2 ? "0" + hour : hour}:${
      minute.length < 2 ? "0" + minute : minute
    }:00.000Z`;
    const payload = {
      ...control,
      appointmentDate,
      createdFor: selectedPatient,
      createdBy: user.id,
      companyCode: user.companyCode,
      isAccepted: false,
      isDeleted: false
    };
    delete payload.date;
    delete payload.hour;
    delete payload.minute;
    setSubmitted(true);
    dispatch(createAppointment(createAppointmentEndpoint, payload));
  };

  return (
    <Card
      className="pb-4 position-absolute"
      style={{ width: "90%", maxWidth: "700px", top: 80 }}
    >
      <CardHeader className="border-bottom">Create Appointment</CardHeader>
      <span
        className="material-icons-outlined text-muted text-sm-center"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer"
        }}
        onClick={() => setFormPopup(false)}
      >
        clear
      </span>
      <Col className="">
        <Form id="createAppointment" onSubmit={submit}>
          <FormGroup className="pt-2 pb-3">
            <label>Patient</label>
            {patients && <CustomSelect
                label="Patient"
                options={patients}
                setSelectedPatient={setSelectedPatient}
             />}
          </FormGroup>
          <Row className="pb-3">
            <Col className="col-md-6 col-12">
              <FormGroup>
                <label className="text-muted">Date</label>
                <FormInput
                  type="date"
                  placeholder="MM/DD/YYYY"
                  required
                  name="date"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col className="col-md-6 col-12">
              <label className="text-muted">Time</label>

              <Row className="m-0">
                <Col className="col-5 m-0 p-0">
                  <FormInput
                    type="number"
                    max="24"
                    min="0"
                    placeholder="Hour(24)"
                    required
                    name="hour"
                    onChange={handleChange}
                  />
                </Col>
                <span className="col-2 m-0 p-0 text-center">:</span>
                <Col className="col-5 m-0 p-0">
                  <FormInput
                    type="number"
                    max="59"
                    min="0"
                    placeholder="Minute"
                    required
                    name="minute"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <FormGroup className="pb-3">
            <label className="text-muted">Duration</label>
            <FormInput
              placeholder="1 Hour"
              name="appointmentDuration"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <Row>
            <Col md="4">
              <FormGroup>
                <label className="text-muted">Platform</label>
                <FormInput
                  placeholder="Zoom"
                  name="appointmentPlatform"
                  required
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md="8">
              <FormGroup>
                <label className="text-muted">Link</label>
                <FormInput
                  placeholder="https://zoom.us/"
                  name="appointmentPlatformLink"
                  required
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="pb-3">
            <label className="text-muted">Notes</label>
            <FormTextarea
              placeholder="Any other information"
              name="appointmentNotes"
              style={{ height: 60 }}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" form="createAppointment">
            Create Appointment
          </Button>
        </Form>
      </Col>
    </Card>
  );
}
