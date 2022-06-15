import { ContentType } from "./ContentType";

export interface IHTTPRoute {
  httpType: "get" | "post" | "delete";
  contentType: ContentType;
  clientRoute: string;
  serverRoute: string;
}
