/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FirmForm } from "../../components";
import style from "./firmsettings.module.scss";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useSelector } from "react-redux";

const FirmSettings = () => {
  const [isLoad, setLoad] = useState();
  const [data, setData] = useState();
  const userInfo = useSelector((state) => state.user);

  const getUser = (value) => {
    AxiosRequest("post", ApiRoutes.user.getUser, {
      userId: userInfo._id,
    })
      .then(async (res) => {
        setData({
          firm: res.data.firm,
          firmImages: res.data.firmImages,
        });
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("data", data);
  return (
    <div>
      {data ? (
        <FirmForm edit data={data} setFormData={(e) => console.log("e")} />
      ) : null}
    </div>
  );
};

export default FirmSettings;
