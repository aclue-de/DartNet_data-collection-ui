import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type AxiosArgs<D = any> = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig<D>["data"];
  params?: AxiosRequestConfig["params"];
};

/**
 * @param baseUrl in case you need a baseUrl outside of supplier-connect
 * @returns the base query
 */
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    AxiosArgs,
    unknown,
    unknown,
    {},
    Omit<AxiosResponse, "data">
  > =>
  async ({ url, method, data, params }) => {
    try {
      const { data: responseData, ...meta } = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: responseData, meta };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      const errorDetails = error.response?.data;

      return {
        error: { status: error.response?.status, data: errorDetails },
      };
    }
  };
