import { DocumentClient } from "aws-sdk/clients/dynamodb";

export default function ddbClientFactory(): DocumentClient {
    return new DocumentClient({});
}