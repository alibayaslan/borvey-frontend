/* eslint-disable no-unused-vars */
import { TextArea, TextInput, SelectionInput } from "../../";
import * as Yup from "yup";
import { CityData } from "../../../utils/CityData";
import style from "./descriptionform.module.scss";
import { Formik, Form, useFormikContext } from "formik";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { forwardRef } from "react";

const Description = forwardRef(({ title, handleChange, value }, ref) => {
  const ContactSchema = Yup.object().shape({
    title: Yup.string().required(`Zorunlu alan.`),
    additionalInfo: Yup.string().required(`Zorunlu alan.`),
  });

  return (
    <div className={style.destination}>
      <h6>{title}</h6>
      <Formik
        initialValues={{
          additionalInfo: value.additionalInfo,
          title: value.title,
        }}
        validationSchema={ContactSchema}
        onSubmit={(values) => {
          handleChange(values);
        }}
        innerRef={ref}
      >
        {({ errors, touched, values, handleSubmit }) => (
          <Form id="payment" onSubmit={handleSubmit}>
            <div className={style.inputWrapper}>
              <div className={style.input}>
                <TextInput
                  name={"title"}
                  title={"İlan Başlığı"}
                  placeholder={"Başlık girin"}
                  value={values.title}
                />
                {errors.title && touched.title ? (
                  <span>{errors.title}</span>
                ) : null}
              </div>
              <div className={style.input}>
                <TextArea
                  name={"additionalInfo"}
                  title={"Açıklama"}
                  placeholder={"Metin girin"}
                  value={values.additionalInfo}
                />
                {errors.additionalInfo && touched.additionalInfo ? (
                  <span>{errors.additionalInfo}</span>
                ) : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
});
const DescriptionForm = forwardRef(({ handleChange, value }, ref) => {
  return (
    <div className={style.wrapper}>
      <Description
        handleChange={(e) => handleChange(e)}
        ref={ref}
        title={""}
        value={value}
      />
    </div>
  );
});

export default DescriptionForm;
