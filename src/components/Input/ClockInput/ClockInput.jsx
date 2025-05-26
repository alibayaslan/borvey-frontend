import { Field } from "formik";
import style from "./clockinput.module.scss";
import { ClockIcon } from "../../../assets/icon";

const ClockInput = ({ title, placeholder, name, value }) => {
  return (
    <div className={`${style.input}`}>
      <h5>{title}</h5>
      <label className={style.wrapper}>
        <ClockIcon />
        <h6>{value ? value : placeholder}</h6>
        <Field
          as="input"
          type="time"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          className={style.hiddenInput}
        />
      </label>
    </div>
  );
};

export default ClockInput;
