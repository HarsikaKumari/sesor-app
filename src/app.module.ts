import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SensorModule } from './sensor/sensor.module';
import { KafkaModule } from './test/kafka.module';

@Module({
  imports: [ConfigModule.forRoot(), SensorModule, KafkaModule],
})
export class AppModule { }
