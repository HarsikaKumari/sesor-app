import { Controller, Post, Body, Get } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { CreateDeviceDto } from "./dto/create-device.dto";

@Controller("devices")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() data: CreateDeviceDto) {
    console.log(Body);
    return this.deviceService.create(data);
  }

  @Get()
  async findAll() {
    return this.deviceService.findAll();
  }
}
