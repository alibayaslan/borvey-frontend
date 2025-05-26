/* eslint-disable react-hooks/exhaustive-deps */
import style from "./myworks.module.scss";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  TransportTypeIcon,
} from "../../assets/icon";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { TypeText } from "../../utils/TypeText";
import { PopupQuestion } from "../../components";
import { useNavigate } from "react-router-dom";

const WorkCard = ({ item, deleteClick, editClick }) => {
  return (
    <div className={style.workCard}>
      <div className={style.top}>
        <div className={style.info}>
          <div className={style.title}>
            <TransportTypeIcon type={item.type} />
            <h6>{TypeText(item.type)} Hizmeti Yapıyorum</h6>
          </div>
        </div>

        <div className={style.buttonWrapper}>
          <button onClick={editClick}>
            <EditIcon /> Düzenle
          </button>
          <button onClick={deleteClick}>
            <DeleteIcon /> Sil
          </button>
        </div>
      </div>

      <div className={style.bottom}>
        <div className={style.infoBadge}>
          <h6>İl</h6>
          <p>{item.city}</p>
        </div>
        <div className={style.infoBadge}>
          <h6>İlçe</h6>
          <p>{item.district}</p>
        </div>
        <div className={style.infoBadge}>
          <h6>Mahalle</h6>
          <p>{item.street}</p>
        </div>
        <div className={style.infoBadge}>
          <h6>Adres</h6>
          <p>{item.address}</p>
        </div>
      </div>
    </div>
  );
};

const MyWorks = () => {
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const userInfo = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [isPopup, setPopup] = useState();

  const getWorks = (value) => {
    AxiosRequest("post", ApiRoutes.user.getWorks, {
      userId: userInfo._id,
    })
      .then(async (res) => {
        console.log("data", res.data);
        setData(res.data);
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const deleteWork = (id) => {
    AxiosRequest("post", ApiRoutes.user.deleteWork, {
      userId: userInfo._id,
      workId: id,
    })
      .then(async (res) => {
        getWorks();
        setPopup();
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    getWorks();
  }, []);

  return (
    <>
      {isPopup ? (
        <PopupQuestion
          question={"İşi silmek istediğinize emin misiniz?"}
          acceptTitle={"Sil"}
          declineTitle={"İptal"}
          decline={() => setPopup()}
          accept={() => {
            deleteWork(isPopup);
          }}
        />
      ) : null}
      {isLoad ? null : data && data.length ? (
        <div className={style.wrapper}>
          <a className={style.mainButton} href="/is-ekle">
            <div className={style.iconWrapper}>
              <PlusIcon />
            </div>
            Yeni İş Ekle
          </a>
          <div className={style.workWrapper}>
            {data.reverse().map((item) => {
              return (
                <WorkCard
                  editClick={() => navigate(`/is-duzenle/${item._id}`)}
                  deleteClick={() => setPopup(item._id)}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h5>Kayıtlı iş bulunmamaktadır</h5>
      )}
    </>
  );
};

export default MyWorks;
