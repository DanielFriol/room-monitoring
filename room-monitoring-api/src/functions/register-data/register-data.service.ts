import { DeviceData, DeviceDataBuilder } from "./models/data.entity";
import { RegisterDataRequestModel } from "./models/register-data-request.model";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export default class RegisterDataService {
    private _client: DocumentClient;
    constructor(client: DocumentClient) {
        this._client = client;
    }

    async saveDataToDdb(data: RegisterDataRequestModel) {
        const deviceData = new DeviceDataBuilder()
            .temperature(data.temperature)
            .humidity(data.humidity)
            .deviceName(data.deviceName)
            .build();
        const inputData = this._dataCreateInput(deviceData);
        await this._client.transactWrite(inputData).promise().catch((error) => {
            console.log(error);
            return error;
        });
        return deviceData;
    }

    private _dataCreateInput(deviceData: DeviceData): DocumentClient.TransactWriteItemsInput {
        return {
            TransactItems: [
                {
                    Put: {
                        TableName: process.env.DYNAMODB_TABLE as string,
                        Item: deviceData.toDdbData(),
                        ConditionExpression: "attribute_not_exists(PK)",
                    }
                }
            ]
        }
    }
}