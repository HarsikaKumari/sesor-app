import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka, Consumer } from "kafkajs";

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: ["http://192.168.235.125:9092"],
  });

  private consumer: Consumer;

  async onModuleInit() {
    this.consumer = this.kafka.consumer({ groupId: "sensor-group" });
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "sensor-data",
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message from ${topic}:`, {
          key: message.key.toString(),
          value: message.value.toString(),
          partition,
        });
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
