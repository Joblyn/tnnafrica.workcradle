import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button,
} from "shards-react";

import CheckboxGroup from "./CheckboxGroup";
import RadioInputGroup from "./RadioInputGroup";
import {
  removeFormItem,
  setFieldTitle,
  setRequired,
} from "../../actions/dietician/patient";

export default function FormBuilder({ setModal, setError }) {
  const [formItemsState, setFormItemsState] = useState([]);

  const formItems = useSelector((state) => state.formItems);
  const dispatch = useDispatch();

  useEffect(() => {
    formItems && setFormItemsState(formItems);
  }, [formItems]);

  const removeItem = (id) => {
    dispatch(removeFormItem(id));
  };

  const selectInputType = (item, id) => {
    let Component;
    switch (item.type) {
      case "text":
        Component = FormInput;
        break;
      case "textarea":
        Component = FormTextarea;
        break;
      case "date":
        Component = FormInput;
        break
      case "checkbox":
        Component = CheckboxGroup;
        break;
      case "radio":
        Component = RadioInputGroup;
        break;
      default:
    }
    return <Component options={item.options} disabled style={{background: 'transparent'}} type={item.type} itemId={id} kind="edit" placeholder={item.placeholder ? item.placeholder : ''} />;
  };

  const handleChange = (value, i) => {
    dispatch(setFieldTitle(value, i));
  };

  const onCheckedChange = (target, i) => {
    dispatch(setRequired(target.checked, i));
  };

  const handleClick = () => {
    // for (var i = 0; i < formItemsState.length; i++) {
    //   console.log(Object.values(i));
    //   let results = Object.values(i);
      // if((results === []) || (results.includes(""))) {
      //   setError(true);
      // }
      // else {
        setModal(true);
      // }
    // }
  };

  return (
    <Col
      className="bg-white border-1 mr-3 p-0 border card form-builder"
      style={{ boxShadow: "none", minHeight: "100vh" }}
    >
      <Card style={{ boxShadow: "none" }}>
        <CardHeader className="border-bottom">
          <h5 className="m-0">Progress Intake Form</h5>
        </CardHeader>

        <Form id="progress-intake-form" className="py-3">
          {formItemsState.length
            ? formItemsState.map((item, i) => (
                <FormGroup
                  className={`px-4 pt-3 pb-3 mb-0 custom-form-item position-relative ${
                    i === formItemsState.length - 1 ? "" : "border-bottom"
                  }`}
                  key={`item-${i + 1}`}
                >
                  <span
                    className="material-icons-outlined text-muted text-sm-center"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 20,
                      fontSize: "1rem",
                    }}
                    onClick={() => removeItem(i)}
                  >
                    clear
                  </span>
                  {/* label */}
                  <FormInput
                    style={{
                      fontSize: "1rem",
                      marginBottom: ".5rem",
                    }}
                    placeholder="Field Title"
                    className="d-block label-input p-1"
                    onChange={({ target }) => handleChange(target.value, i)}
                  />
                  {selectInputType(item, i)}
                  <div
                    style={{ width: "fit-content" }}
                    className="ml-auto mt-2 text-muted"
                  >
                    <span>
                      Required{" "}
                      <input
                        type="checkbox"
                        onChange={({ target }) => onCheckedChange(target, i)}
                      />
                    </span>
                  </div>
                </FormGroup>
              ))
            : <span className="text-muted p-4">Create Patient Intake Form</span>}
          {formItemsState.length ? (
            <div className="m-3">
              <Button outline size="sm" onClick={handleClick}>
                Select patient to upload
              </Button>
            </div>
          ) : ''}
        </Form>
      </Card>
    </Col>
  );
}
