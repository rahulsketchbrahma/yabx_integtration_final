import axios from "axios";
import { KYC_ACCESS_TOKEN } from "../constants/index";
import { getCookie } from "./cookie-helper";

export const sendRequest = async (args) => {
  try {
    const { url, headers, noAuth } = args;
    let headerParams;
    if (!noAuth) {
      let token;
      let isKycRequest =
        url.origin !== undefined
          ? url.origin.includes("kyc")
          : url.includes("kyc");
      if (isKycRequest) {
        token = KYC_ACCESS_TOKEN;
      } else {
        token = getCookie("token");
      }
      if (headers) {
        headerParams = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      } else {
        headerParams = {
          Authorization: `Bearer ${token}`,
        };
      }
    }
    const response = await axios({
      ...args,
      headers: headerParams,
      url: url,
    });

    return response;
  } catch (error) {
    if (error.response.status === 401) {
    }

    return { error };
  }
};

export const getRequest = async (args) => {
  const { data, headers, error, status } = await sendRequest({
    ...args,
    method: "get",
  });

  if (status === 200) {
    return {
      data,
      error: null,
      headers,
      status,
    };
  }
  return {
    data,
    error: error || data,
    status,
  };
};

export const postRequest = async (args) => {
  const { data, headers, error, status } = await sendRequest({
    ...args,
    method: "post",
  });

  if ([200, 201, 204].indexOf(status) > -1) {
    return {
      data,
      error: null,
      headers,
      status,
    };
  }
  return {
    data: null,
    error: error || data,
    status,
  };
};

export const patchRequest = async (args) => {
  const { data, headers, error, status } = await sendRequest({
    ...args,
    method: "patch",
  });
  if ([200, 201, 204].indexOf(status) > -1) {
    return {
      data,
      error: null,
      headers,
      status,
    };
  }
  return {
    data: null,
    error: error || data,
    status,
  };
};

export const deleteRequest = async (args) => {
  const { data, error, status, headers } = await sendRequest({
    ...args,
    method: "delete",
  });
  if ([200, 201, 204].indexOf(status) > -1) {
    return {
      data,
      error: null,
      headers,
      status,
    };
  }
  return {
    data: null,
    error: error || data,
    status,
  };
};

export const putRequest = async (args) => {
  const { data, error, status, headers } = await sendRequest({
    ...args,
    method: "put",
  });
  if ([200, 201, 204].indexOf(status) > -1) {
    return {
      data,
      error: null,
      headers,
      status,
    };
  }
  return {
    data: null,
    error: error || data,
    status,
  };
};
