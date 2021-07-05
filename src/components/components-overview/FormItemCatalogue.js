import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardHeader, Col, FormGroup } from "shards-react";

import formItems from "../../data/form-items";
import { addFormItem } from "../../actions/dietician/patient";

export default function FormItemCatalogue({ show, setShow }) {
  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addFormItem(item));
  };

  return (
    <Col
      className={`bg-white border-1 p-0 border card form-catalogue ${
        show === false ? "d-none" : show === true ? "d-block" : ""
      }`}
      style={{
        boxShadow: "none",
        maxHeight: "100vh",
        width: "100%",
        maxWidth: "309px",
      }}
    >
      <span
        class="material-icons-outlined position-absolute form-toggle"
        style={{ top: 0, right: 0 }}
        onClick={() => setShow(false)}
      >
        menu_open
      </span>

      <Card className="p-0" style={{ boxShadow: "none" }}>
        <CardHeader className="border-bottom">
          <h5 className="m-0">Question Banks</h5>
        </CardHeader>
      </Card>

      <Card
        style={{ overflowY: "auto", overflowX: "none", boxShadow: "none" }}
        className="p-0"
      >
        {formItems.map((item, i) => {
          return (
            <FormGroup
              className={`${i !== formItems.length - 1 &&
                "border-bottom"} p-3 m-0 cursor-pointer form-item`}
              onClick={() => {
                addItem(item);
              }}
              key={`item-${i + 1}`}
            >
              <label
                className="text-muted d-block mb-2"
                style={{ fontSize: ".9rem" }}
              >
                {item.title}
              </label>
              <item.component
                type={item.type}
                options={item.options}
                disabled
                key={`item-${i + 1}`}
                className="bg-white cursor-pointer"
                kind="non-edit"
                placeholder={item.placeholder ? item.placeholder : ''}
              />
            </FormGroup>
          );
        })}
      </Card>
    </Col>
  );
}
