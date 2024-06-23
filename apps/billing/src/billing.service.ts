import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  bill(data: any) {
 return this.logger.log(`Billing for order `,data)
  }
  getHello(): string {
    return 'Hello World!';
  }
}
