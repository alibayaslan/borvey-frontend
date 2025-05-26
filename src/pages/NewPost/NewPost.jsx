/* eslint-disable react-hooks/exhaustive-deps */
import style from "./newwork.module.scss";
import {
  DescriptionForm,
  DestinationForm,
  SelectionCardForm,
  TransportType,
} from "../../components";
import { useRef, useState, useEffect } from "react";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NewPost = () => {
  const location = useLocation();
  const currentId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const userInfo = useSelector((state) => state.user);
  const fromAddressRef = useRef();
  const toAddressRef = useRef();
  const infoRef = useRef();

  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    type: "",
    questions: {
      question: "",
      answer: "",
    },
    title: "",
    address: {
      from: {
        city: "",
        district: "",
      },
      to: {
        city: "",
        district: "",
      },
    },
    additionalInfo: "",
  });

  const handleChange = (e) => {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        address: {
          ...prevData.address,
          [e.type]: e.item,
        },
      };

      // Hem "from" hem de "to" adres bilgileri doluysa otomatik olarak bir sonraki adıma geç
      const fromComplete =
        updatedData.address.from.city && updatedData.address.from.district;

      const toComplete =
        updatedData.address.to.city && updatedData.address.to.district;

      if (fromComplete && toComplete && step !== 3) {
        setStep((prevStep) => prevStep + 1);
      }
      return updatedData;
    });
  };

  const handleNextStep = () => {
    if (step === 0 && data.type) {
      setStep(step + 1);
    } else if (step === 1 && data.questions.question && data.questions.answer) {
      setStep(step + 1);
    } else if (step === 2) {
      fromAddressRef.current.handleSubmit();
      toAddressRef.current.handleSubmit();
    } else if (step === 3) {
      infoRef.current.handleSubmit();
      const { title, additionalInfo } = data;

      if (title && additionalInfo) {
        // Eğer title ve additionalInfo doluysa createPost çağır
        if (currentId) {
          editPost({
            ...data,
            ...infoRef.current.values,
          });
        } else {
          createPost();
        }
      }
    }
  };

  const handleStepChange = (newStep) => {
    setData((prevData) => {
      // Geri adımda ilgili step verisini temizle
      let updatedData = { ...prevData };

      if (newStep < step) {
        if (step === 1) {
          updatedData.type = "";
        } else if (step === 2) {
          updatedData.questions = { question: "", answer: "" };
        } else if (step === 3) {
          updatedData.address = {
            from: { city: "", district: "" },
            to: { city: "", district: "" },
          };
        } else if (step === 4) {
          updatedData.additionalInfo = "";
          updatedData.title = "";
        }
      }

      return updatedData;
    });
    setStep(newStep);
  };

  const createPost = () => {
    setLoad(true);
    AxiosRequest("post", ApiRoutes.post.createPost, {
      userId: userInfo._id,
      ...data,
      questions: [
        {
          ...data.questions,
        },
      ],
    })
      .then(async (res) => {
        setLoad(false);
        navigate("/ilanlarim");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setLoad(false);
        }
      });
  };

  const editPost = (data) => {
    AxiosRequest("post", ApiRoutes.post.editPost, {
      postId: currentId,
      ...data,
      questions: [
        {
          ...data.questions,
        },
      ],
    })
      .then(async (res) => {
        setLoad(false);
        navigate("/ilanlarim");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setLoad(false);
        }
      });
  };

  const getPostDetail = (id) => {
    AxiosRequest("post", ApiRoutes.post.getPost, {
      postId: id,
    })
      .then(async (res) => {
        // setData(res.data);
        if (res.data) {
          setData({
            type: res.data.type,
            title: res.data.title,
            questions: {
              question: res.data.questions[0].question,
              answer: res.data.questions[0].answer,
            },
            address: {
              from: {
                city: res.data.address.from.city,
                district: res.data.address.from.district,
              },
              to: {
                city: res.data.address.to.city,
                district: res.data.address.to.district,
              },
            },
            additionalInfo: res.data.additionalInfo,
          });
        }
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };
  useEffect(() => {
    if (currentId) {
      getPostDetail(currentId);
    } else {
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    if (step > 3) {
      setStep(3);
    }
  }, [step]);

  console.log("data", data);
  return (
    <>
      {isLoad ? null : (
        <div className={style.wrapper}>
          {step === 0 ? (
            <TransportType
              height
              changeType={(e) =>
                setData((prevData) => ({ ...prevData, type: e }))
              }
              value={data.type}
            />
          ) : step === 1 ? (
            <SelectionCardForm
              select={(e) =>
                setData((prevData) => ({ ...prevData, questions: e }))
              }
              dashboard
              transportType={data.type}
              value={data.questions}
            />
          ) : step === 2 ? (
            <DestinationForm
              fromAddressRef={fromAddressRef}
              toAddressRef={toAddressRef}
              dashboard
              handleChange={handleChange}
              value={data.address}
            />
          ) : step === 3 ? (
            <DescriptionForm
              ref={infoRef}
              handleChange={(e) =>
                setData((prevData) => ({ ...prevData, ...e }))
              }
              value={{
                title: data.title,
                additionalInfo: data.additionalInfo,
              }}
            />
          ) : null}

          <div
            style={{
              justifyContent: step > 0 ? "space-between" : "flex-end",
            }}
            className={style.buttonWrapper}
          >
            {step > 0 && (
              <button
                onClick={() => {
                  if (step > 0) {
                    handleStepChange(step - 1);
                  }
                }}
                className={style.back}
              >
                Geri
              </button>
            )}
            <button onClick={handleNextStep} className={style.mainButton}>
              {isLoad
                ? "Yükleniyor..."
                : step === 3 && !currentId
                ? "İlan Aç"
                : step === 3 && currentId
                ? "İlanı Düzenle"
                : "Devam Et"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
