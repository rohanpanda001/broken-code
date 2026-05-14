import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluationModule } from './evaluation/evaluation.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, EvaluationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
