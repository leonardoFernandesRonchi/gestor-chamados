import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@/modules/Users/users.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import { CompaniesModule } from '@/modules/Companies/companies.module';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [
    UsersModule,
    DepartmentsModule,
    CompaniesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    DepartmentsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
