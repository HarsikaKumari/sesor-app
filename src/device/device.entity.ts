import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SensorData } from "../sensor/sensor.entity";

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  deviceId: string;

  @OneToMany(() => SensorData, (sensorData) => sensorData.device)
  sensorData: SensorData[];
}
