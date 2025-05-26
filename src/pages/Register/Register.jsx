/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import style from "./register.module.scss";
import { useState, useRef, useEffect } from "react";
import {
  CompleteForm,
  DescriptionForm,
  DestinationForm,
  FirmForm,
  NameForm,
  RegisterFooter,
  SelectionCardForm,
  TopBar,
  TransportType,
  TypeSelection,
  WorkForm,
} from "../../components";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions";
import { useSelector } from "react-redux";
import { AcceptIcon } from "../../assets/icon";

const Register = () => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [logoError, setLogoError] = useState();
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setSuccess] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get("type");

  const [selectedType, setSelectedType] = useState(
    typeParam === 'first' ? "firstservice" : typeParam
  );

  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordAgain: "",
    type: "",
    firm: {
      name: "",
      address: "",
      phone: "",
      website: "",
      description: "",
      logo: "",
      firmImages: [],
    },
    work: [],
    post: {
      title: "",
      additionalInfo: "",
      type: "",
      questions: [],
      address: {
        from: {
          city: "",
          district: "",
          street: "",
        },
        to: {
          city: "",
          district: "",
          street: "",
        },
      },
    },
  });

  useEffect(() => {
    if (userInfo.token) {
      navigate(userInfo.type === "personal" ? "/ilanlarim" : "/ilanlar ");
    }
  }, [userInfo]);

  const formRefs = useRef([]);

  const fromAddressRef = useRef();
  const toAddressRef = useRef();
  const infoRef = useRef();

  const updateFormData = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const updateWorkData = (newWorkList) => {
    setData((prevData) => ({
      ...prevData,
      work: newWorkList,
    }));
  };

  const handleNextStep = async () => {
    if (typeParam === "service") {
      if (currentStep === 0) {
        // İlk adımda Formik doğrulaması yapmadan bir sonraki adıma geç
        setSelectedType("service");
        console.log("formRefs",formRefs.current[3])
        await formRefs.current[3].submitForm();
        const isValid = await formRefs.current[3].validateForm();
        if (Object.keys(isValid).length === 0) {
          setCurrentStep(3);
        }
        // setCurrentStep(currentStep + 1);
      } 
      // else if (currentStep === 2 && data.firm.logo) {
      //   setCurrentStep(currentStep + 1);
      // } else if (formRefs.current[currentStep]) {
      //   console.log("girdi");
      //   await formRefs.current[currentStep].submitForm();
      //   const isValid = await formRefs.current[currentStep].validateForm();

      //   if (currentStep === 2 && !data.firm.logo) {
      //     setLogoError(true);
      //   } else if (currentStep === 2 && data.firm.logo) {
      //     setLogoError(false);
      //   }

      //   if (Object.keys(isValid).length === 0 && currentStep !== 3) {
      //     setCurrentStep(currentStep + 1);
      //   }
      // }
    } 
    else if(typeParam === "customer") {
      if (currentStep === 0) {
        // İlk adımda Formik doğrulaması yapmadan bir sonraki adıma geç

        setCurrentStep(currentStep + 1);
      } else if (currentStep === 1) {

        const isValid = await infoRef.current.validateForm()
        const isValid2 = await fromAddressRef.current.validateForm()
        const isValid3 = await toAddressRef.current.validateForm()
        fromAddressRef.current.submitForm();
        toAddressRef.current.submitForm();
        infoRef.current.submitForm();
        if (Object.keys(isValid).length === 0 && Object.keys(isValid2).length === 0 && Object.keys(isValid3).length === 0) {
          setCurrentStep(currentStep + 1);
        }
      } else if (currentStep === 2) {
        formRefs.current[2].submitForm();

        const isValid = await formRefs.current[2].validateForm();
        if (Object.keys(isValid).length === 0) {
          createUser({
            ...data,
            ...formRefs.current[2].values,
          });
        }
      }
    }

      if (typeParam === "first") {
      if (selectedType === "firstservice") {
        if (currentStep === 0) {
          // İlk adımda Formik doğrulaması yapmadan bir sonraki adıma geç
          setCurrentStep(currentStep + 1);
        }  else if (currentStep === 1) {
          console.log("girdi",formRefs.current[2]);
          await formRefs.current[2].submitForm();
          const isValid = await formRefs.current[2].validateForm();

          if (currentStep === 1 && !data.firm.logo) {
            setLogoError(true);
          } else if (currentStep === 1 && data.firm.logo) {
            setLogoError(false);
          }

          if (Object.keys(isValid).length === 0 && currentStep !== 3) {
            setCurrentStep(currentStep + 1);
          }
        }
        else if(currentStep === 2){
          // İlk adımda Formik doğrulaması yapmadan bir sonraki adıma geç
          setSelectedType("firstservice");
          console.log("formRefs",formRefs.current[3])
          await formRefs.current[3].submitForm();
          const isValid = await formRefs.current[3].validateForm();
          if (Object.keys(isValid).length === 0) {
            setCurrentStep(3);
          }
          // setCurrentStep(currentStep + 1);
        }
      } else if ( selectedType === "firstcustomer") {
        if (currentStep === 0) {
        // İlk adımda Formik doğrulaması yapmadan bir sonraki adıma geç

          setCurrentStep(currentStep + 1);
        } else if (currentStep === 1) {
          setCurrentStep(currentStep + 1);
        }
         else if (currentStep === 2) {

          const isValid = await infoRef.current.validateForm()
          const isValid2 = await fromAddressRef.current.validateForm()
          const isValid3 = await toAddressRef.current.validateForm()
          fromAddressRef.current.submitForm();
          toAddressRef.current.submitForm();
          infoRef.current.submitForm();
          if (Object.keys(isValid).length === 0 && Object.keys(isValid2).length === 0 && Object.keys(isValid3).length === 0) {
            setCurrentStep(currentStep + 1);
          }
        } else if (currentStep === 3) {
          formRefs.current[2].submitForm();

          const isValid = await formRefs.current[2].validateForm();
          if (Object.keys(isValid).length === 0) {
            createUser({
              ...data,
              ...formRefs.current[2].values,
            });
          }
        }
      }
  
    }
  };

  const createUser = (values) => {
    setError();
    setLoad(true);
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("surname", values.surname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append(
      "type",
      selectedType === "customer" ? "personal" : selectedType
    );

    if (selectedType === "service") {
      formData.append("firm-logo", values.firm.logo);
      for (let index = 0; index < values.firm.firmImages.length; index++) {
        formData.append("firm-image", values.firm.firmImages[index]);
      }
      formData.append(
        "works",
        JSON.stringify(
          values.work.map((i) => ({
            ...i,
            type: i.transportType,
          }))
        )
      );
      formData.append("firmName", values.firm.name);
      formData.append("firmAddress", values.firm.address);
      formData.append("website", values.firm.website);
      formData.append("firmPhone", values.firm.phone);
      formData.append("description", values.firm.description);
    }

    if (selectedType === "customer") {
      if (
        data.post.title &&
        data.post.type &&
        data.post.questions.question &&
        data.post.questions.answer &&
        data.post.address.from.city &&
        data.post.address.from.district &&
        data.post.address.to.city &&
        data.post.address.to.district
      ) {
        formData.append("isPost", "true");
        formData.append("postTitle", data.post.title);
        formData.append("postInfo", data.post.additionalInfo);
        formData.append("postType", data.post.type);
        formData.append("postQuestions", JSON.stringify(data.post.questions));
        formData.append("postAdressFromCity", data.post.address.from.city);
        formData.append(
          "postAdressFromDistrict",
          data.post.address.from.district
        );
        formData.append("postAdressToCity", data.post.address.to.city);
        formData.append("postAdressToDistrict", data.post.address.to.district);
      }
    }

    AxiosRequest("post", ApiRoutes.auh.register, formData)
      .then(async (res) => {
        setLoad(false);
        if (res.data === "success") {
          setSuccess(true);
        }
        // if (res.data.token) {
        //   await localStorage.setItem("token", res.data.token);
        //   await dispatch(userLogin(res.data));
        //   await navigate(
        //     res.data.type === "personal" ? "/ilanlarim" : "/ilanlar"
        //   );
        // }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
          setError(err.response.data);
        }
      });
  };

  const handleChange = (e) => {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        post: {
          ...prevData.post,
          address: {
            ...prevData.post.address,
            [e.type]: e.item,
          },
        },
      };

      return updatedData;
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 7000);
    }
  }, [isSuccess]);

  console.log("selectedType", selectedType);

  return (
    <div className={style.register}>
      <TopBar currentStep={currentStep} typeParam={typeParam} selectedType={selectedType} />

      <div className={style.contentWrapper}>
        {
        typeParam === "service" ? 
        (
          <>
            {
            currentStep === 0 ? (
              <>
              <FirmForm
                edit={false}
                setFormData={updateFormData}
                data={data}
                formRef={(ref) => (formRefs.current[2] = ref)}
                logoError={logoError}
                clearLogoError={() => setLogoError(false)}
              />
              </>
            )
            : currentStep === 1 ? (
              <>
                <CompleteForm
                  setFormData={async (e) => {
                    setData((prevData) => ({ ...prevData, ...e }));
                    await createUser({
                      ...data,
                      ...e,
                    });
                  }}
                  formRef={(ref) => (formRefs.current[3] = ref)}
                  error={error}
                />
                {/* <TypeSelection
                  click={(e) => setSelectedType(e)}
                  selectedType={selectedType}
                /> */}
              </>
            ) : currentStep === 1 ? (
              <NameForm
                setFormData={updateFormData}
                formRef={(ref) => (formRefs.current[1] = ref)}
              />
            ) : currentStep === 2 ? (
              <FirmForm
                edit={false}
                setFormData={updateFormData}
                data={data}
                formRef={(ref) => (formRefs.current[2] = ref)}
                logoError={logoError}
                clearLogoError={() => setLogoError(false)}
              />
            ) : currentStep === 3 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <CompleteForm
                    setFormData={async (e) => {
                      setData((prevData) => ({ ...prevData, ...e }));
                      await createUser({
                        ...data,
                        ...e,
                      });
                    }}
                    formRef={(ref) => (formRefs.current[3] = ref)}
                    error={error}
                  />
                )}
              </>
            ) : null}
          </>
        )
        : typeParam === 'first' && selectedType === 'firstcustomer' ? 
        (
          <>
            {
            currentStep === 0 ? (
              <>
                <TypeSelection
                  click={(e) => setSelectedType(e)}
                  selectedType={selectedType}
                />
              </>
            )
            : currentStep === 1 ? (
              <>
              <TransportType
                setSelectedType={setSelectedType}
                changeType={(e) => 
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      type: e,
                    },
                  }))
                }
              />
              </>
            ) : currentStep === 2 ? (
              <>
              <div className={style.descriptionWrapper}>
              <DescriptionForm
                ref={infoRef}
                handleChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      ...e,
                    },
                  }))
                }
                value={{
                  title: data.post.title,
                  additionalInfo: data.post.additionalInfo,
                }}
              />
              <DestinationForm
                fromAddressRef={fromAddressRef}
                toAddressRef={toAddressRef}
                handleChange={handleChange}
                value={data.post.address}
              />

              </div>

              </>
            ) : currentStep === 3 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <>

                  <CompleteForm
                    isUser
                    setFormData={updateFormData}
                    formRef={(ref) => (formRefs.current[2] = ref)}
                    error={error}
                  />
                  </>
                )}
              </>
            ) : currentStep === 4 ? (
              <SelectionCardForm
                transportType={data.post.type ? data.post.type : "home"}
                select={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      questions: e,
                    },
                  }))
                }
              />
            ) : currentStep === 5 ? (
              <DestinationForm
                fromAddressRef={fromAddressRef}
                toAddressRef={toAddressRef}
                handleChange={handleChange}
                value={data.post.address}
              />
            )  : currentStep === 6 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <CompleteForm
                    isUser
                    setFormData={updateFormData}
                    formRef={(ref) => (formRefs.current[2] = ref)}
                    error={error}
                  />
                )}
              </>
            ) : null}
          </>
        ) 
        : typeParam === 'first' && selectedType === 'firstservice' ? 
        (
          <>
            {
            currentStep === 0 ? (
              <>
              <TypeSelection
                click={(e) => setSelectedType(e)}
                selectedType={selectedType}
              />
              </>
            ) : currentStep === 1 ? (
              <>
              <FirmForm
                edit={false}
                setFormData={updateFormData}
                data={data}
                formRef={(ref) => (formRefs.current[2] = ref)}
                logoError={logoError}
                clearLogoError={() => setLogoError(false)}
              />
              </>
            )
            : currentStep === 2 ? (
              <>
                <CompleteForm
                  setFormData={async (e) => {
                    setData((prevData) => ({ ...prevData, ...e }));
                    await createUser({
                      ...data,
                      ...e,
                    });
                  }}
                  formRef={(ref) => (formRefs.current[3] = ref)}
                  error={error}
                />
                {/* <TypeSelection
                  click={(e) => setSelectedType(e)}
                  selectedType={selectedType}
                /> */}
              </>
            ) : currentStep === 3 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <CompleteForm
                    setFormData={async (e) => {
                      setData((prevData) => ({ ...prevData, ...e }));
                      await createUser({
                        ...data,
                        ...e,
                      });
                    }}
                    formRef={(ref) => (formRefs.current[3] = ref)}
                    error={error}
                  />
                )}
              </>
            ) : null}
          </>
        )
        : selectedType === "customer" ? 
        (
          <>
            {currentStep === 0 ? (
              <>
              <TransportType
                setSelectedType={setSelectedType}
                changeType={(e) => 
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      type: e,
                    },
                  }))
                }
              />
                {/* <TypeSelection
                  click={(e) => setSelectedType(e)}
                  selectedType={selectedType}
                /> */}
              </>
            ) : currentStep === 1 ? (
              <>
              <div className={style.descriptionWrapper}>
              <DescriptionForm
                ref={infoRef}
                handleChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      ...e,
                    },
                  }))
                }
                value={{
                  title: data.post.title,
                  additionalInfo: data.post.additionalInfo,
                }}
              />
              <DestinationForm
                fromAddressRef={fromAddressRef}
                toAddressRef={toAddressRef}
                handleChange={handleChange}
                value={data.post.address}
              />

              </div>
              {/* <NameForm
                isUser
                setFormData={updateFormData}
                formRef={(ref) => (formRefs.current[1] = ref)}
              /> */}
              </>
            ) : currentStep === 2 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <>
              {/* <NameForm
                isUser
                setFormData={updateFormData}
                formRef={(ref) => (formRefs.current[1] = ref)}
              /> */}
                  <CompleteForm
                    isUser
                    setFormData={updateFormData}
                    formRef={(ref) => (formRefs.current[2] = ref)}
                    error={error}
                  />
                  </>
                )}

              {/*<TransportType
              setSelectedType={setSelectedType}
                changeType={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      type: e,
                    },
                  }))
                }
              />*/}
              </>
            ) : currentStep === 3 ? (
              <SelectionCardForm
                transportType={data.post.type ? data.post.type : "home"}
                select={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      questions: e,
                    },
                  }))
                }
              />
            ) : currentStep === 4 ? (
              <DestinationForm
                fromAddressRef={fromAddressRef}
                toAddressRef={toAddressRef}
                handleChange={handleChange}
                value={data.post.address}
              />
            ) : currentStep === 5 ? (
              {/*<div className={style.descriptionWrapper}>
                <DescriptionForm
                  ref={infoRef}
                  handleChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      post: {
                        ...prevData.post,
                        ...e,
                      },
                    }))
                  }
                  value={{
                    title: data.post.title,
                    additionalInfo: data.post.additionalInfo,
                  }}
                />
              </div>*/}
            ) : currentStep === 6 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <CompleteForm
                    isUser
                    setFormData={updateFormData}
                    formRef={(ref) => (formRefs.current[2] = ref)}
                    error={error}
                  />
                )}
              </>
            ) : null}
          </>
        ) : 
          <>
            {currentStep === 0 ? (
              <>
              <TransportType
                setSelectedType={setSelectedType}
                changeType={(e) => 
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      type: e,
                    },
                  }))
                }
              />
                {/* <TypeSelection
                  click={(e) => setSelectedType(e)}
                  selectedType={selectedType}
                /> */}
              </>
            ) : currentStep === 1 ? (
              <>
              <div className={style.descriptionWrapper}>
              <DescriptionForm
                ref={infoRef}
                handleChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      ...e,
                    },
                  }))
                }
                value={{
                  title: data.post.title,
                  additionalInfo: data.post.additionalInfo,
                }}
              />
              <DestinationForm
                fromAddressRef={fromAddressRef}
                toAddressRef={toAddressRef}
                handleChange={handleChange}
                value={data.post.address}
              />

              </div>
              {/* <NameForm
                isUser
                setFormData={updateFormData}
                formRef={(ref) => (formRefs.current[1] = ref)}
              /> */}
              </>
            ) : currentStep === 2 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <>
              {/* <NameForm
                isUser
                setFormData={updateFormData}
                formRef={(ref) => (formRefs.current[1] = ref)}
              /> */}
                  <CompleteForm
                    isUser
                    setFormData={updateFormData}
                    formRef={(ref) => (formRefs.current[2] = ref)}
                    error={error}
                  />
                  </>
                )}

              {/*<TransportType
              setSelectedType={setSelectedType}
                changeType={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      type: e,
                    },
                  }))
                }
              />*/}
              </>
            ) : currentStep === 3 ? (
              <SelectionCardForm
                transportType={data.post.type ? data.post.type : "home"}
                select={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    post: {
                      ...prevData.post,
                      questions: e,
                    },
                  }))
                }
              />
            ) : currentStep === 4 ? (
              <DestinationForm
                fromAddressRef={fromAddressRef}
                toAddressRef={toAddressRef}
                handleChange={handleChange}
                value={data.post.address}
              />
            ) : currentStep === 5 ? (
              {/*<div className={style.descriptionWrapper}>
                <DescriptionForm
                  ref={infoRef}
                  handleChange={(e) =>
                    setData((prevData) => ({
                      ...prevData,
                      post: {
                        ...prevData.post,
                        ...e,
                      },
                    }))
                  }
                  value={{
                    title: data.post.title,
                    additionalInfo: data.post.additionalInfo,
                  }}
                />
              </div>*/}
            ) : currentStep === 6 ? (
              <>
                {isSuccess ? (
                  <div className={style.success}>
                    <AcceptIcon />
                    <h5>
                      Başarıyla kayıt oldunuz. Lütfen e-posta adresinize gelen
                      linkle kayıt işleminizi onaylayınız.
                    </h5>
                  </div>
                ) : (
                  <CompleteForm
                    isUser
                    setFormData={updateFormData}
                    formRef={(ref) => (formRefs.current[2] = ref)}
                    error={error}
                  />
                )}
              </>
            ) : null}
          </>
        }
      </div>
      {isSuccess ? null : (
        <div
          className={`${style.buttonWrapper} ${
            selectedType === "service" ? style.buttonServiceWrapper : selectedType === "firstservice" ? style.buttonServiceWrapper : ""
          }`}
        >
          {currentStep > 0 && (
            <button
              onClick={() => {
                if (currentStep === 3 && selectedType === `${selectedType === "firstservice" ? "firstservice" : "service"}`) {
                  setData({
                    ...data,
                    firm: {
                      ...data.firm,
                      logo: "",
                    },
                  });
                  setCurrentStep(currentStep - 1);
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
            >
              Geri
            </button>
          )}
          <div className={style.rightWrapper}>
            {/* {currentStep === 3 && <button className={style.skip}>Atla</button>} */}
            <button onClick={handleNextStep} className={`${style.mainButton}`}>
              {(selectedType === "service" && currentStep === 1) ||
              (selectedType === "firstservice" && currentStep === 2) ||
              (selectedType === "firstcustomer" && currentStep === 3) ||
              (selectedType === "customer" && currentStep === 2)
                ? "Kaydı Tamamla"
                : "Devam Et"}
            </button>
          </div>
        </div>
      )}
      <RegisterFooter />
    </div>
  );
};

export default Register;
