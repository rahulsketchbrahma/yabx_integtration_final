import { postRequest, getRequest } from "../utilites/http-helper";
import {
  KYC_response_fields,
  KYC_definition,
  KYC_responses,
  KYC_responses_body,
  KYC_responseld,
  KYC_responseld_mssisdn,
  KYC_document_field,
  KYC_document_status,
} from "../services/urls";
import { attachParams } from "../helper/helper";

export const KYCresponsefields = async (data) => {
  return await postRequest({
    url: KYC_response_fields,
    data: data,
  });
};

export const KYCdocumentfield = async (data) => {
  return await postRequest({
    url: KYC_document_field,
    data: data,
  });
};

export const KYCdocumentstatus = async (data) => {
  return await postRequest({
    url: KYC_document_status,
    data: data,
  });
};

export const KYCdefinition = async (params) => {
  const newURL = attachParams(KYC_definition, params);
  return await getRequest({
    url: newURL,
    data: {},
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const KYCresponses = async (data) => {
  return await getRequest({
    url: KYC_responses,
    data: data,
  });
};

export const KYCresponsesbody = async (data) => {
  return await getRequest({
    url: KYC_responses_body,
    data: data,
  });
};

export const KYCresponseld = async (data) => {
  return await getRequest({
    url: KYC_responseld,
    data: data,
  });
};

export const KYCresponseldmssisdn = async (data) => {
  return await getRequest({
    url: KYC_responseld_mssisdn,
    data: data,
  });
};
