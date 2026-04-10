import type { AxiosResponse } from "axios";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type HTTPRequest<TBody = unknown> = {
  endpoint: string;
  method: HTTPMethod;
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

export interface IHTTPClient {
  sendRequest: <TResponse = unknown, TBody = unknown>(
    request: HTTPRequest<TBody>,
  ) => Promise<AxiosResponse<TResponse>>;
}
