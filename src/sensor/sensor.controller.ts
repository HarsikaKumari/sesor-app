import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post('mock-data')
  handleMockData(
    @Headers('x-api-key') apiKey: string,
    @Body()
    body: {
      action: string;
      indicator: string;
      range: { min: number; max: number };
    },
  ) {
    if (apiKey !== process.env.API_KEY) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.sensorService.handleMockData(body);
  }
}
