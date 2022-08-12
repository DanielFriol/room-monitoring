import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import ddbClientFactory from "./dynamodb-db-client.factory";
import { RegisterDataRequestModel } from "./models/register-data-request.model";
import RegisterDataService from "./register-data.service";

const ddbClient = ddbClientFactory();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    const body: RegisterDataRequestModel = JSON.parse(event.body ?? "");
    const service = new RegisterDataService(ddbClient);
    try {
        const ddbResponse = await service.saveDataToDdb(body);
        response = {
            statusCode: 200,
            body: JSON.stringify({
                ...ddbResponse,
            }),
        };
    } catch (error) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: error,
            }),
        };
    }
    return response;
};