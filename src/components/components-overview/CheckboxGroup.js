import React from "react";
import PropTypes from "prop-types";
import { FormCheckbox, FormInput } from "shards-react";
import { useDispatch } from "react-redux";
import { addItemOption, removeItemOption, setInputValue } from "../../actions/dietician/patient";

export default function CheckboxGroup({
  title,
  options = [],
  kind,
  itemId,
  disabled,
  ...restProps
}) {
  const dispatch = useDispatch();
  const removeItem = (itemId, i) => {
    dispatch(removeItemOption(itemId, i));
  };

  const addItem = (itemId) => {
    dispatch(addItemOption(itemId));
  }

  const handleChange = (value, itemId, id) => {
    dispatch(setInputValue(value, itemId, id));
  };

  return (
    <fieldset {...restProps}>
      {options.length &&
        options.map((item, i) => (
          <FormCheckbox
            key={`option-${i + 1}`}
            style={{ width: "fit-content" }}
            disabled
          >
            {kind !== "edit" ? (
              item
            ) : (
              <div className="custom-form-item">
                <FormInput
                  className="label-input"
                  style={{
                    marginTop: "-1.7rem",
                    width: "10rem",
                    padding: ".4rem .75rem",
                    fontSize: ".9125rem",
                  }}
                  onChange={({ target }) => {
                    handleChange(target.value, itemId, i);
                  }}
                />
                <span
                  className="material-icons-outlined text-muted text-sm-center md-show"
                  style={{ position: "absolute", top: 0, right: 0, fontSize: '1rem' }}
                  onClick={() => removeItem(itemId, i)}
                >
                  clear
                </span>
              </div>
            )}
          </FormCheckbox>
        ))}
      {kind === "edit" && (
        <div className="custom-form-item w-25">
          <span className="material-icons-outlined d-sm-block d-md-block" style={{fontSize:'1rem'}} onClick={() => addItem(itemId)}>add</span>
        </div>
      )}
    </fieldset>
  );
}

CheckboxGroup.propTypes = {
  title: PropTypes.string,
};
