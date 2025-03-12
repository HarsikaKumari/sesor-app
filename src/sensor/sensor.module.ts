import { Module } from "@nestjs/common";
import { SensorController } from "./sensor.controller";
import { SensorService } from "./sensor.service";
import { DeviceModule } from "src/device/device.module";

@Module({
  imports: [DeviceModule],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
