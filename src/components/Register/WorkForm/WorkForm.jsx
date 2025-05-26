/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, TransportTypeIcon } from "../../../assets/icon";
import style from "./workform.module.scss";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../../Input/TextInput/TextInput";
import SelectionInput from "../../Input/SelectionInput/SelectionInput";
import { CityData } from "../../../utils/CityData";
import { TypeText } from "../../../utils/TypeText";

const SelectionCard = ({ type, title, click, transportType }) => {
  return (
    <div
      className={`${style.selection} ${
        transportType === type ? style.selected : ""
      }`}
      onClick={() => click(type)}
    >
      <div className={style.info}>
        <div className={style.circle} />
        <h5>{title}</h5>
      </div>
      <TransportTypeIcon type={type} />
    </div>
  );
};

const WorkCard = ({ work, onDelete }) => {
  return (
    <div className={style.workCard}>
      <div className={style.titleWrapper}>
        <div className={style.title}>
          <TransportTypeIcon type={work.transportType} />
          <h5>{TypeText(work.transportType)}</h5>
        </div>
        <div className={style.buttonWrapper}>
          <button onClick={onDelete}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className={style.infoWrapper}>
        <div className={style.infoCard}>
          <h6>İl</h6>
          <p>{work.city}</p>
        </div>
        <div className={style.infoCard}>
          <h6>İlçe</h6>
          <p>{work.district}</p>
        </div>
        <div className={style.singleInfo}>
          <p>{work.address}</p>
        </div>
      </div>
    </div>
  );
};

const WorkForm = ({
  data,
  setWorkData,
  register,
  changeData,
  workData,
  isEdit,
  changeType,
}) => {
  const [workList, setWorkList] = useState(data || []);
  const [transportType, setTransportType] = useState(
    isEdit ? workData.type : ""
  );

  const ContactSchema = Yup.object().shape({
    city: Yup.string().required("Zorunlu alan."),
    district: Yup.string().required("Zorunlu alan."),
    street: Yup.string().required("Zorunlu alan."),
    address: Yup.string().required("Zorunlu alan."),
  });

  const handleTypeChange = (type) => {
    setTransportType(type);
    if (changeType) {
      changeType(type);
    }
  };

  const handleAddWork = (values, { resetForm }) => {
    const newWork = { ...values, transportType };
    const updatedWorkList = [...workList, newWork];
    setWorkList(updatedWorkList);
    setWorkData(updatedWorkList); // Register bileşenindeki work dizisini günceller
    resetForm();
    setTransportType("");
  };

  const handleDeleteWork = (index) => {
    const updatedWorkList = workList.filter((_, i) => i !== index);
    setWorkList(updatedWorkList);
    setWorkData(updatedWorkList); // Register bileşenindeki work dizisini günceller
  };

  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.selectionWrapper}>
          <SelectionCard
            title="Evden Eve Nakliye"
            type="home"
            transportType={transportType}
            click={handleTypeChange}
          />
          <SelectionCard
            title="Tekli Ürün Nakliyat"
            type="single"
            transportType={transportType}
            click={handleTypeChange}
          />
          <SelectionCard
            title="Ofis Nakliyat"
            type="office"
            transportType={transportType}
            click={handleTypeChange}
          />
          <SelectionCard
            title="Kısa Mesafe Nakliyat"
            type="short"
            transportType={transportType}
            click={handleTypeChange}
          />
        </div>
        <div className={style.right}>
          <Formik
            initialValues={{
              city: isEdit ? workData.city : "",
              district: isEdit ? workData.district : "",
              street: isEdit ? workData.street : "",
              address: isEdit ? workData.address : "",
            }}
            validationSchema={ContactSchema}
            onSubmit={register ? handleAddWork : changeData}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                <div className={style.inputWrapper}>
                  <SelectionInput
                    data={CityData.map((i) => i.il_adi)}
                    title="İl"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  {errors.city && touched.city && (
                    <span className="error-text">{errors.city}</span>
                  )}
                  <SelectionInput
                    data={
                      values.city
                        ? CityData.find(
                            (i) => i.il_adi === values.city
                          ).ilceler.map((i) => i.ilce_adi)
                        : []
                    }
                    title="İlçe"
                    name="district"
                    disabled={!values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.district}
                  />
                  {errors.district && touched.district && (
                    <span className="error-text">{errors.district}</span>
                  )}
                  <TextInput
                    name="street"
                    title="Mahalle"
                    placeholder="Mahalle girin"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.street && touched.street && (
                    <span className="error-text">{errors.street}</span>
                  )}
                  <TextInput
                    name="address"
                    title="Adres"
                    placeholder="Adres girin"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>
                <button type="submit">İş Ekle</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={style.bottom}>
        {workList.map((work, index) => (
          <WorkCard
            key={index}
            work={work}
            onDelete={() => handleDeleteWork(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkForm;
