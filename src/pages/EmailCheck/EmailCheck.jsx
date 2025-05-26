/* eslint-disable react-hooks/exhaustive-deps */
import style from "./emailcheck.module.scss";
import { ButtonLoading } from "../../components";
import { useEffect, useState } from "react";
import { AcceptIcon, DeclineIcon } from "../../assets/icon";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";

const EmailCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");
  const codeParam = queryParams.get("code");

  useEffect(() => {
    if (status === "success" || status === "error") {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [status]);

  const checkEmail = (value) => {
    AxiosRequest("post", ApiRoutes.auh.checkEmail, {
      email: emailParam,
      code: codeParam,
    })
      .then(async (res) => {
        if (res.data === "success") {
          setStatus("success");
        }
      })
      .catch((err) => {
        setStatus("error");
      });
  };

  useEffect(() => {
    if (!emailParam || !codeParam) {
      setStatus("error");
    } else {
      checkEmail();
    }
  }, []);

  return (
    <div className={style.emailCheck}>
      <div
        className={`${style.card} ${
          status === "loading"
            ? style.loading
            : status === "success"
            ? style.success
            : status === "error"
            ? style.error
            : null
        }`}
      >
        {status === "loading" ? (
          <ButtonLoading />
        ) : status === "success" ? (
          <AcceptIcon />
        ) : (
          <DeclineIcon />
        )}
        <h5>
          {status === "loading"
            ? "Kontrol ediliyor..."
            : status === "success"
            ? "e-posta adresiniz başarıyla onaylandı. Giriş yapabilirsiniz"
            : "Kullandığınız link süresi geçmiş durumda. Lütfen yeni bir link oluşturun."}
        </h5>
      </div>
    </div>
  );
};

export default EmailCheck;
