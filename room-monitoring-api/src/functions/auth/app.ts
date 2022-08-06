import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
        }),
    };
    return response;
};