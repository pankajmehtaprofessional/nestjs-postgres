import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './utils/database.module';
import { UsersModule } from './modules/users/users.module';
import { AllExceptionsFilter } from './middlewares/exception/http-exception.filter';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
