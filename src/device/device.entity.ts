import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SensorData } from "../sensor/sensor.entity";

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  token: string;

  @OneToMany(() => SensorData, (sensorData) => sensorData.device)
  sensorData: SensorData[];
}
