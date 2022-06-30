import type { Handler, Request, Response, NextFunction } from "vite-plugin-mix";
import DynamoDbConnection from "./db/DynamoDbConnection";
import getThrowSequences from "./api/getThrowSequences";
import loadServerEnv from "./loadServerEnv";

loadServerEnv();
const dynamoDbConnection = DynamoDbConnection();

export const handler: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path === "/getThrowSequences"
    //LABELING_SERVICE_ROUTES.getThrowSequenceNextUnlabeled.serverRoute
  ) {
    const text = await getThrowSequences(req, res, next, dynamoDbConnection);
    return res.end(text);
  }
  next();
};
