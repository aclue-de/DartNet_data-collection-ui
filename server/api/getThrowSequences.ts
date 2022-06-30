import type { NextFunction, Request, Response } from "vite-plugin-mix";

import {
  DynamoDBDocumentClient,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export default async function getThrowSequences(
  req: Request,
  res: Response,
  next: NextFunction,
  dynamoDbDocumentClient: DynamoDBDocumentClient
): Promise<string> {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      getThrowSequences: { id: null },
    },
  };

  const command = new ScanCommand(params);
  const output = await dynamoDbDocumentClient.send<
    ScanCommandInput,
    ScanCommandOutput
  >(command);

  if (!output || !output.Items) {
    return "404"; //[404, {}, "Not Found"];
  }

  const items = unmarshall(output.Items[0]);
  console.log(items);
  const itemsJson = JSON.stringify(items);
  return itemsJson; // [200, { "Content-Type": "application/json" }, itemsJson];
}
