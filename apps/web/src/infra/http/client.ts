import axios, { isAxiosError } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

import type { IHTTPClient, HTTPRequest } from "./types";

import { ApiError } from "@domain/errors/http/api-error";

export class HTTPClient implements IHTTPClient {
  private client: AxiosInstance;
  protected baseUrl: string;

  constructor(
    client: AxiosInstance = axios,
    baseUrl = import.meta.env.VITE_HTTP_API_URL,
  ) {
    this.client = client;
    this.baseUrl = baseUrl;
  }

  async sendRequest<TResponse = unknown, TBody = unknown>(
    request: HTTPRequest<TBody>,
  ): Promise<AxiosResponse<TResponse>> {
    const { method, endpoint, body, headers, params } = request;

    try {
      const response = await this.client.request<TResponse>({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data: body,
        headers,
        params,
      });

      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.error || error.message;
        throw new ApiError(message);
      }

      throw error;
    }
  }
}
