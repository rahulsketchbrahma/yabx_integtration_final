import React from "react";
import "./CAJ.css";
import { useEffect, useState } from "react";
import {
  KYCdefinition,
  KYCresponsefields,
} from "../../KYC services/KycServices";
import { ACTIVE_KYC_ID } from "../../constants/index";
import ErrorLogo from "../../assets/Vector.png";
import { getCookie } from "../../utilites/cookie-helper";
import { getTarget, getOutcome } from "../../workflow/workflow";
import { useNavigate } from "react-router-dom";

function ConsumerAPPJourney() {
  const [kycData, setKycData] = useState();
  const [kyc, setKyc] = useState();
  const [optionMap, setOptionMap] = useState();
  const [radioValue, setRadioValue] = useState();
  const [customerError, setCustomerError] = useState();
  const [fieldDisplay, setFieldDisplay] = useState();
  const [version, setVersion] = useState();
  const [newUUID, setNewUUID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      id: ACTIVE_KYC_ID,
    };

    KYCdefinition(data).then((res) => {
      const id = res.data.data.packagesDTOs;
      const version = res.data.data.version;
      setVersion(version);

      const name = id.find((item) => {
        return item.id === "623c14b496036905dccfbf79";
      });
      const newArray = name.children;
      const newArr = newArray.map((iteam) => {
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

      setKycData(newArr);
      setKyc(newArr[0]);
      setFieldDisplay(newArr[0].fieldName);
      setOptionMap(newArr[0].options);
    });
  }, [setKycData, setOptionMap, setKyc]);

  const handleValue = (e) => {
    setRadioValue(e.target.value);
  };

  const radioFunc = (e) => {
    e.preventDefault();
    if (kyc.mandatory === true && radioValue === undefined) {
      setCustomerError("Customer app option is required");
    } else {
      KYCresponsefieldsAPI();
    }
  };

  //
  const KYCresponsefieldsAPI = () => {
    const getOTP = getCookie("otp");

    let KYCresponsefieldsAP = {
      kycId: ACTIVE_KYC_ID,
      created_by: getOTP,
      data: {},
      version: version,
    };
    KYCresponsefieldsAP["data"][fieldDisplay] = radioValue;
    console.log(KYCresponsefieldsAP);
    KYCresponsefields(KYCresponsefieldsAP).then((res) => {
      const data = res.data.statusCode;

      if (data === "200") {
        outcome();
      }
    });
  };

  const targetAPIs = () => {
    const targetAPI = {
      uuid: getCookie("UUID"),
    };
    getTarget(targetAPI).then((res) => {
      const action = res.data.actions[0].action;
      const uuid = res.data.actions[0].uuid;

      if (action === "consumer_app_journey") {
        setNewUUID(uuid);
      }
    });
  };
  useEffect(() => {
    targetAPIs();
  }, []);

  const loanAPIs = () => {
    const targetAPI = {
      uuid: getCookie("UUID"),
    };
    getTarget(targetAPI).then((res) => {
      const action = res.data.actions[0].action;
      console.log(res.data.actions[0], "loan");

      if (action === "choose_loan_journey") {
        navigate("/loan-journey");
      }
    });
  };

  const outcome = () => {
    let outcomeAPI = {
      uuid: newUUID,
    };
    console.log(newUUID);

    let data = {};
    data[fieldDisplay] = radioValue;
    console.log(data, "data");
    console.log(outcomeAPI, "opo");
    getOutcome(outcomeAPI, data).then((res) => {
      console.log(res.status, "outcome");
      if (res.status === 200) {
        loanAPIs();
      }
    });
  };

  return (
    <>
      <div className="CAJ__wrapper">
        <div className="CAJ__container">
          <div className="CAJ__background">
            <div className="CAJ__card">
              {kycData?.map((data, id) => (
                <form key={id} onSubmit={radioFunc}>
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
                        {optionMap.map((data, id) => (
                          <div className="selecotr-item" key={id}>
                            <input
                              type="radio"
                              id={data.display}
                              name="selector"
                              className="selector-item_radio"
                              value={data.value}
                              onChange={handleValue}
                            />
                            <label
                              htmlFor={data.display}
                              className="selector-item_label"
                            >
                              {data.display}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {customerError && (
                    <div>
                      <p className="CAJ__error">
                        <span>
                          <img src={ErrorLogo} />
                        </span>
                        {customerError}
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
}

export default ConsumerAPPJourney;
