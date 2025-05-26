import { Field } from "formik";
import style from "./textarea.module.scss";

const TextArea = ({ title, placeholder, name, value, type }) => {
  return (
    <label className={`${style.input}`}>
      <h5>{title}</h5>
      <Field
        as={"textarea"}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

export default TextArea;
