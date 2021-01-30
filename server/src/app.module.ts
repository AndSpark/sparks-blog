import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { DatabaseConnectionService } from './database-connection.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname,'../.env'),
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useClass:DatabaseConnectionService
    })
    ,
    ArticleModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
