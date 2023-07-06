interface APIRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: any;
  payload?: unknown;
}
