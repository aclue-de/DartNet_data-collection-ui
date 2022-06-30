import type { Request, Response, NextFunction } from "vite-plugin-mix";
import {
  DynamoDBClient,
  BatchExecuteStatementCommand,
  CreateTableCommand,
  CreateTableCommandOutput
} from "@aws-sdk/client-dynamodb";
import {
  BatchExecuteStatementCommandInput
} from "@aws-sdk/client-dynamodb/dist-types/commands/BatchExecuteStatementCommand";

export default async function postThrowSequenceNextUnlabeled(req: Request, res: Response, next: NextFunction, dynamoDBClient: DynamoDBClient) {
  const throwImage = req.params.throwImage;

  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "Season", //ATTRIBUTE_NAME_1
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
      {
        AttributeName: "Episode", //ATTRIBUTE_NAME_2
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "Season", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "Episode", //ATTRIBUTE_NAME_2
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "ThrowSequence", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  const command = new CreateTableCommand(params);
  const result: CreateTableCommandOutput = await dynamoDBClient.send(command);
  console.log('CreateTable StatusCode: ' + result?.$metadata?.httpStatusCode)
  return [200, { "Content-Type": "application/json" }, {}];
}

