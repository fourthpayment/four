import { Module } from '@nestjs/common';
import controllers from './controllers/index';

@Module({
  controllers,
})
export class AlipayModule {};
