export class DeviceData {
    temperature: string = "";
    humidity: string = "";
    deviceName: string = "";
    createdAt: string = "";

    toDdbData() {
        return {
            PK: "DATA#DEVICE#NAME#" + this.deviceName,
            SK: "DATA#CREATED#AT#" + this.createdAt,
            temperature: this.temperature,
            humidity: this.humidity,
            deviceName: this.deviceName,
            createdAt: this.createdAt
        }
    }

    static fromDdbData(ddbData: any): DeviceData {
        return new DeviceDataBuilder()
            .temperature(ddbData.temperature)
            .humidity(ddbData.humidity)
            .deviceName(ddbData.deviceName)
            .createdAt(ddbData.createdAt)
            .build();
    }

}


export class DeviceDataBuilder {
    private readonly _deviceData: DeviceData;
    constructor() {
        this._deviceData = new DeviceData();
        this._deviceData.createdAt = new Date().toISOString();
    }

    temperature(temperature: string): DeviceDataBuilder {
        this._deviceData.temperature = temperature
        return this;
    }

    humidity(humidity: string): DeviceDataBuilder {
        this._deviceData.humidity = humidity
        return this;
    }

    deviceName(deviceName: string): DeviceDataBuilder {
        this._deviceData.deviceName = deviceName
        return this;
    }

    createdAt(createdAt: string): DeviceDataBuilder {
        this._deviceData.createdAt = createdAt
        return this;
    }

    build(): DeviceData {
        return this._deviceData;
    }

}