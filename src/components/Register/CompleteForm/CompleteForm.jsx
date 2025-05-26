/* eslint-disable jsx-a11y/alt-text */
import style from "./completeform.module.scss";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../../Input/TextInput/TextInput";
import CustomerIllustration from "../../../assets/images/register/customer_complete_illustration.png";
import ServiceIllustration from "../../../assets/images/register/service_complete_illustration.png";
import PasswordInput from "../../Input/PasswordInput/PasswordInput";

const CompleteForm = ({ isUser, setFormData, formRef, error }) => {

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Zorunlu alan."),
    surname: Yup.string().required("Zorunlu alan."),
    email: Yup.string()
      .email("Geçerli bir email adresi girin")
      .required(`Zorunlu alan.`),
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır") // Şifre uzunluğu kontrolü
      .matches(/[a-zA-Z]/, "Şifre harf içermelidir") // Harf içermeli
      .required(`Zorunlu alan.`),
    passwordAgain: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor") // Şifreler eşleşiyor mu kontrolü
      .required(`Zorunlu alan.`),
  });

  return (
    <div className={style.wrapper}>
      <div className={style.imageWrapper}>
        <img src={isUser ? CustomerIllustration : ServiceIllustration} />
      </div>
      <div className={style.right}>
        <h1>Profilini Tamamlayalım</h1>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            passwordAgain: "",
          }}
          validationSchema={ContactSchema}
          innerRef={formRef}
          onSubmit={(values) => {
            setFormData(values); // Form gönderildiğinde veriyi kaydet
          }}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form>
              <div className={style.inputWrapper}>
                <TextInput
                  name="name"
                  title="Ad"
                  placeholder="Adınızı girin"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <span className="error-text">{errors.name}</span>
                )}
                <TextInput
                  name="surname"
                  title="Soyad"
                  placeholder="Soyadınızı girin"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.surname && touched.surname && (
                  <span className="error-text">{errors.surname}</span>
                )}
                <TextInput
                  name="email"
                  title="Email"
                  placeholder="Email girin"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({ email: e.target.value });
                  }}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <span className="error-text">{errors.email}</span>
                )}
                <PasswordInput
                  name="password"
                  title="Şifre"
                  placeholder="Şifre girin"
                  value={values.password}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({ password: e.target.value });
                  }}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <span className="error-text">{errors.password}</span>
                )}
                <PasswordInput
                  name="passwordAgain"
                  title="Şifre Tekrar"
                  placeholder="Şifreyi Tekrar girin"
                  value={values.passwordAgain}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({ passwordAgain: e.target.value });
                  }}
                  onBlur={handleBlur}
                />
                {errors.passwordAgain && touched.passwordAgain && (
                  <span className="error-text">{errors.passwordAgain}</span>
                )}
                {error ? <span className="error-text">{error}</span> : null}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompleteForm;
