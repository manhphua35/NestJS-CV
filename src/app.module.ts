import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Thiết lập ConfigModule là module toàn cục
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql12.freesqldatabase.com',
      port: 3306,
      username: 'sql12731973',
      password: 'Rpu89MgJPr',
      database: 'sql12731973',
      entities: [User],
      synchronize: true,
      charset: 'utf8mb4', 

    }),
    UsersModule, // Import UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
