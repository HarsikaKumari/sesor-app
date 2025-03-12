import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Device } from "../device/device.entity";

@Entity("sensor_data")
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensorType: string; // e.g., temperature, humidity, accelerometer, gas

  @Column("float")
  value: number;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Device, (device) => device.sensorData)
  device: Device;
}
