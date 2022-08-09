import { AdminInitiateAuthCommandInput, AuthFlowType } from "@aws-sdk/client-cognito-identity-provider";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fabricateCognitoIdpClient } from "./cognito-idp-client.factory";

const client = fabricateCognitoIdpClient();
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;

type AuthenticationRequestModel = {
    username: string
    password: string
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body: AuthenticationRequestModel = JSON.parse(event.body ?? "");
    let response: APIGatewayProxyResult;
    try {
        const args: AdminInitiateAuthCommandInput = {
            AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
            ClientId: CLIENT_ID,
            UserPoolId: USER_POOL_ID,
            AuthParameters: {
                "USERNAME": body.username,
                "PASSWORD": body.password
            }
        }
        const adminResponse = await client.adminInitiateAuth(args);
        response = {
            statusCode: 200,
            body: JSON.stringify({
                idToken: adminResponse.AuthenticationResult?.IdToken
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