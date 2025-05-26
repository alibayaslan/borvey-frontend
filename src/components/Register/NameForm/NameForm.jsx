/* eslint-disable jsx-a11y/alt-text */
import style from "./nameform.module.scss";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../../Input/TextInput/TextInput";
import CustomerIllustration from "../../../assets/images/register/customer_name_illustration.png";
import ServiceIllustration from "../../../assets/images/register/service_name_illustration.png";

const NameForm = ({ isUser, setFormData, formRef }) => {
  const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Zorunlu alan."),
    surname: Yup.string().required("Zorunlu alan."),
  });

  return (
    <div className={style.wrapper}>
      <div className={style.imageWrapper}>
        <img src={isUser ? CustomerIllustration : ServiceIllustration} />
      </div>
      <div className={style.right}>
        <h1>Size nasıl hitap edelim?</h1>
        <Formik
          initialValues={{
            name: "",
            surname: "",
          }}
          validationSchema={ContactSchema}
          innerRef={formRef} // Form'u referans olarak üst bileşene geç
          onSubmit={(values) => {
            setFormData(values); // Form gönderildiğinde veriyi üst bileşene aktar
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NameForm;
