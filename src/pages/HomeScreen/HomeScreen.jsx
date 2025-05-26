import React, { useEffect, useState } from "react";

import {
  Hero,
  ServiceCategories,
  LatestCompany,
  InfoCard,
  FeaturedAdverts,
  HowItWorks,
  TwoCard,
  DownloadAppCard,
} from "../../components";
import { HomeLight } from "../../assets/icon";
import style from "./homescreen.module.scss";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { Helmet } from "react-helmet";

const HomeLightComp = () => {
  return (
    <div className={style.lightWrapper}>
      {[...new Array(4)].map((item, index) => {
        return <HomeLight index={index} />;
      })}
    </div>
  );
};

const HomeScreen = ({ isOpenRegister, setOpenRegister }) => {
  const [data, setData] = useState();

  const getHomeData = () => {
    AxiosRequest("post", ApiRoutes.website.getHome)
      .then((res) => {
        setData(res?.data);
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
          <title>{data.SEO.homepage.title}</title>
          <meta
            name="description"
            content={data.SEO.homepage.description}
            data-react-helmet="true"
          />
          <meta
            name="keywords"
            content={data.SEO.homepage.tags}
            data-react-helmet="true"
          />
        </Helmet>
      ) : null}
      <div className={style.home}>
        <HomeLightComp />
        <Hero isOpen={isOpenRegister} setOpen={setOpenRegister} />
        <ServiceCategories
          isOpenRegister={isOpenRegister}
          setOpenRegister={setOpenRegister}
        />
        {data && data.firms && data.firms.length ? (
          <LatestCompany data={data.firms} />
        ) : null}
        <InfoCard />
        {data && data.posts && data.posts.length ? (
          <FeaturedAdverts data={data?.posts} />
        ) : null}
        <HowItWorks />
        <TwoCard />
        <DownloadAppCard />
        {/* <Testimontial /> */}
      </div>
    </>
  );
};

export default HomeScreen;
