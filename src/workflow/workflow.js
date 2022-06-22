import { LMS_OS, LMS_PACKAGE_ID, LMS_PARTNER_CODE } from "../constants/index";
import { postRequest, putRequest, getRequest } from "../utilites/http-helper";
import { TARGET_API, OUTCOME_API, WORKFLOW_API } from "../services/urls";
import { attachParams } from "../helper/helper";

const lmsStandardHeaders = {
  "partner-code": LMS_PARTNER_CODE,
  os: LMS_OS,
  "package-id": LMS_PACKAGE_ID,
};

export const getTarget = async (params) => {
  const newURLL = attachParams(TARGET_API, params);

  return await getRequest({
    url: newURLL,
    noAuth: true,
  });
};
export const getOutcome = async (params, data) => {
  const newURLL = attachParams(OUTCOME_API, params);
  return await putRequest({
    url: newURLL,
    data: data,
    noAuth: true,
  });
};

export const getWorkFLow = async (data) => {
  return await postRequest({
    url: WORKFLOW_API,
    data: data,
    headers: lmsStandardHeaders,
  });
};
