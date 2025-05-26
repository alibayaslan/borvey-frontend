import React, { useEffect, useState } from "react";
import { verifyOtp } from "../redux/slices/otpSlice";
import { useSelector, useDispatch } from "react-redux";
import ActionButton from "../components/UI/ActionButton";
const OTP = () => {
  const dispatch = useDispatch();
  const email = window.location.pathname.split("/")[2];

  useEffect(() => {
    const form = document.getElementById("otp-form");
    const inputs = [...form.querySelectorAll("input[type=text]")];
    const submit = form.querySelector("button[type=submit]");

    const handleKeyDown = (e) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const index = inputs.indexOf(e.target);
        if (index > 0) {
          inputs[index - 1].value = "";
          inputs[index - 1].focus();
        }
      }
    };

    const handleInput = (e) => {
      const { target } = e;
      const index = inputs.indexOf(target);
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          submit.focus();
        }
      }
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.split("");
      inputs.forEach((input, index) => (input.value = digits[index]));
      submit.focus();
    };

    inputs.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("focus", handleFocus);
      input.addEventListener("paste", handlePaste);

      return () => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("keydown", handleKeyDown);
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("paste", handlePaste);
      };
    });
  }, []);

  const { otpSuccess, otpLoading, otpError } = useSelector(
    (state) => state.otp
  );

  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [fourthInput, setFourthInput] = useState("");

  const otp = firstInput + secondInput + thirdInput + fourthInput;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const otpData = { email, otp };
      await dispatch(verifyOtp({ otpData }));
    } catch (error) {
      window.alert("Hata!", "Lütfen tekrar deneyin!", "error");
    }
  };
  return (
    <div className="w-[80%] lg:w-[50%] my-8 mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">E-posta Doğrulama</h1>
        <p className="text-[15px] text-slate-500">
          E-posta adresinize gönderilen 4 haneli doğrulama kodunu girin.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleVerify}>
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            pattern="\d*"
            onChange={(e) => setFirstInput(e.target.value)}
            maxLength="1"
          />
          <input
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            maxLength="1"
            onChange={(e) => setSecondInput(e.target.value)}

          />
          <input
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            maxLength="1"
            onChange={(e) => setThirdInput(e.target.value)}

          />
          <input
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            maxLength="1"
            onChange={(e) => setFourthInput(e.target.value)}

          />
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <ActionButton
            success={otpSuccess}
            loading={otpLoading}
            error={otpError}
            path="/"
            message="Hesap doğrulandı"
            content="Hesabı onayla"
          />
        </div>
      </form>
    </div>
  );
};

export default OTP;
