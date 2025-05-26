import { Field } from "formik";
import style from "./textinput.module.scss";

const TextInput = ({ title, placeholder, name, value, type }) => {
  return (
    <label className={`${style.input}`}>
      <h5>{title}</h5>
      <Field
        type={type ? type : "text"}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

export default TextInput;
