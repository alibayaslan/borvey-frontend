/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { helpData } from "../../utils/helpData";
import { Link } from "react-router-dom";
import style from "./help.module.scss";
import { FaqArrowIcon, SearchIcon } from "../../assets/icon";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { Helmet } from "react-helmet";

// const Help = () => {
//   return (
//     <section className="nav-container">
//       <div>
//         <div className="container">
//           <div className="about-us-flex-container justify-center flex-col ">
//             <div className="about-us-text justify-center text-center">
//               <div className="about-us-text-top text-[#FF9A00]">
//                 Yardıma mı ihtiyacınız var?
//               </div>
//               <div className="about-us-text-header">
//                 Tüm Sorularınızın Yanıtları
//               </div>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//               {helpData?.map((item) => {
//                 return (
//                   <div className="w-[100%] flex-1 p-4 rounded-md bg-[#FFF5E5] text-left justify-start items-start flex flex-col">
//                     <div className="flex items-center justify-center rounded-full mb-2 bg-[#E6E8E5] w-[40px] h-[40px]">
//                       <i className="fa-solid fa-circle-info text-[#006EDF]"></i>
//                     </div>
//                     <div className="text-[22px]">{item?.title}</div>
//                     <div className="text-[#383E42] text-[14px] flex-1 pt-4">
//                       {item?.description}
//                     </div>
//                     <div className="mt-[20px]">
//                       <Link to={`/help/${item?.id}`} className="text-[#006EDF]">
//                         Daha fazla bilgi edin{" "}
//                         <i className="fa-solid fa-caret-right ml-[15px]"></i>
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Help = () => {
  const [isOpen, setOpen] = useState([]);
  const [data, setData] = useState();

  const getHomeData = () => {
    AxiosRequest("post", ApiRoutes.website.getHome)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHomeData();
  }, []);
  return (
    <>
      {data ? (
        <Helmet>
          <title>{data.SEO.faq.title}</title>
          <meta
            name="description"
            content={data.SEO.faq.description}
            data-react-helmet="true"
          />
          <meta
            name="keywords"
            content={data.SEO.faq.tags}
            data-react-helmet="true"
          />
        </Helmet>
      ) : null}
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.top}>
            <h1>Merhaba! Size nasıl yardımcı olabiliriz?</h1>
            <div className={style.inputWrapper}>
              <SearchIcon />
              <input type="text" placeholder="Arama" />
            </div>
          </div>
          <div className={style.cardWrapper}>
            {helpData.map((item, index) => {
              const isInclude = isOpen.includes(index);
              return (
                <div
                  className={`${style.card} ${isInclude ? style.open : null}`}
                >
                  <div
                    onClick={() => {
                      if (isInclude) {
                        setOpen(isOpen.filter((i) => i !== index));
                      } else {
                        setOpen([...isOpen, index]);
                      }
                    }}
                    className={style.titleWrapper}
                  >
                    <h5>{item.title}</h5>
                    <button>
                      <FaqArrowIcon />
                    </button>
                  </div>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
