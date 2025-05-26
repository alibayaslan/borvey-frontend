/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import style from "./profile.module.scss";
import { Formik, Form, useFormikContext } from "formik";
import {
  TextArea,
  TextInput,
  SelectionInput,
  ButtonLoading,
  PopupQuestion,
} from "../../components";
import * as Yup from "yup";
import { CityData } from "../../utils/CityData";
import Avatar from "../../assets/images/avatar.png";
import { ChangeIcon, DeleteIcon } from "../../assets/icon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { updateUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const PhotoCard = ({ file, deleteClick, change, avatar }) => {
  return (
    <div className={style.photoCard}>
      <div className={style.imageWrapper}>
        <input type="file" accept="image/*" onChange={change} />
        <img
          src={file ? URL.createObjectURL(file) : avatar ? avatar : Avatar}
        />
      </div>
      <p>
        Allowed *.jpeg, *.jpg, *.png, *.gif <br />
        Max size of 3.1 MB
      </p>
      <div className={style.buttonWrapper}>
        <button>
          <input type="file" accept="image/*" onChange={change} />
          <span>
            <ChangeIcon />
          </span>
          Fotoğrafı Değiştir
        </button>
        <button onClick={deleteClick}>
          <span>
            <DeleteIcon />
          </span>
          Fotoğrafı Sil
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [isLoad, setLoad] = useState(false);
  const [file, setFile] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [isPopup, setPopup] = useState(false);

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required(`Zorunlu alan.`),
    surname: Yup.string().required(`Zorunlu alan.`),
  });

  const updateUserFunc = (value) => {
    console.log("value", value);
    let formData = new FormData();
    formData.append("userId", userInfo._id);
    formData.append("type", userInfo.type);
    formData.append("name", value.name);
    formData.append("surname", value.surname);
    formData.append("phone", value.phone);
    formData.append("city", value.city);
    formData.append("district", value.district);
    formData.append(
      "avatar",
      value.avatar === "delete" ? "" : userInfo.avatar ? userInfo.avatar : ""
    );
    if (file) {
      formData.append("image", file);
    }

    AxiosRequest("post", ApiRoutes.user.editUser, formData)
      .then(async (res) => {
        await setLoad(false);
        if (res.data) {
          console.log("data", res.data);
          await dispatch(updateUser(res.data));
          await setSuccess(true);
          await navigate(0);
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <>
      {isPopup ? (
        <PopupQuestion
          question={"Fotoğrafı silmek istediğinize emin misiniz?"}
          acceptTitle={"Sil"}
          declineTitle={"İptal"}
          decline={() => setPopup()}
          accept={() => {
            updateUserFunc({
              ...userInfo,
              avatar: "delete",
            });
            // deleteWork(isPopup);
          }}
        />
      ) : null}
      <div className={style.wrapper}>
        <PhotoCard
          file={file}
          avatar={userInfo.avatar}
          change={(e) => setFile(e.target.files[0])}
          deleteClick={() => {
            if (file) {
              setFile();
            } else {
              setPopup(true);
            }
          }}
        />
        <div className={style.formWrapper}>
          <Formik
            initialValues={{
              name: userInfo.name,
              surname: userInfo.surname,
              phone: userInfo.phone ? userInfo.phone : "",
              city: userInfo.city ? userInfo.city : "",
              district: userInfo.district ? userInfo.district : "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values) => {
              // createPayment(values);
              setLoad(true);
              updateUserFunc(values);
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
                        placeholder={"Adınızı girin"}
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
                        placeholder={"Soyadınızı girin"}
                        value={values.surname}
                      />
                      {errors.surname && touched.surname ? (
                        <span>{errors.surname}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className={style.input}>
                    <TextInput
                      name={"phone"}
                      title={"Telefon"}
                      placeholder={"Telefon girin"}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <span>{errors.phone}</span>
                    ) : null}
                  </div>
                  <div className={style.formSplit}>
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

                  <button
                    className={`${style.submit} ${
                      isSuccess ? style.submitSuccess : null
                    }`}
                  >
                    {isLoad ? (
                      <ButtonLoading />
                    ) : isSuccess ? (
                      "Başarıyla Düzenlendi"
                    ) : (
                      "Düzenle"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Profile;
