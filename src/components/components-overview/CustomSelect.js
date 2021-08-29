import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

const CustomSelect = ({
  label,
  options,
  selected,
  setSelectedPatient,
  handleChange,
  disabled,
  type
}) => (
  <div>
    <InputGroup className={`${type === "edit" ? "mb-0" : ""}`}>
      <InputGroupAddon type="prepend">
        <InputGroupText>{label}</InputGroupText>
      </InputGroupAddon>
      <FormSelect
        required
        onChange={({ target }) => setSelectedPatient(target.value)}
        disabled={disabled}
        style={{ background: "transparent" }}
        name="patient"
      >
        <option value="" onClick={() => setSelectedPatient("")}>
          Select Patient
        </option>
        {options && typeof options[0] === "object"
          ? options.map((option, id) => {
              return (
                <option
                  key={`option-${id + 1}`}
                  value={option.Patient.id}
                  onClick={() => setSelectedPatient(option.Patient.id)}
                >
                  {option.Patient.name}
                </option>
              );
            })
          : options &&
            options.map((option, id) => (
              <option
                value={option}
                selected={selected === option ? "selected" : false}
                key={`option-${id + 1}`}
              >
                {option}
              </option>
            ))}
      </FormSelect>
    </InputGroup>

    {/* <InputGroup className="mb-3">
      <FormSelect>
        <option>Choose</option>
        <option>...</option>
      </FormSelect>
      <InputGroupAddon type="append">
        <InputGroupText>Options</InputGroupText>
      </InputGroupAddon>
    </InputGroup> */}
  </div>
);

export default CustomSelect;
