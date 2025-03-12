import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
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
    @Headers("x-api-key") apiKey: string,
    @Body() body: CreateSensorDataDto,
  ) {
    // Get device by deviceId
    const device = await this.deviceService.findByDeviceId(body.deviceId);
    if (!device) {
      throw new HttpException("Device not found", HttpStatus.NOT_FOUND);
    }

    // Validate API key
    if (apiKey !== device.token) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // Pass data to sensor service
    return this.sensorService.handleMockData(body);
  }
}
