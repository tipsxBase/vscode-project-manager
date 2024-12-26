import { WebviewResponseMethod, WebviewServerPushEvent } from "shared/constant";
import { VsCodeResponse } from "shared/interface";

export const createVsCodeSuccessResponse = <T>(
  method: WebviewResponseMethod,
  payload: T
): VsCodeResponse<T> => {
  return {
    method,
    type: "response",
    payload: {
      code: 200,
      message: "success",
      data: payload,
    },
  };
};

export const createVsCodeServerPushResponse = <T>(
  method: WebviewServerPushEvent,
  payload: T
): VsCodeResponse<T> => {
  return {
    method,
    type: "push",
    payload: {
      code: 200,
      message: "success",
      data: payload,
    },
  };
};

export const createVsCodeFailureResponse = <T>(
  method: WebviewResponseMethod,
  errorMessage: string
): VsCodeResponse<T> => {
  return {
    method,
    type: "response",
    payload: {
      code: 500,
      message: errorMessage,
      data: null,
    },
  };
};
