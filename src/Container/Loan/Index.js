import React, { useEffect, useState } from "react";
import { ACTIVE_KYC_ID } from "../../constants";
import ErrorLogo from "../../assets/Vector.png";
import { getTarget, getOutcome } from "../../workflow/workflow";
import { getCookie } from "../../utilites/cookie-helper";
import {
  KYCdefinition,
  KYCresponsefields,
} from "../../KYC services/KycServices";
import "./Loan.css";
import { useNavigate } from "react-router-dom";

const Loan = () => {
  const [customArr, setCustomArr] = useState();
  const [newCustomArr, setNewCustomArr] = useState();
  const [fieldDisplay, setFieldDisplay] = useState();
  const [optionValue, setOptionValue] = useState();
  const [inputValue, setInputValue] = useState();
  const [error, setError] = useState();
  const [newUUID, setNewUUID] = useState();
  const [version, setVersion] = useState();
  const navigate = useNavigate();

  //TargetAPi

  const targetAPIs = () => {
    const targetAPI = {
      uuid: getCookie("UUID"),
    };
    console.log(targetAPI);
    getTarget(targetAPI).then((res) => {
      const action = res.data.actions[0].action;
      const uuid = res.data.actions[0].uuid;

      if (action === "choose_loan_journey") {
        setNewUUID(uuid);
      }
      console.log(newUUID);
    });
  };
  useEffect(() => {
    targetAPIs();
  }, []);

  //GetKYCdefintion() , Link both url and uuid
  useEffect(() => {
    const dataID = {
      id: ACTIVE_KYC_ID,
    };
    KYCdefinition(dataID).then((res) => {
      const id = res.data.data.packagesDTOs;
      const version = res.data.data.version;
      setVersion(version);

      const Unsecuredid = id.find((item) => {
        return item.id === "622848275ad3b33196cb2ede";
      });
      const newData = Unsecuredid.children;
      const customArr = newData.map((iteam) => {
        return {
          id: iteam.id,
          fieldName: iteam.fieldName,
          fieldDisplayName: iteam.fieldDisplayName,
          mandatory: iteam.mandatory,
          options: iteam.options,
          editable: iteam.editable,
          type: iteam.type,
        };
      });
      setCustomArr(customArr);
      setNewCustomArr(customArr[0]);
      setFieldDisplay(customArr[0].fieldName);
      setOptionValue(customArr[0].options);
    });
  }, [setCustomArr, setOptionValue, setNewCustomArr]);

  //get value of radio button once clicked
  const handleValue = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  //onsubmit,
  const loanSubmit = (e) => {
    e.preventDefault();
    if (newCustomArr.mandatory === true && inputValue === undefined) {
      setError("Unsecured Product Based Journey is required");
    } else {
      KYCresponsefieldsAPI();
    }
  };

  //Submit KYCresponsefieldsAPI with fields in body
  const KYCresponsefieldsAPI = () => {
    const getOTP = getCookie("otp");

    let KYCresponsefieldsAP = {
      kycId: ACTIVE_KYC_ID,
      created_by: getOTP,
      data: {},
      version: version,
    };
    KYCresponsefieldsAP["data"][fieldDisplay] = inputValue;

    KYCresponsefields(KYCresponsefieldsAP).then((res) => {
      const data = res.data.statusCode;

      if (data === "200") {
        outcome();
      }
    });
  };

  //outcomeAPI
  const outcome = () => {
    let outcomeAPI = {
      uuid: newUUID,
    };
    console.log(newUUID);

    let data = {};
    data[fieldDisplay] = inputValue;
    console.log(data, "data");
    console.log(outcomeAPI, "opo");
    getOutcome(outcomeAPI, data).then((res) => {
      console.log(res.status, "outcome");
      if (res.status === 200) {
        loanJourneyAPIs();
      }
    });
  };

  //targetAPI, Navigate
  const loanJourneyAPIs = () => {
    const loanJourney = {
      uuid: getCookie("UUID"),
    };
    getTarget(loanJourney).then((res) => {
      const action = res.data.actions[0].action;
      console.log(res.data, "loan");
      console.log(res.data, "kycres");

      if (action === "consumer_loan_journey") {
        navigate("/consumer-loan-journey");
      }
      if (action === "loan_simulator") {
        navigate("/loan-details");
      }
    });
  };

  return (
    <>
      <div className="CAJ__wrapper">
        <div className="CAJ__container">
          <div className="CAJ__background">
            <div className="CAJ__card">
              {customArr?.map((data, id) => (
                <form key={id} onSubmit={loanSubmit}>
                  <div className="CAJ__card__details">
                    <h3>Welcome to YABX</h3>
                    {data.mandatory === true ? (
                      <p>
                        {data.fieldDisplayName}
                        <span style={{ color: "red" }}>*</span>
                      </p>
                    ) : null}

                    <div className="CAJ__options">
                      <div className="selector">
                        {optionValue.map((data, id) => (
                          <div className="selecotr-item" key={id}>
                            <input
                              type="radio"
                              id={data.display}
                              value={data.value}
                              name="selector"
                              className="selector-item_radio"
                              onChange={handleValue}
                            />
                            <label
                              htmlFor={data.display}
                              className="selector-item_label_loan"
                            >
                              {data.display}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {error && (
                    <div>
                      <p className="CAJ__error">
                        <span>
                          <img src={ErrorLogo} />
                        </span>
                        {error}
                      </p>
                    </div>
                  )}
                  <button type="submit" className="CAJ__button">
                    Next
                  </button>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loan;
