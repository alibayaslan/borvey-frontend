import { Field } from "formik";
import style from "./selectioninput.module.scss";
import { SelectArrow } from "../../../assets/icon";

const SelectionInput = ({ data, name, title, disabled, value }) => {
  return (
    <label className={style.input}>
      <h5>{title}</h5>
      <SelectArrow />
      <Field disabled={disabled} as="select" name={name} value={value}>
        <option value={""} disabled selected>
          {title} Seçiniz
        </option>
        {data.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </Field>
    </label>
  );
};

export default SelectionInput;
