import { Field } from "formik";
import style from "./dateinput.module.scss";
import { CalendarFormIcon } from "../../../assets/icon";

const DateInput = ({ title, placeholder, name, value, min, max }) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className={`${style.input}`}>
      <h5>{title}</h5>
      <label className={style.wrapper}>
        <CalendarFormIcon />
        <h6>
          {value
            ? `${value.split("-")[2]}-${value.split("-")[1]}-${
                value.split("-")[0]
              }`
            : placeholder}
        </h6>
        <Field
          as="input"
          type="date"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          className={style.hiddenInput}
          min={min === "today" ? today : min ? min.split("T")[0] : null}
        />
      </label>
    </div>
  );
};

export default DateInput;
