import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async saving () {
    const obj = {
      label : 'Fan boy',
      value : 'number'
    }
   return await [obj];
  }
}
