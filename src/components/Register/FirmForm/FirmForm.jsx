/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import style from "./firmform.module.scss";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../../Input/TextInput/TextInput";
import { DeleteImageIcon, PhotoIcon } from "../../../assets/icon";
import TextArea from "../../Input/TextArea/TextArea";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AxiosRequest } from "../../../utils/AxiosRequest";
import { ApiRoutes } from "../../../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

const LogoUpload = ({ changeFile, logo, logoError }) => (
  <label
    className={`${style.logoUpload} ${logoError ? style.logoError : null}`}
  >
    <div className={style.iconWrapper}>
      <div className={style.icon}>
        {logo ? (
          <img
            src={typeof logo === "string" ? logo : URL.createObjectURL(logo)}
          />
        ) : (
          <>
            <PhotoIcon />
            <span>Upload photo</span>
          </>
        )}
      </div>
    </div>
    <div className={style.info}>
      <h5>Firma Logo Yükle</h5>
      <input
        accept="image/jpeg,image/png,image/jpg"
        onChange={changeFile}
        type="file"
      />
    </div>
  </label>
);

const FirmPhotoUpload = ({ images, changeFile, deleteClick }) => (
  <div className={style.firmPhotoUpload}>
    <label className={style.uploadArea}>
      <PhotoIcon />
      <h5>İşletme Fotoğrafları</h5>
      <p>
        Dosyaları buraya bırakın veya
        <br />
        bilgisayarınıza göz atmak için tıklayın.
      </p>
      <input
        accept="image/jpeg,image/png,image/jpg"
        onChange={changeFile}
        type="file"
        multiple
      />
    </label>
    {images && images.length > 0 && (
      <div className={style.imageArea}>
        {images.map((item, index) => (
          <div className={style.image} key={index}>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteClick(index);
              }}
            >
              <DeleteImageIcon />
            </button>
            <img
              src={typeof item === "string" ? item : URL.createObjectURL(item)}
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

const FirmForm = ({
  edit,
  data,
  setFormData,
  formRef,
  logoError,
  clearLogoError,
}) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(edit && data.firm ? data.firm.logo : "");
  const [firmImages, setFirmImages] = useState(
    edit && data.firmImages ? data.firmImages : []
  );
  const userInfo = useSelector((state) => state.user);
  const firmRef = useRef();

  useEffect(() => {
    if (edit && data.firm) {
      setFormData({
        firm: {
          name: data.firm.name,
          // address: data.firm.address,
          phone: data.firm.phone,
          // website: data.firm.website,
          description: data.firm.description,
          logo,
          // firmImages,
        },
      });
    }
  }, [data, logo]);

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Zorunlu alan."),
    // address: Yup.string().required("Zorunlu alan."),
    phone: Yup.string().required("Zorunlu alan."),
    description: Yup.string().required("Zorunlu alan."),
  });

  const handleFormChange = (values) => {
    setFormData({ firm: { ...values, logo, firmImages } });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    handleFormChange({ logo: file });
    if (clearLogoError) {
      clearLogoError();
    }
  };

  const handleFirmImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFirmImages((prevImages) => [...prevImages, ...files]);
    handleFormChange({ firmImages: [...firmImages, ...files] });
  };

  const deleteFirmImage = (index) => {
    const updatedImages = firmImages.filter((_, idx) => idx !== index);
    setFirmImages(updatedImages);
    handleFormChange({ firmImages: updatedImages });
  };

  const editFirm = (values) => {
    let formData = new FormData();
    formData.append("userId", userInfo._id);
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("website", values.website);
    formData.append("description", values.description);
    formData.append("firmImages", JSON.stringify(firmImages));

    if (typeof logo === "string") {
      formData.append("logo", logo);
    } else {
      formData.append("firm-logo", logo);
    }

    firmImages.forEach((item) => {
      formData.append(
        "firm-image",
        typeof item === "string" ? JSON.stringify(item) : item
      );
    });

    AxiosRequest("post", ApiRoutes.user.editFirm, formData)
      .then((res) => {
        navigate(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // console.log("firm", firmImages);

  return (
    <div className={style.firmForm}>
      <LogoUpload
        logoError={logoError}
        logo={logo}
        changeFile={handleLogoChange}
      />
      <div className={style.right}>
        <Formik
          initialValues={{
            name: edit ? data.firm.name : "",
            // address: edit ? data.firm.address : "",
            phone: edit ? data.firm.phone : "",
            // website: edit ? data.firm.website : "",
            description: edit ? data.firm.description : "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values) => {
            handleFormChange(values);
            if (edit) {
              editFirm(values);
            }
          }}
          innerRef={edit ? firmRef : formRef}
        >
          {({ errors, touched, values, handleSubmit }) => (
            <Form id="payment" onSubmit={handleSubmit}>
              <div className={style.inputWrapper}>
                <div className={style.column}>
                  <TextInput
                    name="name"
                    title="Firma Adı"
                    placeholder="Firma adı girin"
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                  {/* <TextInput
                    name="address"
                    title="Firma Adresi"
                    placeholder="Firma Adresini girin"
                    value={values.address}
                  />
                  {errors.address && touched.address && (
                    <span className="error-text">{errors.address}</span>
                  )} */}
                  <TextInput
                    name="phone"
                    title="Firma Telefon Numarası"
                    placeholder="Firma Telefon Numarası girin"
                    value={values.phone}
                    type="tel"
                  />
                  {errors.phone && touched.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
                <div className={style.column}>
                  {/* <TextInput
                    name="website"
                    title="Firma Websitesi"
                    placeholder="Firma Websitesi girin"
                    value={values.website}
                  />
                  {errors.website && touched.website && (
                    <span className="error-text">{errors.website}</span>
                  )} */}
                  <TextArea
                    name="description"
                    title="Firma Tanıtımı"
                    placeholder="Firma Tanıtımı girin"
                    value={values.description}
                  />
                  {errors.description && touched.description && (
                    <span className="error-text">{errors.description}</span>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {/* <FirmPhotoUpload
          images={firmImages}
          deleteClick={deleteFirmImage}
          changeFile={handleFirmImagesChange}
        /> */}
        {edit && (
          <button
            onClick={() => {
              firmRef.current.handleSubmit();
            }}
            className={style.submit}
          >
            Düzenle ve Yayınla
          </button>
        )}
      </div>
    </div>
  );
};

export default FirmForm;
