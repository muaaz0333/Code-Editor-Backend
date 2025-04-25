import { Module } from '@nestjs/common';
import { CodeExecutionController } from './code.controller';
import { CodeExecutionService } from './code.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './code.schema';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? (() => {
      throw new Error('MONGODB_URI is not defined in environment variables');
    })()),
    MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }]),
  ],
  controllers: [CodeExecutionController],
  providers: [CodeExecutionService],
})
export class CodeModule {}
