/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import style from "./login.module.scss";
import logo from "../../assets/images/logo.png";
import { ButtonLoading, PasswordInput, TextInput } from "../../components";
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";
import LoginImage from "../../assets/images/login/login-image.png";
import { useEffect, useState } from "react";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { userLogin } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setErorr] = useState();
  const [isLoad, setLoad] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const ContactSchema = Yup.object().shape({
    email: Yup.string().email(`Lütfen e-posta giriniz`).required(`Zorunlu alan.`),
    password: Yup.string()
      .min(8, `Lütfen 8 haneli bir şifre giriniz`)
      .required(`Zorunlu alan.`),
  });

  useEffect(() => {
    if (userInfo.token) {
      navigate(userInfo.type === "personal" ? "/ilanlarim" : "/ilanlar ");
    }
  }, [userInfo]);

  const loginFunc = (value) => {
    AxiosRequest("post", ApiRoutes.auh.login, {
      email: value.email,
      password: value.password,
    })
      .then(async (res) => {
        await setLoad(false);
        if (res.data.token) {
          await localStorage.setItem("token", res.data.token);
          await dispatch(userLogin(res.data));
          await navigate(
            res.data.type === "personal" ? "/ilanlarim" : "/ilanlar "
          );
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
          setErorr(err.response.data);
        }
      });
  };

  const sendEmailAgain = (value) => {
    AxiosRequest("post", ApiRoutes.auh.sendEmailAgain, {
      email: value.email,
    })
      .then(async (res) => {
        await setLoad(false);
        await setErorr("successSend");
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
          setErorr(err.response.data);
        }
      });
  };

  const sendEmailForActive = (email, password) => {
    AxiosRequest("post", ApiRoutes.auh.sendEmailForActive, {
      email: email,
      password: password,
    })
      .then(async (res) => {
        await setLoad(false);
        await setErorr("successSend");
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
          setErorr(err.response.data);
        }
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(values) => {
        // createPayment(values);
        loginFunc(values);
        setLoad(true);
      }}

      // innerRef={formikRef}
    >
      {({ errors, touched, values, handleSubmit }) => (
        <Form className={style.form} id="payment" onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <TextInput
              name={"email"}
              title={"e-posta"}
              placeholder={"e-posta adresinizi giriniz"}
              value={values.email}
            />
            {errors.email && touched.email ? <span>{errors.email}</span> : null}
            <PasswordInput
              name={"password"}
              title={"Şifre"}
              placeholder={"Şifrenizi giriniz"}
              value={values.name}
            />
            {errors.password && touched.password ? (
              <span>{errors.password}</span>
            ) : null}
            {error ? (
              <span>
                {error === "emailError" ? (
                  <>
                    Lütfen e-posta adresinize iletilen linkle üyeliğinizi
                    onaylayınız.{" "}
                    <span>
                      Eğer link iletilmediğini düşünüyorsanız{" "}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          sendEmailAgain(values);
                        }}
                      >
                        Tekrar e-posta Gönderin
                      </button>
                    </span>
                  </>
                ) : error === "successSend" ? (
                  <span>
                    Başarıyla gönderildi. Lütfen e-posta adresinizi kontrol edin.
                  </span>
                ) : error === "deletedUser" ? (
                  <span className={style.deletedUser}>
                    Hesabınız isteğiniz doğrultusunda askıya alınmıştır.
                    Datalarınız 30 gün yasal süre içerisinde silinecektir.
                    Hesabınızı tekrar etkinleştirmek isterseniz{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        sendEmailForActive(values.email, values.password);
                      }}
                    >
                      e-posta Gönderebilirsiniz.
                    </button>
                  </span>
                ) : (
                  error
                )}
              </span>
            ) : null}

            <a className={style.forgotPassword} href="/sifre-yenile">
              Şifreni mi unuttun?
            </a>
            <button className={`${style.button} ${style.disabled}`}>
              {isLoad ? <ButtonLoading /> : "Giriş Yap"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  return (
    <div className={style.login}>
      <div className={style.wrapper}>
        <div className={style.card}>
          <a className={style.logo} href="/">
            <img src={logo} />
          </a>
          <div className={style.content}>
            <h1>Giriş Yap</h1>
            <p>
              Hesabın yok mu? <a href="/kayit-ol?type=first">Kayıt Ol</a>
            </p>
            <LoginForm />
          </div>
          <span className={style.copyright}>© 2024 ALL RIGHTS RESERVED</span>
        </div>
        <div className={style.imageCard}>
          <img src={LoginImage} />
        </div>
      </div>
    </div>
  );
};

export default Login;
