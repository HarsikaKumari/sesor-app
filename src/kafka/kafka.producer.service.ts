import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: ['http://192.168.235.125:9092'],
  });

  private producer: Producer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async produce(topic: string, message: { key: string; value: string }) {
    await this.producer.send({
      topic,
      messages: [message],
    });

    console.log(`Produced message to topic ${topic}:`, message);
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
