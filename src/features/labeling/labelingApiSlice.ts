import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../http/axiosBaseQuery";
import { IThrowSequence } from "../../interfaces/labeling/data/IThrowSequence";
import { LABELING_SERVICE_ROUTES } from "../../config";
import { IImageLabel } from "../../interfaces/labeling/data/IImageLabel";

export const labelingApi = createApi({
  reducerPath: "labelingApi",
  baseQuery: axiosBaseQuery({ baseUrl: LABELING_SERVICE_ROUTES.serverUrl }),
  endpoints: (build) => ({
    getThrowSequenceNextUnlabeled: build.query<
      { throwSequence: IThrowSequence },
      number
    >({
      query: (exceptId: number) => ({
        url: `${LABELING_SERVICE_ROUTES.getThrowSequenceNextUnlabeled.clientRoute}${exceptId}`,
        method: LABELING_SERVICE_ROUTES.getThrowSequenceNextUnlabeled.httpType,
      }),
    }),
    postImageLabels: build.query<
      { imageLabels: IImageLabel[] },
      { throwSequenceId: number; imageLabels: IImageLabel[] }
    >({
      query: ({ throwSequenceId, imageLabels }) => ({
        url: `${LABELING_SERVICE_ROUTES.postThrowSequenceImageLabels.clientRoute}${throwSequenceId}`,
        method: LABELING_SERVICE_ROUTES.postThrowSequenceImageLabels.httpType,
        data: { imageLabels },
      }),
    }),
  }),
});

export const {
  useGetThrowSequenceNextUnlabeledQuery,
  usePostImageLabelsQuery,
} = labelingApi;
