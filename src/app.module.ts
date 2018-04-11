import { Module } from '@nestjs/common';
import { AlipayModule } from './alipay';

@Module({
  imports: [
    AlipayModule,
  ]
})
export class AppModule {};
