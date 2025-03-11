import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SensorService {
  private isSendingData = false;
  private interval: NodeJS.Timeout | null = null;
  private logger = new Logger(SensorService.name);

  handleMockData(payload: {
    action: string;
    indicator: string;
    range: { min: number; max: number };
  }) {
    const { action, indicator, range } = payload;

    if (action === 'start') {
      if (this.isSendingData) {
        return { message: 'Already sending data' };
      }
      this.isSendingData = true;
      this.startSendingData(indicator, range);
      return {
        message: `Started sending ${indicator} data in range ${range.min}-${range.max}`,
      };
    } else if (action === 'stop') {
      this.stopSendingData();
      return { message: 'Stopped sending data' };
    }
    return { message: 'Invalid action' };
  }

  private startSendingData(
    indicator: string,
    range: { min: number; max: number },
  ) {
    this.interval = setInterval(() => {
      const mockValue = Math.random() * (range.max - range.min) + range.min;
      this.logger.log(
        `Sending mock ${indicator} data: ${mockValue.toFixed(2)}`,
      );
    }, 1000);
  }

  private stopSendingData() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isSendingData = false;
  }
}
