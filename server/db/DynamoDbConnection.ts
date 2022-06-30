import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"; // ES6 import

export default function DynamoDbConnection(): DynamoDBDocumentClient {
  const dynamoDbClient = new DynamoDBClient({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID ? process.env.ACCESS_KEY_ID : "",
      secretAccessKey: process.env.SECRET_ACCESS_KEY
        ? process.env.SECRET_ACCESS_KEY
        : "",
    },
  });
  return DynamoDBDocumentClient.from(dynamoDbClient);
}
