/* eslint-disable no-unused-vars */
import { TextArea, TextInput, SelectionInput } from "../../";
import * as Yup from "yup";
import { CityData } from "../../../utils/CityData";
import style from "./destinationform.module.scss";
import { Formik, Form, useFormikContext } from "formik";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { forwardRef } from "react";

const Destination = forwardRef(({ title, handleChange, value }, ref) => {
  const ContactSchema = Yup.object().shape({
    city: Yup.string().required(`Zorunlu alan.`),
    district: Yup.string().required(`Zorunlu alan.`),
  });

  return (
    <div className={style.destination}>
      <h6>{title}</h6>

      <Formik
        initialValues={{
          city: value && value.city ? value.city : "",
          district: value && value.district ? value.district : "",
          // street: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={(values) => {
          handleChange(values);
        }}
        innerRef={ref} // Ref buraya doğru şekilde atanır
      >
        {({ errors, touched, values, handleSubmit }) => (
          <Formik
            initialValues={{
              city: value && value.city ? value.city : "",
              district: value && value.district ? value.district : "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values) => {
              // createPayment(values);
              handleChange(values);
            }}
            innerRef={ref}
          >
            {({ errors, touched, values, handleSubmit }) => (
              <Form id="payment" onSubmit={handleSubmit}>
                <div className={style.inputWrapper}>
                  <div className={style.input}>
                    <SelectionInput
                      data={CityData.map((i) => {
                        return i.il_adi;
                      })}
                      title={"İl"}
                      name={"city"}
                      value={values.city}
                    />
                    {errors.city && touched.city ? (
                      <span className="error-text">{errors.city}</span>
                    ) : null}
                  </div>
                  <div className={style.input}>
                    <SelectionInput
                      data={
                        values.city
                          ? CityData.filter(
                              (i) => i.il_adi === values.city
                            )[0].ilceler.map((i) => {
                              return i.ilce_adi;
                            })
                          : [""]
                      }
                      title={"İlçe"}
                      name={"district"}
                      disabled={!values.city}
                      value={values.district}
                    />
                    {errors.district && touched.district ? (
                      <span className="error-text">{errors.district}</span>
                    ) : null}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Formik>
    </div>
  );
});

const DestinationForm = ({
  dashboard,
  fromAddressRef,
  toAddressRef,
  handleChange,
  value,
}) => {
  return (
    <div
      className={`${style.wrapper} ${
        dashboard ? style.dashboardWrapper : null
      }`}
    >
      <Destination
        handleChange={(e) =>
          handleChange({
            type: "from",
            item: e,
          })
        }
        ref={fromAddressRef}
        title={"Nereden alınacak?"}
        value={value.from}
      />
      <Destination
        handleChange={(e) =>
          handleChange({
            type: "to",
            item: e,
          })
        }
        ref={toAddressRef}
        title={"Nereye götürülecek?"}
        value={value.to}
      />

    </div>
  );
};

export default DestinationForm;
