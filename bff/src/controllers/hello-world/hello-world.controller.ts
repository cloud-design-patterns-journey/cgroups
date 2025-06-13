import { Controller, Get } from '@nestjs/common';
import { HelloWorldApi } from '../../services';

@Controller()
export class HelloWorldController {
  constructor(private readonly service: HelloWorldApi) {}

  @Get()
  async getHello(): Promise<string> {
    const greeting = await this.service.getHello();
    console.log(greeting);
    return greeting.greeting;
  }
}
