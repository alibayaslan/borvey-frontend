/* eslint-disable no-unused-vars */
import style from "./offerpopup.module.scss";
import TextInput from "../Input/TextInput/TextInput";
import TextArea from "../Input/TextArea/TextArea";
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";
import { CloseIcon, OfferTitleIcon } from "../../assets/icon";
import SelectionInput from "../Input/SelectionInput/SelectionInput";
import ClockInput from "../Input/ClockInput/ClockInput";
import DateInput from "../Input/DateInput/DateInput";
import { useState, useEffect } from "react";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useSelector } from "react-redux";

const OfferPopup = ({ closeClick, data, currentId, refreshClick }) => {
  const [isLoad, setLoad] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const ContactSchema = Yup.object().shape({
    post: Yup.string().required(`Zorunlu alan.`),
    fromTime: Yup.string().required(`Zorunlu alan.`),
    fromDate: Yup.string().required(`Zorunlu alan.`),
    price: Yup.string().required(`Zorunlu alan.`),
  });

  const createOffer = (value) => {
    AxiosRequest("post", ApiRoutes.offer.createOffer, {
      postID: currentId,
      serviceUserID: userInfo._id,
      personalUserID: data.userId._id,
      type: data.type,
      time: {
        from: value.fromTime,
        to: value.toTime,
      },
      date: {
        from: value.fromDate,
        to: value.toDate,
      },
      price: value.price,
    })
      .then(async (res) => {
        setLoad(false);
        refreshClick();
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  return (
    <div className={style.popup}>
      <div className={style.card}>
        <div className={style.title}>
          <h5>
            <span>
              <OfferTitleIcon />
            </span>
            Teklif ver
          </h5>
          <button onClick={closeClick} className={style.close}>
            <CloseIcon />
          </button>
        </div>
        <div className={style.form}>
          <Formik
            initialValues={{
              post: data.title,
              fromTime: "",
              toTime: "",
              fromDate: "",
              toDate: "",
              price: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values) => {
              // createPayment(values);
              createOffer(values);
            }}
          >
            {({ errors, touched, values, handleSubmit, setFieldValue }) => {
              return (
                <>
                  <ResetToDateOnFromDateChange values={values} />
                  <Form id="payment" onSubmit={handleSubmit}>
                    <div className={style.inputWrapper}>
                      {/* <SelectionInput
                        name={"post"}
                        title={"İlan"}
                        placeholder={"İlan"}
                        value={values.post}
                        data={[data.title]}
                      />
                      {errors.post && touched.post ? (
                        <span className="error-text">{errors.post}</span>
                      ) : null} */}

                      <div className={style.inputSplit}>
                        <div className={style.inputContainer}>
                          <ClockInput
                            name={"fromTime"}
                            title={"Başlangıç Saati"}
                            placeholder={"00:00"}
                            value={values.fromTime}
                          />
                          {errors.fromTime && touched.fromTime ? (
                            <span className="error-text">
                              {errors.fromTime}
                            </span>
                          ) : null}
                        </div>
                        <div className={style.inputContainer}>
                          <ClockInput
                            name={"toTime"}
                            title={"Bitiş Saati"}
                            placeholder={"00:00"}
                            value={values.toTime}
                          />
                          {errors.toTime && touched.toTime ? (
                            <span className="error-text">{errors.toTime}</span>
                          ) : null}
                        </div>
                      </div>
                      <div className={style.inputSplit}>
                        <div className={style.inputContainer}>
                          <DateInput
                            name={"fromDate"}
                            title={"Başlangıç Tarihi"}
                            placeholder={"00-00-0000"}
                            value={values.fromDate}
                            min={"today"}
                          />
                          {errors.fromDate && touched.fromDate ? (
                            <span className="error-text">
                              {errors.fromDate}
                            </span>
                          ) : null}
                        </div>
                        <div className={style.inputContainer}>
                          <DateInput
                            name={"toDate"}
                            title={"Bitiş Tarihi"}
                            placeholder={"00-00-0000"}
                            value={values.toDate}
                            min={values.fromDate}
                          />
                          {errors.toDate && touched.toDate ? (
                            <span className="error-text">{errors.toDate}</span>
                          ) : null}
                        </div>
                      </div>
                      <TextInput
                        name={"price"}
                        title={"Fiyat"}
                        placeholder={"Fiyat"}
                        value={values.price}
                        type={"number"}
                      />
                      {errors.price && touched.price ? (
                        <span className="error-text">{errors.price}</span>
                      ) : null}
                    </div>
                    <div className={style.buttonWrapper}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          closeClick();
                        }}
                      >
                        İptal
                      </button>
                      <button>Teklif Ver</button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const ResetToDateOnFromDateChange = ({ values }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.toDate && values.fromDate > values.toDate) {
      setFieldValue("toDate", "");
    }
  }, [values.fromDate, values.toDate, setFieldValue]);

  return null;
};

export default OfferPopup;
