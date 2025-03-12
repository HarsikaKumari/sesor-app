import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Device } from "./device.entity";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { generateApiKey } from "src/utils/generateApiKey";
import { generateUniqueCode } from "src/utils/generate-unique-code";

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async create(data: CreateDeviceDto): Promise<Device> {
    const device = this.deviceRepository.create(data);
    device.code = generateUniqueCode("dev");
    device.token = generateApiKey();
    return this.deviceRepository.save(device);
  }

  async findByDeviceId(deviceId: string): Promise<Device | null> {
    return this.deviceRepository.findOne({ where: { id: deviceId } });
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find({ relations: ["sensorData"] });
  }
}
