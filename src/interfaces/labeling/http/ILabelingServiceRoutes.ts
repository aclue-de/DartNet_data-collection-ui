import { IHTTPRoute } from "../../shared/http/IHttpRoute";

export interface ILabelingServiceRoutes {
  serverUrl: string;
  //getThrowSequences: IHTTPRoute;
  //getThrowSequence: IHTTPRoute;
  getThrowSequenceNextUnlabeled: IHTTPRoute;
  postThrowSequenceImageLabels: IHTTPRoute;
  deleteThrowSequence: IHTTPRoute;
}
