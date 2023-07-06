import axios from "axios";

export const PerformRequest = (request: APIRequest) => {
  const { headers, payload: data, method, url } = request;

  let reqHeaders = { ...(headers || {}) };
  if (localStorage.getItem("userToken")) {
    reqHeaders = {
      Authorization: JSON.parse(localStorage.getItem("userToken") || ""),
    };
  }
  return () =>
    axios({
      url,
      method: method || "GET",
      headers: reqHeaders,
      data,
    });
};

export * from "./auth";
export * from "./fetch";
