/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Formik, Form, useFormikContext } from "formik";
import { TextArea, TextInput } from "../../components";
import * as Yup from "yup";
import style from "./contact.module.scss";
import { ContactIcon } from "../../assets/icon";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { Helmet } from "react-helmet";

const ContactForm = () => {
  const [isLoad, setLoad] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const ContactSchema = Yup.object().shape({
    email: Yup.string().email(`Lütfen email giriniz`).required(`Zorunlu alan.`),
    name: Yup.string().required(`Zorunlu alan.`),
    message: Yup.string().required(`Zorunlu alan.`),
  });

  const createContact = (val) => {
    AxiosRequest("post", ApiRoutes.website.createContact, {
      name: val.name,
      surname: val.surname,
      email: val.email,
      message: val.message,
      phone: val.phone,
    })
      .then(async (res) => {
        setLoad(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(values) => {
        // createPayment(values);
        if (!isSuccess) {
          setLoad(true);
          createContact(values);
        }
      }}

      // innerRef={formikRef}
    >
      {({ errors, touched, values, handleSubmit }) => (
        <Form id="payment" onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <div className={style.formSplit}>
              <div className={style.input}>
                <TextInput
                  name={"name"}
                  title={"Ad"}
                  placeholder={"Adınızı giriniz"}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <span>{errors.name}</span>
                ) : null}
              </div>
              <div className={style.input}>
                <TextInput
                  name={"surname"}
                  title={"Soyad"}
                  placeholder={"Soyadınızı giriniz"}
                  value={values.surname}
                />
                {errors.surname && touched.surname ? (
                  <span>{errors.surname}</span>
                ) : null}
              </div>
            </div>
            <div className={style.formSplit}>
              <div className={style.input}>
                <TextInput
                  name={"phone"}
                  title={"Telefon"}
                  placeholder={"Telefonunuzu giriniz"}
                  value={values.phone}
                  type={"tel"}
                />
                {errors.phone && touched.phone ? (
                  <span>{errors.phone}</span>
                ) : null}
              </div>
              <div className={style.input}>
                <TextInput
                  name={"email"}
                  title={"e-posta"}
                  placeholder={"e-postanızı giriniz"}
                  value={values.email}
                  type={"email"}
                />
                {errors.email && touched.email ? (
                  <span>{errors.email}</span>
                ) : null}
              </div>
            </div>
            <div className={style.input}>
              <TextArea
                name={"message"}
                title={"Mesaj"}
                placeholder={"Mesajınızı yazın"}
                value={values.message}
              />
              {errors.message && touched.message ? (
                <span>{errors.message}</span>
              ) : null}
            </div>
            <button
              disabled={isLoad}
              className={`${style.submit} ${isSuccess ? style.success : null}`}
            >
              {isLoad ? "..." : isSuccess ? "Başarıyla Gönderildi" : "Gönder"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Contact = () => {
  const [data, setData] = useState();

  const getHomeData = () => {
    AxiosRequest("post", ApiRoutes.website.getHome)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHomeData();
  }, []);
  return (
    <>
      {data ? (
        <Helmet>
          <title>{data.SEO.contact.title}</title>
          <meta
            name="description"
            content={data.SEO.contact.description}
            data-react-helmet="true"
          />
          <meta
            name="keywords"
            content={data.SEO.contact.tags}
            data-react-helmet="true"
          />
        </Helmet>
      ) : null}
      <div className={style.container}>
        <div className={style.wrapper}>
          <h1>Bize Ulaşın</h1>
          <p className={style.subtitle}>
            <div className={style.card}>
              <div className={style.contactCard}>
                <h5>İletişim Bilgileri</h5>
                <ul>
                  <li>
                    <div className={style.iconWrapper}>
                      <ContactIcon type={"phone"} />
                    </div>
                    <p>+90 (532) 461 80 11</p>
                  </li>
                  <li>
                    <div className={style.iconWrapper}>
                      <ContactIcon type={"email"} />
                    </div>
                    <div className={style.linkWrapper}>
                      <a target="__blank" href="mailto:bilgi@borvey.com">
                        bilgi@borvey.com
                      </a>
                      <a target="__blank" href="mailto:destek@borvey.com">
                        destek@borvey.com
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className={style.iconWrapper}>
                      <ContactIcon type={"location"} />
                    </div>
                    <p>Küçükçekmece / İstanbul</p>
                  </li>
                </ul>
              </div>
              <div className={style.formWrapper}>
                <ContactForm />
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
