/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { WorkForm } from "../../components";
import { useEffect, useState } from "react";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const NewWork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];
  const currentId = location.pathname.split("/")[2];
  const [isLoad, setLoad] = useState(false);
  const [transportType, setTransportType] = useState();
  const [data, setData] = useState();
  const userInfo = useSelector((state) => state.user);

  const getWorks = (value) => {
    AxiosRequest("post", ApiRoutes.user.getWorks, {
      userId: userInfo._id,
    })
      .then(async (res) => {
        if (res.data && res.data.length) {
          const findWork = await res.data.filter((i) => i._id === currentId);
          await setData(findWork[0]);
          await setTransportType(findWork[0].type);
        }
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const createWork = (value) => {
    AxiosRequest("post", ApiRoutes.user.createWork, {
      userId: userInfo._id,
      works: {
        ...value,
        type: transportType,
      },
    })
      .then(async (res) => {
        navigate("/islerim");
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const editWork = (value) => {
    AxiosRequest("post", ApiRoutes.user.editWork, {
      userId: userInfo._id,
      workId: currentId,
      type: transportType,
      ...value,
    })
      .then(async (res) => {
        navigate("/islerim");
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    if (currentLocation === "is-duzenle") {
      getWorks();
    }
  }, [currentLocation]);

  return (
    <div>
      {currentLocation === "is-duzenle" && data ? (
        <WorkForm
          edit
          isEdit={currentLocation === "is-duzenle"}
          workData={data}
          changeType={(e) => setTransportType(e)}
          changeData={(e) => {
            if (transportType) {
              if (currentLocation === "is-duzenle") {
                editWork(e);
              } else {
                createWork(e);
              }
            }
          }}
        />
      ) : currentLocation === "is-duzenle" && !data ? null : (
        <WorkForm
          edit
          isEdit={currentLocation === "is-duzenle"}
          workData={data}
          changeType={(e) => setTransportType(e)}
          changeData={(e) => {
            if (transportType) {
              if (currentLocation === "is-duzenle") {
                editWork(e);
              } else {
                createWork(e);
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default NewWork;
