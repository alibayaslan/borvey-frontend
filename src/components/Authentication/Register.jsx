import logo from "../../assets/images/logo.png";
import { registerUser } from "../../redux/slices/authSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionButton from "../UI/ActionButton";

const Register = ({ setOpenSignIn, setOpenRegister }) => {
  const handleToggle = () => {
    setOpenSignIn(true);
    setOpenRegister(false);
  };

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { registerSuccess, registerLoading, registerError } = useSelector(
    (state) => state.auth
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Parolalar uyuşmuyor");
      return;
    }

    try {
      const userData = { fullName, email, type: Number(type), password };
      await dispatch(registerUser({ userData }));
      setOpenRegister(false);
    } catch (error) {
      window.alert("Hata!", "Lütfen tekrar deneyin!", "error");
    }
  };

  return (
    <div>
      <div className="modal-login2">
        <div className="x-mark" onClick={() => setOpenRegister(false)}>
          <i className="fa-solid fa-xmark" aria-label="Kapat"></i>
        </div>
        <div className="sign-column-logo">
          <div className="logo-align">
            <img src={logo} alt="Borvey Logo" />
          </div>
          <div className="sign-alt-text cursor-pointer" onClick={handleToggle}>
            Zaten hesabınız var mı?{" "}
            <br />
            <a
              className="login-s"
              aria-label="Hesabınız varsa buradan giriş yapın"
            >
              Buradan giriş yapın
            </a>
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
                <form className="input-container" onSubmit={handleRegister}>
                  <input
                    type="text"
                    required
                    placeholder="Ad ve soyadınızı girin"
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    aria-label="Ad ve soyad"
                  />
                  <input
                    type="email"
                    required
                    placeholder="E-postanızı giriniz"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    aria-label="E-posta adresi"
                  />
                  <select
                    required
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    aria-label="Üyelik türü"
                  >
                    <option value="">Üyelik Türü</option>
                    <option value="1">Yük ara</option>
                    <option value="2">Nakliyeci Ara</option>
                  </select>

                  <input
                    type="password"
                    required
                    placeholder="Şifre (en az 8 karakter)"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    aria-label="Şifre"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Şifreyi Onayla"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    aria-label="Şifreyi onayla"
                  />
                  <div className="checkbox-container-s">
                    <div>
                      <input type="checkbox" id="k" name="" value="" />
                    </div>
                    <div>
                      <label>
                        Kullanım Koşullarını ve Gizlilik Politikasını kabul
                        ediyorum.
                      </label>
                    </div>
                  </div>
                  <ActionButton
                    success={registerSuccess}
                    loading={registerLoading}
                    error={registerError}
                    path={`/verification/${email}`}
                    message="Kayıt işleminiz başarıyla tamamlandı. Lütfen e-posta adresinizi kontrol edin."
                    content="Kayıt Ol"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
