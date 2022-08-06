import { CognitoIdentityProvider, CognitoIdentityProviderClientConfig } from "@aws-sdk/client-cognito-identity-provider";

export function fabricateCognitoIdpClient(): CognitoIdentityProvider {
    return new CognitoIdentityProvider({});
}