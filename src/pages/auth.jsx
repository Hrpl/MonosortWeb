import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/logo.svg";
import "../styles/auth.css";
import axios from "axios";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const phoneSchema = yup.string().required("Введите номер телефона").test(
  "is-valid-phone",
  "Введите корректный номер телефона",
  (value) => {
    const digits = value.replace(/\D/g, "");
    return /^7\d{10}$/.test(digits);
  }
);

const codeSchema = yup.string().required("Введите код").matches(/^\d{4}$/, "Введите 4-значный код");

const sendPhone = (phoneNumber) => axios.post("https://monosortcoffee.ru/user", { phoneNumber });
const generateCode = (phoneNumber) => axios.post("https://monosortcoffee.ru/user/generate/code", { phoneNumber });
const sendCode = (phoneNumber, code) => axios.post("https://monosortcoffee.ru/user/checkCode", { phoneNumber, code });

const AuthPage = () => {
	const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("phone");
  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);

  const code = codeDigits.join("");

	const jwt = localStorage.getItem('accessToken');

	React.useEffect(() => {
    if(jwt !== null){
      navigate('/');
    }
  }, [jwt]);

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
    setError("");
  };

  const handleDigitChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newDigits = [...codeDigits];
    newDigits[idx] = val;
    setCodeDigits(newDigits);
    setError("");
    if (val && idx < 3) {
      const next = document.getElementById(`otp-digit-${idx + 1}`);
      if (next) next.focus();
    }
  };

  const handleDigitKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !codeDigits[idx] && idx > 0) {
      const prev = document.getElementById(`otp-digit-${idx - 1}`);
      if (prev) prev.focus();
    }
  };

  const handleBack = () => {
    setStep("phone");
    setPhoneNumber("");
    setCodeDigits(["", "", "", ""]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "phone") {
      try {
        await phoneSchema.validate(phoneNumber);
        setLoading(true);
        setError("");
        await sendPhone(phoneNumber);
        await generateCode(phoneNumber);
        setStep("code");
      } catch (err) {
        setError(err.message || "Ошибка при отправке запроса");
      } finally {
        setLoading(false);
      }
    } else if (step === "code") {
      try {
        await codeSchema.validate(code);
        setLoading(true);
        setError("");
        const response = await sendCode(phoneNumber, code);
        if (response.data && response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('expires', response.data.expires);
        }
      } catch (err) {
        setError(err.message || "Неверный код подтверждения");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth__wrapper">
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <img className="auth__logo" src={logo} alt="МоноСорт" />
        <form onSubmit={handleSubmit}>
          {step === "phone" ? (
            <>
              <label className="auth__label" htmlFor="tel">Номер телефона</label>
              <InputMask
                id="tel"
                mask="+7 (999) 999-99-99"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maskChar={"_"}
                alwaysShowMask={true}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    className="auth__input"
                    required
                    autoFocus
                    placeholder="+7 (___) ___-__-__"
                  />
                )}
              </InputMask>
              <button
                type="submit"
                disabled={loading}
                className="auth__button auth__button--wide"
              >
                {loading ? "Отправка..." : "Войти"}
              </button>
            </>
          ) : (
            <>
              <label className="auth__label" htmlFor="code">Введите код подтверждения</label>
              <div className="auth__otp-container">
                <div className="auth__otp-digits">
                  {codeDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-digit-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className={`auth__otp-digit${!error ? ' auth__otp-digit--success' : ''}`}
                      value={digit}
                      onChange={e => handleDigitChange(idx, e.target.value)}
                      onKeyDown={e => handleDigitKeyDown(idx, e)}
                      required
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              </div>
              <div className="auth__code-btns">
                <button
                  type="button"
                  onClick={handleBack}
                  className="auth__button auth__button--back"
                >
                  Назад
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="auth__button auth__button--confirm"
                >
                  {loading ? "Отправка..." : "Подтвердить"}
                </button>
              </div>
            </>
          )}
          {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
        </form>
      </Box>
    </div>
  );
};

export default AuthPage;
