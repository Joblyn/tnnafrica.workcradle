import { FormInput, FormTextarea } from "shards-react";
import CheckboxGroup from "../components/components-overview/CheckboxGroup";
import RadioInputGroup from "../components/components-overview/RadioInputGroup";

export default [
  {
    type: "text",
    title: "Open Answer(Short)",
    component: FormInput,
  },
  {
    type: "textarea",
    title: "Open Answer(Long)",
    component: FormTextarea,
  },
  {
    type: "date",
    title: "Date",
    placeholder: 'DD/MM/YY',
    component: FormInput,
  },
  {
    type: "checkbox",
    title: "Multiple Choice(Checkbox)",
    options: ["a", "b", "c"],
    component: CheckboxGroup,
  },
  {
    type: "radio",
    title: "Multiple Choice",
    options: ["a", "b", "c"],
    component: RadioInputGroup,
  },
];
