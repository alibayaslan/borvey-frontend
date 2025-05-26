/* eslint-disable react-hooks/exhaustive-deps */
import style from "./browsepost.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserPostCard } from "../../components";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { TypeText } from "../../utils/TypeText";
import { CloseIcon, TransportTypeIcon } from "../../assets/icon";
import { CityData } from "../../utils/CityData";
import useWindowDimensions from "../../utils/windowWidth";

const FilterBar = ({ current, change, resetClick }) => {
  const typeData = [
    {
      title: TypeText("home"),
      icon: <TransportTypeIcon type={"home"} />,
      value: "home",
    },
    {
      title: TypeText("single"),
      icon: <TransportTypeIcon type={"single"} />,
      value: "single",
    },
    {
      title: TypeText("office"),
      icon: <TransportTypeIcon type={"office"} />,
      value: "office",
    },
    {
      title: TypeText("short"),
      icon: <TransportTypeIcon type={"short"} />,
      value: "short",
    },
  ];
  return (
    <div className={style.filterBar}>
      <div className={style.container}>
        <h5>Nakliyat Tipi</h5>
        <div className={style.selectionWrapper}>
          {typeData.map((item) => {
            return (
              <div
                className={`${style.selection} ${
                  current.type.includes(item.value)
                    ? style.activeSelection
                    : null
                }`}
                onClick={() =>
                  change({
                    item: item.value,
                    type: "type",
                  })
                }
              >
                <div className={style.square} />
                <p>
                  <span>{item.icon}</span> {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.container}>
        <h5>Alınacak Adres</h5>
        <div className={`${style.selectionWrapper} ${style.overflowContainer}`}>
          {CityData.map((item) => {
            return (
              <div
                className={`${style.selection} ${
                  current.address.from.includes(item.il_adi)
                    ? style.activeSelection
                    : null
                }`}
                onClick={() =>
                  change({
                    item: item.il_adi,
                    type: "fromAddress",
                  })
                }
              >
                <div className={style.square} />
                <p>{item.il_adi}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.container}>
        <h5>Teslim Edilecek Adres</h5>
        <div className={`${style.selectionWrapper} ${style.overflowContainer}`}>
          {CityData.map((item) => {
            return (
              <div
                className={`${style.selection} ${
                  current.address.to.includes(item.il_adi)
                    ? style.activeSelection
                    : null
                }`}
                onClick={() =>
                  change({
                    item: item.il_adi,
                    type: "toAddress",
                  })
                }
              >
                <div className={style.square} />
                <p>{item.il_adi}</p>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={() => resetClick()} className={style.resetButton}>
        Filtreyi Resetle
      </button>
    </div>
  );
};

const BrowsePosts = () => {
  const { width } = useWindowDimensions();
  const defaultCurrent = {
    type: ["home", "single", "office", "short"],
    address: {
      from: [],
      to: [],
    },
  };

  const [isLoad, setLoad] = useState(true);
  const userInfo = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [current, setCurrent] = useState(defaultCurrent);
  const [isFilter, setFilter] = useState(false);
  const [offerList, setOfferlist] = useState();

  const getPostData = (value) => {
    AxiosRequest("post", ApiRoutes.post.getPostForService, {
      userId: userInfo._id,
    })
      .then(async (res) => {
        console.log("data", res.data);
        setData(res.data.reverse());
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const getOfferList = (value) => {
    AxiosRequest("post", ApiRoutes.offer.getOfferList, {
      userId: userInfo._id,
      type: "service",
    })
      .then(async (res) => {
        setOfferlist(res.data);
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    getPostData();
    getOfferList();
  }, []);

  useEffect(() => {
    if (data && data.length && offerList && offerList.length) {
      const changeData = data.map((item) => {
        return {
          ...item,
          isOffered: item.offers.some((element) =>
            offerList.map((i) => i._id).includes(element)
          ),
        };
      });

      setData(changeData);
    }
  }, [offerList, data]);

  const filteredData =
    data && data.length
      ? data.filter((item) => {
          // Nakliyat tipi filtresi
          const typeMatch = current.type.includes(item.type);

          // Alınacak adres filtresi
          const fromAddressMatch =
            current.address.from.length === 0 ||
            current.address.from.includes(item.address.from.city);

          // Teslim edilecek adres filtresi
          const toAddressMatch =
            current.address.to.length === 0 ||
            current.address.to.includes(item.address.to.city);

          return typeMatch && fromAddressMatch && toAddressMatch;
        })
      : [];

  return (
    <>
      {isLoad ? null : (
        <div className={style.wrapper}>
          {isFilter || width > 960 ? (
            <div className={style.barWrapper}>
              {width < 960 ? (
                <div className={style.barTitle}>
                  <h4>Filtre</h4>
                  <button onClick={() => setFilter(false)}>
                    <CloseIcon />
                  </button>
                </div>
              ) : null}
              <FilterBar
                resetClick={() => setCurrent(defaultCurrent)}
                change={(e) => {
                  if (e.type === "type") {
                    setCurrent({
                      ...current,
                      type: current.type.includes(e.item)
                        ? current.type.filter((i) => i !== e.item)
                        : [...current.type, e.item],
                    });
                  } else if (e.type === "fromAddress") {
                    setCurrent({
                      ...current,
                      address: {
                        ...current.address,
                        from: current.address.from.includes(e.item)
                          ? current.address.from.filter((i) => i !== e.item)
                          : [...current.address.from, e.item],
                      },
                    });
                  } else {
                    setCurrent({
                      ...current,
                      address: {
                        ...current.address,
                        to: current.address.to.includes(e.item)
                          ? current.address.to.filter((i) => i !== e.item)
                          : [...current.address.to, e.item],
                      },
                    });
                  }
                }}
                current={current}
              />
            </div>
          ) : null}
          <div className={style.content}>
            <div className={style.titleWrapper}>
              <h1>Son İlanlar</h1>
              {width < 960 ? (
                <button
                  onClick={() => setFilter(true)}
                  className={style.filterButton}
                >
                  Filtre
                </button>
              ) : null}
            </div>
            <div className={style.cardWrapper}>
              {data && data.length ? (
                filteredData.map((item) => {
                  return <UserPostCard data={item} />;
                })
              ) : (
                <h5>Hiç ilan bulunamadı</h5>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrowsePosts;
