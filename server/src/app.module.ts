import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { TagEntity } from './entities/tag.entity';
import { StsController } from './sts/sts.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    TypeOrmModule.forFeature([TagEntity]),
    AuthModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController, StsController],
  providers: [AppService],
})
export class AppModule {}
