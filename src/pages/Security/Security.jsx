/* eslint-disable no-unused-vars */
import style from "./security.module.scss";
import { Formik, Form, useFormikContext } from "formik";
import {
  TextArea,
  TextInput,
  SelectionInput,
  PasswordInput,
  PopupQuestion,
} from "../../components";
import * as Yup from "yup";
import { CityData } from "../../utils/CityData";
import Avatar from "../../assets/images/avatar.png";
import { ChangeIcon, DeleteIcon } from "../../assets/icon";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { userLogin, logoutUser } from "../../redux/actions";

const DeleteAccount = ({ click }) => {
  return (
    <div className={style.deleteAccount}>
      <div>
        <h4>Hesabı Sil</h4>
        <p>
          Hesabı silmek istediğinze emin misiniz? Bu işlem geri alınamaz.
          Silindikten sonra tüm bilgileriniz database üzerinden silinecektir. Bu
          işlem için tekrar düşünmenizi tavsiye ederiz.
        </p>
      </div>
      <button onClick={click}>Hesabı Sil</button>
    </div>
  );
};

const Security = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState();
  const [isPopup, setPopup] = useState();
  const [error, setError] = useState();

  const userInfo = useSelector((state) => state.user);
  const ContactSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır") // Şifre uzunluğu kontrolü
      .matches(/[a-zA-Z]/, "Şifre harf içermelidir") // Harf içermeli
      .required(`Zorunlu alan.`),
    passwordAgain: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor") // Şifreler eşleşiyor mu kontrolü
      .required(`Zorunlu alan.`),
  });

  const changePassword = (password) => {
    AxiosRequest("post", ApiRoutes.user.changePassword, {
      userId: userInfo._id,
      password: password,
      type: userInfo.type,
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
        }
      });
  };

  const deleteUser = (value) => {
    AxiosRequest("post", ApiRoutes.user.deleteUser, {
      userId: userInfo._id,
      password: value.password,
      reason: value.reason,
      type: userInfo.type,
    })
      .then(async (res) => {
        await setLoad(false);
        if (res.data === "success") {
          localStorage.removeItem("token");
          dispatch(logoutUser());
        }
      })
      .catch((err) => {
        setLoad(false);
        if (err.response.data) {
          setError(err.response.data);
        }
      });
  };

  return (
    <>
      {isPopup ? (
        <PopupQuestion
          question={"Hesabınızı silmek istediğinize emin misiniz?"}
          acceptTitle={"Hesabımı Sil"}
          declineTitle={"İptal"}
          deleteAccount
          error={error}
          decline={() => setPopup()}
          accept={(e) => {
            deleteUser(e);
            // deleteWork(isPopup);
          }}
          userInfo={userInfo}
        />
      ) : null}
      <div className={style.wrapper}>
        <div className={style.formContainer}>
          {/* <div className={style.formWrapper}>
          <h1>Email Değiştir</h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values) => {
              // createPayment(values);
            }}

            // innerRef={formikRef}
          >
            {({ errors, touched, values, handleSubmit }) => (
              <Form id="payment" onSubmit={handleSubmit}>
                <div className={style.inputWrapper}>
                  <div className={style.input}>
                    <TextInput
                      name={"email"}
                      title={"Email"}
                      placeholder={"Email girin"}
                      value={values.email}
                      type={"email"}
                    />
                    {errors.email && touched.email ? (
                      <span>{errors.email}</span>
                    ) : null}
                  </div>

                  <button className={style.submit}>Email Değiştir</button>
                </div>
              </Form>
            )}
          </Formik>
        </div> */}
          <div className={style.formWrapper}>
            <h1>Şifre Değiştir</h1>
            <Formik
              initialValues={{
                password: "",
                passwordAgain: "",
              }}
              validationSchema={ContactSchema}
              onSubmit={(values) => {
                // createPayment(values);
                changePassword(values.password);
              }}

              // innerRef={formikRef}
            >
              {({ errors, touched, values, handleSubmit }) => (
                <Form id="payment" onSubmit={handleSubmit}>
                  <div className={style.inputWrapper}>
                    <div className={style.input}>
                      <PasswordInput
                        name={"password"}
                        title={"Şifre"}
                        placeholder={"Şifre girin"}
                        value={values.password}
                        type={"password"}
                      />
                      {errors.password && touched.password ? (
                        <span>{errors.password}</span>
                      ) : null}
                    </div>
                    <div className={style.input}>
                      <PasswordInput
                        name={"passwordAgain"}
                        title={"Şifre Tekrar"}
                        placeholder={"Şifre Tekrar girin"}
                        value={values.passwordAgain}
                        type={"passwordAgain"}
                      />
                      {errors.passwordAgain && touched.passwordAgain ? (
                        <span>{errors.passwordAgain}</span>
                      ) : null}
                    </div>

                    <button className={style.submit}>Şifre Değiştir</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <DeleteAccount click={() => setPopup(true)} />
      </div>
    </>
  );
};

export default Security;
