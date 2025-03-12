import { Module } from "@nestjs/common";
import { SensorController } from "./sensor.controller";
import { SensorService } from "./sensor.service";
import { DeviceModule } from "src/device/device.module";
import { SensorData } from "./sensor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([SensorData]), DeviceModule],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
