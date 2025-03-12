import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSensorDataDto } from "src/device/dto/create-sensor-data.dto";
import { DeviceService } from "src/device/device.service";
import { SensorData } from "./sensor.entity";

@Injectable()
export class SensorService {
  private isSendingData = false;
  private interval: NodeJS.Timeout | null = null;
  private logger = new Logger(SensorService.name);

  constructor(
    private readonly deviceService: DeviceService,
    @InjectRepository(SensorData)
    private readonly sensorDataRepository: Repository<SensorData>,
  ) {}

  async handleMockData(
    apiKey: string | undefined,
    payload: CreateSensorDataDto,
  ) {
    const { deviceId, sensorType, value } = payload;

    if (!apiKey) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // 🔍 Get device by deviceId
    const device = await this.deviceService.findByDeviceId(deviceId);
    if (!device) {
      throw new HttpException("Device not found", HttpStatus.NOT_FOUND);
    }

    // 🔑 Validate API key
    if (device.token !== apiKey) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // Save sensor data in the database
    const sensorData = this.sensorDataRepository.create({
      device: { id: device.id },
      sensorType,
      value,
    });

    this.logger.log(
      `Saved sensor data from device ${deviceId}: ${JSON.stringify(sensorData)}`,
    );

    return await this.sensorDataRepository.save(sensorData);

    //   if (!this.isSendingData) {
    //     this.startSendingData(sensorType, { min: 10, max: 50 });
    //   }
    // }

    // private startSendingData(
    //   indicator: string,
    //   range: { min: number; max: number },
    // ) {
    //   this.isSendingData = true;
    //   this.interval = setInterval(() => {
    //     const mockValue = Math.random() * (range.max - range.min) + range.min;
    //     this.logger.log(
    //       `Sending mock ${indicator} data: ${mockValue.toFixed(2)}`,
    //     );
    //   }, 1000);
    // }

    // private stopSendingData() {
    //   if (this.interval) {
    //     clearInterval(this.interval);
    //     this.interval = null;
    //   }
    //   this.isSendingData = false;
    //   this.logger.log("Stopped sending mock data.");
    // }
  }
}
