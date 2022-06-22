import React, { useEffect, useState } from "react";
import "./Stepper.css";

function Stepper(value) {
  const InitailColor = {
    loanSimulator: "greycolor",
    PreviousLoan: "greycolor",
    PersonalInfo: "greycolor",
    Address: "greycolor",
    Documents: "greycolor",
    AdditionalInfo: "greycolor",
    LoanInfo: "greycolor",
  };
  const InitailValue = {
    loanSimulator: "greycolorValue",
    PreviousLoan: "greycolorValue",
    PersonalInfo: "greycolorValue",
    Address: "greycolorValue",
    Documents: "greycolorValue",
    AdditionalInfo: "greycolorValue",
    LoanInfo: "greycolorValue",
  };
  const InitailProgressbar = {
    loanSimulator: "greycolorpValue",
    PreviousLoan: "greycolorpValue",
    PersonalInfo: "greycolorpValue",
    Address: "greycolorpValue",
    Documents: "greycolorpValue",
    AdditionalInfo: "greycolorpValue",
    LoanInfo: "greycolorpValue",
  };

  const [initialColor, setInitialColor] = useState(InitailColor);
  const [initailValue, setInitialValue] = useState(InitailValue);
  const [initailProgressbar, setInitialProgressbar] = useState(InitailProgressbar);

  useEffect(() => {
    if (value.initial === 1) {
      setInitialColor({ ...initialColor, loanSimulator: "greycolor red" });
      setInitialValue({
        ...initailValue,
        loanSimulator: "greycolorValue redValue",
      });
      setInitialProgressbar({
        ...initailProgressbar,
        loanSimulator: "greycolorpValue redpvalue",
      });
    }
  }, [value]);

  return (
    <div>
      <div className="stepper__wrapper">
        <div className="stepper__container">
          <div className="stepper">
            <span className={`${initialColor.loanSimulator}`}>1</span>
            <div className="media__flex">
            <p className={`${initailValue.loanSimulator}`}>Loan Simulator</p>
            <span className='page__number'>1/6</span>
            </div>
          </div>
          <div className="stepper">
            <span className={`${initialColor.PreviousLoan}`}>2</span>
            <p className={`${initailValue.PreviousLoan}`}>Previous Loan</p>
          </div>
          <div className="stepper">
            <span className={`${initialColor.PersonalInfo}`}>3</span>
            <p className={`${initailValue.PersonalInfo}`}>Personal Info</p>
          </div>
          <div className="stepper">
            <span className={`${initialColor.Address}`}>4</span>
            <p className={`${initailValue.Address}`}>Address</p>
          </div>
          <div className="stepper">
            <span className={`${initialColor.Documents}`}>5</span>
            <p className={`${initailValue.Documents}`}>Documents</p>
          </div>
          <div className="stepper">
            <span className={`${initialColor.AdditionalInfo}`}>6</span>
            <p className={`${initailValue.AdditionalInfo}`}>Additional Info</p>
          </div>
          <div className="stepper">
            <span className={`${initialColor.LoanInfo}`}>7</span>
            <p className={`${initailValue.LoanInfo}`}>Loan Info</p>
          </div>
        </div>
      </div>
      <div className="Progress__bar">
      <div className={`${initailProgressbar.loanSimulator}`}></div>
      <div className={`${initailProgressbar.PreviousLoan}`}></div>
      <div className={`${initailProgressbar.PersonalInfo}`}></div>
      <div className={`${initailProgressbar.Address}`}></div>
      <div className={`${initailProgressbar.Documents}`}></div>
      <div className={`${initailProgressbar.AdditionalInfo}`}></div>
      <div className={`${initailProgressbar.LoanInfo}`}></div>
      <div className="Progress__bar__media__child"></div>
    </div>
    </div>
  );
}

export default Stepper;
