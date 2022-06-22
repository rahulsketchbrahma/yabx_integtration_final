import React, { useState, useEffect } from "react";
import "./LoanDetails.css";
import Navbar from "../../Components/Navbar/Index";
import Stepper from "../../Components/Stepper/Index";
import { ACTIVE_KYC_ID } from "../../constants";
import {
  KYCdefinition,
  KYCresponsefields,
} from "../../KYC services/KycServices";
import ErrorLogo from "../../assets/Vector.png";
import  {useNavigate} from 'react-router-dom'

function LoanDetails() {
  const [rangeValues, setRangeValues] = useState(0);
  const [rangeYears, setRangeYears] = useState(1);
  const [intrestAmmount , setIntrestAmmount] = useState();
  const [RequiredLoanAmmount, setRequiredLoanAmmount] = useState();
  const [emiammount , setEMiAmmount] = useState();
  const [Error , setError] = useState();
  const [optionValues , setOptionValues] = useState('');
  const navigate = useNavigate();
  const minValue = 0;
  const maxValue = 100000;
  const minYear = 1;
  const maxYear = 5;

  //Simple UI functionality
  const rangeValue = (e) => {
    setRangeValues(e.target.value);
  };
  const rangeYear = (e) => {
    setRangeYears(e.target.value);
    console.log(e.target.value,'p')
  };
  

  //GetKYCdefintion() , Link both url and uuid
  useEffect(() => {
    const dataID = {
      id: ACTIVE_KYC_ID,
    };
    KYCdefinition(dataID).then((res) => {
      const id = res.data.data.packagesDTOs;

      const loanSimulation = id.find((item) => {
        return item.id === "6225b60783ee70124c8260c0";
      });
      const newChildern = loanSimulation.children;
      const childrenArr = newChildern.map((iteam) => {
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

      setRequiredLoanAmmount(childrenArr);
      console.log(childrenArr);
    });
  }, []);

  const intrestfunc = (e) =>{
    setIntrestAmmount(e.target.value)

  }

 
  
useEffect(()=>{
  emmiValue()
},[rangeValues , intrestAmmount , rangeYears])

const emmiValue = () =>{
  console.log(rangeValues,'rangeValue')
  console.log(intrestAmmount,'intrestAmmount')
  console.log(rangeYears,'rangeYears')

  //EMI CALCULATION FORMULA
  const loanAmount = eval(rangeValues);
  const interestRate = eval(intrestAmmount / 1200);
  const numberOfMonths = eval(rangeYears * 12);
  const result =
    eval(loanAmount * interestRate) /
    (1 - Math.pow(1 + interestRate, numberOfMonths * -1)).toFixed(2);
 //

  if (isNaN(result) || !isFinite(result)){
    
    setEMiAmmount(0)
    return
  }else{
    setEMiAmmount(result)
    return
  }
}

const optionValue = (e) =>{
  setOptionValues(e.target.value)
}
  
const detailsSubmit = (e) =>{
  e.preventDefault()
  if ( rangeValues === 0){
    setError('Loan Ammont is Required')
  }
  else if( intrestAmmount === undefined){
    setError('Intrest Ammount is Required')
  }
  else if (optionValues === ''){
    setError('Choose the purpose of the loan')
  }
  else{
    navigate('/next')
  }
}

  return (
    <div>
      <div className="loan__simulation__wrapper">
        <div className="loan__simulation__background">
          <div>
            <Navbar />
          </div>
          <form  onSubmit={detailsSubmit}>
            <div className="loan__stepper">
              <div>
                <div>
                  <Stepper initial={1} />
                </div>
                <div className="loan__simulator__pls__wrapper">
                  <div className="loan__simulator__pls">
                    <div className="loan__simulator__header">
                      <div className="loan__simulator__header__h3">
                        <h3>Personal Loan Simulation</h3>
                      </div>
                      <div className="loan__simulator__content">
                        <div className="loan__simulator__content__left">
                          {RequiredLoanAmmount &&
                            RequiredLoanAmmount.map((res ,id) => {
                              if (
                                res.fieldName ==="required_loan_amount"
                              ) {
                                return (
                                  <div key={id}>
                                  <div >
                                    <div className="loan__simulator__content__left__flex" >
                                      <h4>
                                        {res.fieldDisplayName}
                                        {res.mandatory ? (
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </h4>

                                      <input
                                        
                                        value={rangeValues}
                                        disabled
                                      />
                                    </div>
                                    <div className="loan__simulator__content__left__range">
                                      <input
                                        type="range"
                                        id="value"
                                        min={minValue}
                                        max={maxValue}
                                        value={rangeValues}
                                        className="slider"
                                        onChange={rangeValue}
                                      />
                                    </div>
                                    <div className="loan__simulator__content__left__range__values">
                                      <p>&#8377;0</p>
                                      <p>&#8377;1000000</p>
                                    </div>
                                    </div>
                                   </div>
                                );
                              
                              }
                              if (
                                res.fieldDisplayName ===
                                "Expected Interest Rate"
                              ) {
                                return (
                                  <div  key={id}>
                                    <div className="loan__simulator__content__left__EIR" key={id}>
                                      <label htmlFor="input">
                                        {res.fieldDisplayName}
                                        <input id="input" type="text" onChange={intrestfunc} />
                                      </label>
                                    </div>
                                  </div>
                                   
                                );
                              }
                             
                            }
                            )
                           }
                        </div>
                        <div className="loan__simulator__content__left">
                          {RequiredLoanAmmount &&
                            RequiredLoanAmmount.map((res , id) => {
                              if (
                                res.fieldName ===
                                "expected_repayment_period_months"
                              ) {
                                return (
                                  <div  key={id}>
                                    <div className="loan__simulator__content__left__flex"  >
                                      <h4>
                                        {res.fieldDisplayName}
                                        {res.mandatory ? (
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </h4>

                                      <input
                                        value={rangeYears}
                                        disabled
                                      />
                                    </div>
                                    <div className="loan__simulator__content__left__range">
                                      <input
                                        type="range"
                                        id="year"
                                        min={minYear}
                                        max={maxYear}
                                        value={rangeYears}
                                        onChange={rangeYear}
                                        className="slider"
                                      />
                                    </div>
                                    <div className="loan__simulator__content__left__range__values">
                                      <p>1</p>
                                      <p>5 Year</p>
                                    </div>
                                    </div>
                                );
                              }
                              if (
                                res.fieldName === "expected_emi_amount"
                              ) {
                                return (
                                  <div  key={id}>
                                    <div className="loan__simulator__content__left__EIR">
                                      <label htmlFor="input">
                                        {res.fieldDisplayName}
                                        <input id="input" type="text" value={emiammount}  disabled />
                                      </label>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                        </div>
                      </div>
                    </div>
                    <div className="loan__simulator__content__left__LP__flex">
                      <div className="loan__simulator__content__left__LP">
                        {RequiredLoanAmmount &&
                          RequiredLoanAmmount.map((res , id) => {
                            if (res.fieldName === "loan_purpose") {
                              return (
                                <div  key={id}>
                                <label htmlFor="input"  >
                                  {res.fieldDisplayName}
                                  <select  onChange={optionValue}>
                                    <option value=''
                                    
                                    className="required__option"
                                    >
                                      Choose the purpose of loan
                                    </option>
                                    {res.options &&
                                      res.options.map((option , id) => {
                                        return (
                                     
                                          <option value={option.value}  key={id} >
                                            {option.display}
                                           
                                          </option>
                                          
                                        );
                                      })}
                                  </select>
                                </label>
                                </div>
                              );
                            }
                          })}
                      </div>
                      {Error && (
                  <div>
                    <p className="Details__error">
                      <span>
                        <img src={ErrorLogo} />
                      </span>
                      {Error}
                    </p>
                  </div>
                )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="loanDetails__button__wrapper">
              <button className="loanDetails__button" type="submit">continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
