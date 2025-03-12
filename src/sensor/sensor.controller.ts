import { Controller, Post, Body, Headers } from "@nestjs/common";
import { SensorService } from "./sensor.service";
import { CreateSensorDataDto } from "src/device/dto/create-sensor-data.dto";
import { DeviceService } from "src/device/device.service";

@Controller("sensor")
export class SensorController {
  constructor(
    private readonly sensorService: SensorService,
    private readonly deviceService: DeviceService,
  ) {}

  @Post("mock-data")
  async handleMockData(
    @Headers("x-api-key") apiKey: string | undefined,
    @Body() body: CreateSensorDataDto,
  ) {
    // Pass data to sensor service

    return this.sensorService.handleMockData(apiKey, body);
  }
}
