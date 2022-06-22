import React, { useState, useEffect } from "react";
import "./Otp.css";
import Logo from "../../assets/image3.png";
import OTPInput from "otp-input-react";
import { saveCookie } from "../../utilites/cookie-helper";
import { LMS_PARTNER_CODE } from "../../constants";
import { getVerifyOtp, getResentOtp } from "../../services/lms-services";
import { getWorkFLow } from "../../workflow/workflow";
import { getCookie } from "../../utilites/cookie-helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Otp() {
  const [OTP, setOTP] = useState("");
  const [counter, setCounter] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const generateOtp = (e) => {
    e.preventDefault();
    const getOTP = getCookie("otp");
    let otpGen = {
      msisdn: getOTP,
      partner_code: LMS_PARTNER_CODE,
      purpose: "customer_verification",
      otp: OTP,
    };
    getVerifyOtp(otpGen).then((res) => {
      if (res.data.code === 5002) {
        toast.error(res.data.message, {
          theme: "colored",
        });
      } else {
        toast.success(res.data.message, {
          theme: "colored",
        });
        targetAPI();
      }
    });
  };

  const resentOtp = () => {
    if (counter === 0) {
      setCounter(29);
    }
    const getOTP = getCookie("otp");
    let otpResent = {
      msisdn: getOTP,
      partner_code: LMS_PARTNER_CODE,
      purpose: "customer_verification",
    };
    getResentOtp(otpResent).then((res) => {
      toast.warning(res.data.message);
    });
  };
  const targetAPI = () => {
    console.log("name");
    const getOTP = getCookie("otp");
    let targetAPI = {
      msisdn: getOTP,
      partner_code: "yabxdemo_in",
      product_type: "BulletLoan",
      workflow_name: "Mother Workflow",
    };
    getWorkFLow(targetAPI).then((res) => {
      saveCookie("UUID", res.data.data.uuid);

      if (res.data.data.actions[0].action === "consumer_app_journey") {
        navigate("/consumer-app-journey");
      }

      if (res.data.data.actions[0].action === "choose_loan_journey") {
        navigate("/loan-journey");
      }
    });
  };

  return (
    <div className="otp__wrapper">
      <div className="otp__background">
        <div className="otp__login__wrappers">
          <div className="otp__login__wrapper">
            <img src={Logo} className="logo" alt="logo" />
            <div className="otp__login">
              <form className="otp__form" onSubmit={generateOtp}>
                <h1>Welcome User</h1>
                <p>The OTP has sent to - </p>
                <div className="otp__gen">
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    inputStyles={{
                      border: "1.5px solid #CCCCCC",
                      borderRadius: "6px",
                      fontSize: "12px",
                      textAlign: "center",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "rgb(115, 15, 255)",
                      outlineColor: "#EB6E7F",
                    }}
                  />
                </div>
                <p>
                  Haven't received code yet ?{" "}
                  {counter === 0 ? (
                    <>
                      <button
                        onClick={resentOtp}
                        className="otp__resend__button"
                      >
                        Resend
                      </button>
                    </>
                  ) : (
                    <span className="otp__counter">Resent in 00:{counter}</span>
                  )}
                </p>

                <div>
                  {OTP.length === 6 ? (
                    <button type="submit">send</button>
                  ) : (
                    <button type="submit" disabled>
                      send
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
