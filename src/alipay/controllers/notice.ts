import { Controller, Get } from '@nestjs/common';

@Controller('alipay')
export class NoticeController {
  @Get()
  test() {
    return 'haha, This is test.'
  }
}
