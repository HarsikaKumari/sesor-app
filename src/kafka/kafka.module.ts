import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConsumerService } from "./kafka.consumer.service";
import { ProducerService } from "./kafka.producer.service";

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule implements OnApplicationBootstrap {
  constructor(private producerService: ProducerService) {}

  async onApplicationBootstrap() {
    // Sending a sample message on application start
    await this.producerService.produce("sensor-data", {
      key: "test-key",
      value: JSON.stringify({ message: "Hello Kafka!" }),
    });
  }
}
