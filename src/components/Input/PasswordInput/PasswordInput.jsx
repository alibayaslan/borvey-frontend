import { Field } from "formik";
import style from "./passwordinput.module.scss";
import { useState } from "react";
import { EyeIcon } from "../../../assets/icon";

const PasswordInput = ({ title, placeholder, name, value }) => {
  const [isOn, setOn] = useState(false);
  return (
    <label className={`${style.input}`}>
      <h5>{title}</h5>
      <div className={style.inputWrapper}>
        <Field
          type={isOn ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setOn(!isOn);
          }}
        >
          <EyeIcon isOn={isOn} />
        </button>
      </div>
    </label>
  );
};

export default PasswordInput;
