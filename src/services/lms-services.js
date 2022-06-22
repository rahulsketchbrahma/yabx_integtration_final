import { LMS_OS, LMS_PACKAGE_ID, LMS_PARTNER_CODE } from "../constants/index";
import { postRequest } from "../utilites/http-helper";
import {
  NEW_TOKEN,
  GENERATE_OTP,
  VERIFY_OTP,
  RESENT_OTP,
} from "../services/urls";

const lmsStandardHeaders = {
  "partner-code": LMS_PARTNER_CODE,
  os: LMS_OS,
  "package-id": LMS_PACKAGE_ID,
};
export const getAccessToken = async (data) => {
  return await postRequest({
    url: NEW_TOKEN,
    data: data,
    noAuth: false,
    headers: lmsStandardHeaders,
  });
};
export const getGeneralOtp = async (data) => {
  return await postRequest({
    url: GENERATE_OTP,
    data: data,
    headers: lmsStandardHeaders,
  });
};
export const getVerifyOtp = async (data) => {
  return await postRequest({
    url: VERIFY_OTP,
    data: data,
    headers: lmsStandardHeaders,
  });
};
export const getResentOtp = async (data) => {
  return await postRequest({
    url: RESENT_OTP,
    data: data,
    headers: lmsStandardHeaders,
  });
};
