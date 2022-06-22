export const baseURL = "https://yabxdemo-in.yabx.co";
export const homeUrl = "https://kyc.yabx.co";

export const NEW_TOKEN = `${baseURL}/apis/v1/auth/token`;
export const GENERATE_OTP = `${baseURL}/apis/v1/otps/generate`;
export const VERIFY_OTP = `${baseURL}/apis/v1/otps/authenciate_otp`;
export const RESENT_OTP = `${baseURL}/apis/v1/otps/resend`;
export const TARGET_API = `http://cashews-tz.yabx.co:3000/api/workflow/interactions`;
export const OUTCOME_API = `http://cashews-tz.yabx.co:3000/api/workflow/interaction_outcome`;
export const WORKFLOW_API = `https://yabxdemo-in.yabx.co/apis/v1/customers/init_workflow`;

export const KYC_definition = `${homeUrl}/kyc2/get`;
export const KYC_response_fields = `${homeUrl}/kyc2/kycFieldResponse`;
export const KYC_responses = `${homeUrl}/kyc2/kycResponses?`;
export const KYC_responses_body = `${homeUrl}/kyc2/kycResponseBody?`;
export const KYC_responseld = `${homeUrl}/kyc2/kycResponse?`;
export const KYC_responseld_mssisdn = `${homeUrl}/kyc2/kycResponse?`;
export const KYC_document_field = `${homeUrl}/kyc2/uploadField`;
export const KYC_document_status = `${homeUrl}/kyc2/kycResponseUpdate`;
