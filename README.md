# Room monitoring project

## Cognito IDP login with AWS CLI
    aws cognito-idp admin-initiate-auth --user-pool-id <user-pool-id> --client-id <client-id> --auth-flow ADMIN_USER_PASSWORD_AUTH --auth-parameters USERNAME=<username>,PASSWORD=<password>
## Cognito IDP set user password
    aws cognito-idp admin-set-user-password --user-pool-id <user-pool-id> --username <username> --password <password> --permanent
