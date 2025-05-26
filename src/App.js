/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./layout/layout";

import { useSelector, useDispatch } from "react-redux";
import Loader from "./partials/Loader";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes/index";
import { Navbar, Footer } from "./components";
import moment from "moment";
import "moment/locale/tr";

import {
  HomeScreen,
  About,
  Cookies,
  Help,
  Contact,
  Login,
  Register,
  ForgotPassword,
  EmailCheck,
} from "./pages";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function Protected({ children }) {
  const { user } = useSelector((state) => state.users);
  return children;
}

const isHiddenPaths = [
  "/login",
  "/dashboard",
  "/ilanlar",
  "/yorumlar",
  "/ilan",
  "/islerim",
  "/kayit-ol",
  "/firma-bilgileri",
  "/is-ekle",
  "/is-duzenle",
  "/mesaj",
  "/ilanlarim",
  "/teklifler",
  "/profil",
  "/guvenlik",
  "/yeni-ilan",
  "/ilan-duzenle",
  "/tekliflerim",
];

const AppContent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const location = useLocation();

  const currentPathSegment = `/${location.pathname.split("/")[1]}`;

  const [isOpenRegister, setOpenRegister] = useState(false);
  const [isOpenSignin, setOpenSignin] = useState(false);

  moment.locale("tr");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          {!isHiddenPaths.includes(currentPathSegment) && (
            <Navbar
              isOpen={isOpenSignin}
              setOpen={setOpenSignin}
              loading={loading}
              userInfo={userInfo}
            />
          )}

          <Routes>
            <Route
              index
              path="/"
              exact
              element={
                <HomeScreen
                  setOpenRegister={setOpenRegister}
                  isOpenRegister={isOpenRegister}
                />
              }
            />
            <Route
              index
              path="*"
              exact
              element={
                <HomeScreen
                  setOpenRegister={setOpenRegister}
                  isOpenRegister={isOpenRegister}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/email-onay" element={<EmailCheck />} />
            <Route path="/sifre-yenile" element={<ForgotPassword />} />
            <Route path="/hesabi-aktive-et" element={<EmailCheck />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kayit-ol" element={<Register />} />
            <Route element={<Layout />}>
              {routes.map((route, index) => {
                const { path, component: Component } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    exact={true}
                    element={
                      <Suspense fallback={<Loader />}>
                        <ProtectedRoute>
                          <Component />
                        </ProtectedRoute>
                      </Suspense>
                    }
                  />
                );
              })}
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>

          {!isHiddenPaths.includes(currentPathSegment) && <Footer />}
        </>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
