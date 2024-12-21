import { WebviewResponseMethod } from "shared/constant";
import { VsCodeResponse } from "shared/interface";

const vscode = acquireVsCodeApi();

const promiseMap = new Map<
  WebviewResponseMethod,
  { resolve: (value: any) => void; reject: (reason?: any) => void }
>();

export const fetchData = <P = any, T = any>(
  method: WebviewResponseMethod,
  payload?: P
): Promise<VsCodeResponse<T>["payload"]> => {
  return new Promise((resolve, reject) => {
    promiseMap.set(method, { resolve, reject });
    vscode.postMessage({ method, payload, type: "request" });
  });
};

window.addEventListener("message", (message) => {
  const { type, data } = message;
  if (type === "message") {
    const { method, type, payload } = data as VsCodeResponse;
    if (type === "response") {
      const promiseMethod = promiseMap.get(method);
      if (promiseMethod) {
        if (payload.code === 200) {
          promiseMethod.resolve(payload);
        } else {
          promiseMethod.reject(payload);
        }
      }
    }
  }
});
