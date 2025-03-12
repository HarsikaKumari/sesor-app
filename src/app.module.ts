import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceModule } from "./device/device.module";
import { SensorData } from "./sensor/sensor.entity";
import { Device } from "./device/device.entity";
import { SensorModule } from "./sensor/sensor.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: Number(5432),
      username: "postgres",
      password: "shishir",
      database: "coal",
      entities: [Device, SensorData],
      synchronize: true,
    }),
    DeviceModule,
    SensorModule,
  ],
})
export class AppModule {}
