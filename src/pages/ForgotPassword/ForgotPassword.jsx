/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./forgotpassword.module.scss";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { PasswordInput, ButtonLoading, TextInput } from "../../components";
import { useLocation } from "react-router-dom";

const PasswordForm = ({ submit, error, isLoad }) => {
  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır") // Şifre uzunluğu kontrolü
      .matches(/[a-zA-Z]/, "Şifre harf içermelidir") // Harf içermeli
      .required(`Zorunlu alan.`),
    passwordAgain: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor") // Şifreler eşleşiyor mu kontrolü
      .required(`Zorunlu alan.`),
  });
  return (
    <Formik
      initialValues={{
        password: "",
        passwordAgain: "",
      }}
      validationSchema={PasswordSchema}
      onSubmit={(values) => {
        // createPayment(values);
        submit(values);
      }}

      // innerRef={formikRef}
    >
      {({ errors, touched, values, handleSubmit }) => (
        <Form className={style.form} id="payment" onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <PasswordInput
              name={"password"}
              title={"Şifre"}
              placeholder={"Şifrenizi giriniz"}
              value={values.name}
            />
            {errors.password && touched.password ? (
              <span>{errors.password}</span>
            ) : null}
            <PasswordInput
              name={"passwordAgain"}
              title={"Şifre Tekrar"}
              placeholder={"Şifrenizi tekrar giriniz"}
              value={values.passwordAgain}
            />
            {errors.passwordAgain && touched.passwordAgain ? (
              <span>{errors.passwordAgain}</span>
            ) : null}
            {error ? <span>{error}</span> : null}

            <button className={`${style.button} ${style.disabled}`}>
              {isLoad ? <ButtonLoading /> : "Şifreyi Yenile"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EmailSent = ({ submit, error, isLoad }) => {
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email(`Lütfen e-posta giriniz`).required(`Zorunlu alan.`),
  });
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={EmailSchema}
      onSubmit={(values) => {
        // createPayment(values);
        submit(values);
      }}

      // innerRef={formikRef}
    >
      {({ errors, touched, values, handleSubmit }) => (
        <Form className={style.form} id="payment" onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <TextInput
              name={"email"}
              title={""}
              placeholder={"e-posta adresinizi giriniz"}
              value={values.email}
              type={"email"}
            />
            {errors.email && touched.email ? <span>{errors.email}</span> : null}
            {error ? <span>{error}</span> : null}
            <button className={`${style.button} ${style.disabled}`}>
              {isLoad ? <ButtonLoading /> : "Gönder"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ForgotPassword = () => {
  const [isLoad, setLoad] = useState();
  const [error, setErorr] = useState();
  const location = useLocation();
  const [section, setSection] = useState();

  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");
  const codeParam = queryParams.get("code");

  const resetPassword = (value) => {
    AxiosRequest("post", ApiRoutes.auh.resetPassword, {
      password: value.password,
      email: emailParam,
      code: codeParam,
    })
      .then(async (res) => {
        await setLoad(false);
        if (res.data === "success") {
          setSection("successPassword");
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
          setErorr(err.response.data);
        }
      });
  };

  const emailSent = (value) => {
    AxiosRequest("post", ApiRoutes.auh.resetPasswordEmail, {
      email: value.email,
    })
      .then(async (res) => {
        await setLoad(false);
        if (res.data === "success") {
          setSection("successEmail");
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
          setErorr(err.response.data);
        }
      });
  };

  useEffect(() => {
    if (emailParam && codeParam) {
      setSection("password");
    } else {
      setSection("email");
    }
  }, []);

  return (
    <div className={style.forgotPassword}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h1>Şifremi Unuttum</h1>
          {section === "email" ? (
            <p>
              <br />
              e-posta adresinize iletilecek linkle şifrenizi yenileyebilirsiniz.
            </p>
          ) : null}
        </div>
        <div className={style.formCard}>
          {section === "email" ? (
            <EmailSent
              submit={(e) => {
                emailSent(e);
                setLoad(true);
              }}
              error={error}
              isLoad={isLoad}
            />
          ) : section === "password" ? (
            <PasswordForm
              submit={(e) => {
                resetPassword(e);
                setLoad(true);
              }}
              error={error}
              isLoad={isLoad}
            />
          ) : section === "successEmail" ? (
            <h5 className={style.success}>
              Lütfen e-postanızı kontrol ediniz.
              <br />
            </h5>
          ) : section === "successPassword" ? (
            <h5 className={style.success}>
              Şifreniz başarıyla değiştirildi. Giriş yapabilirsiniz.
            </h5>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
