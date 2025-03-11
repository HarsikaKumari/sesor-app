import {
  Module,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Module({})
export class KafkaModule implements OnApplicationBootstrap, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'coal-mining-client',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'coal-mining-group' });
  }

  async onApplicationBootstrap() {
    await Promise.all([this.connectProducer(), this.connectConsumer()]);

    this.consumeMessages('co2', (message) => console.log('Received:', message));

    setInterval(async () => {
      const message = { timestamp: new Date().toISOString(), value: 99 };
      await this.sendMessage('sensor', message);
      console.log('Message sent:', message);
    }, 1000);
  }

  private async connectProducer() {
    if (!this.producer) return;
    await this.producer.connect();
  }

  private async connectConsumer() {
    if (!this.consumer) return;
    await this.consumer.connect();
  }

  async sendMessage(topic: string, message: any) {
    if (!this.producer) return;
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async consumeMessages(topic: string, callback: (message: any) => void) {
    if (!this.consumer) return;
    try {
      await this.consumer.subscribe({ topic, fromBeginning: true });

      await this.consumer.run({
        eachMessage: async ({ message }) => {
          if (message.value) {
            callback(JSON.parse(message.value.toString()));
          }
        },
      });
    } catch (error) {
      console.error('Error consuming messages:', error);
    }
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async disconnect() {
    await Promise.all([
      this.producer
        ?.disconnect()
        .catch((error) =>
          console.error('Producer disconnection error:', error),
        ),
      this.consumer
        ?.disconnect()
        .catch((error) =>
          console.error('Consumer disconnection error:', error),
        ),
    ]);
  }
}
