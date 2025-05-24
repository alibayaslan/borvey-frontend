import logo from "../../assets/images/logo.png";
import { loginUser } from "../../redux/slices/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ActionButton from "../UI/ActionButton";
import swal from "sweetalert";
const Signin = ({ setOpenSignIn, setOpenRegister }) => {
  const handleToggle = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loginSuccess, loginLoading, loginError } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      await dispatch(loginUser({ userData }));
    } catch (error) {
      swal("Hata!", "Lütfen tekrar deneyin!", "error");
      console.error(error);
    }
  };
  return (
    <div>
      <div className="modal-login">
        <div className="x-mark" onClick={() => setOpenSignIn(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="sign-column-logo">
          <div className="logo-align">
            <img src={logo} alt="logo" />
          </div>
          <div className="sign-alt-text cursor-pointer" onClick={handleToggle}>
            Üyeliğiniz yok mu?<a className="login-p"> Buradan kayıt olun</a>
          </div>
        </div>

      
        <div className="login-form-container">
          <div className="sign-column s1">
            <div className="sign-column-face s2">
              <div className="s3">
                <div className="slice-container">
                  <div className="slice-text-c">
                    <div className="slicer"></div>
                  </div>
                </div>
                <form className="input-container" onSubmit={handleLogin}>
                  <input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-postanızı giriniz"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Şifreniz"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Link to="/forgot-password" onClick={() => setOpenSignIn(false)} className="text-left text-orange-500 bg-white">
                  Parolanızı mı unuttunuz?{" "}
                  </Link>
                  <ActionButton
                    success={loginSuccess}
                    loading={loginLoading}
                    error={loginError}
                    path={`/order-list`}
                    message="Başarılı bir şekilde girdiniz"
                    content="Giriş yap"
                  />{" "}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
