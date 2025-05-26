/* eslint-disable no-unused-vars */
import { lazy } from "react";

import {
  MyPosts,
  BrowsePosts,
  Comments,
  PostDetail,
  MyWorks,
  FirmSettings,
  NewWork,
  Message,
  Offers,
  Profile,
  Security,
  NewPost,
  MyOffers,
} from "../pages";

// const PastServices = lazy(() => import("../pages/User/PastServices"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Company = lazy(() => import("../pages/User/Company"));
// const ActiveServices = lazy(() => import("../pages/User/ActiveServices"));
// const ServiceDetails = lazy(() => import("../pages/User/ServiceDetails"));
// const ServiceDetailsEdit = lazy(() =>
//   import("../pages/User/ServiceDetailsEdit")
// );
// const DemandList = lazy(() => import("../pages/User/DemandList"));
// const DemandDetails = lazy(() => import("../pages/User/DemandDetails"));
// // const Message = lazy(() => import("../pages/User/Message"));
// const Chat = lazy(() => import("../pages/User/ChatDetails"));

const routes = [
  {
    path: "/guvenlik",
    title: "Güvenlik & Şifre",
    component: Security,
  },
  {
    path: "/profil",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/teklifler",
    title: "Teklifler",
    component: Offers,
  },
  {
    path: "/ilanlarim",
    title: "İlanlarım",
    component: MyPosts,
  },
  {
    path: "/mesaj",
    title: "Message",
    component: Message,
  },
  {
    path: "/tekliflerim",
    title: "Tekliflerim",
    component: MyOffers,
  },
  // {
  //   path: "/is-ekle",
  //   title: "İş Ekle",
  //   component: NewWork,
  // },
  {
    path: "/is-duzenle/:id",
    title: "İş Düzenle",
    component: NewWork,
  },
  {
    path: "/firma-bilgileri",
    title: "Firma Bilgileri",
    component: FirmSettings,
  },
  // {
  //   path: "/islerim",
  //   title: "İşlerim",
  //   component: MyWorks,
  // },
  {
    path: "/ilanlar",
    title: "İlanlar",
    component: BrowsePosts,
  },
  {
    path: "/yorumlar",
    title: "Yorumlar",
    component: Comments,
  },
  {
    path: "/ilan/:id",
    title: "İlan Detay",
    component: PostDetail,
  },
  {
    path: "/yeni-ilan",
    title: "Yeni İlan",
    component: NewPost,
  },
  {
    path: "/ilan-duzenle/:id",
    title: "İlan Duzenle",
    component: NewPost,
  },
];

export default routes;
