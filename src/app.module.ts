import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RenderModule,
    CacheModule,
    ConfigModule,
    RenderModule,
    UsersModule,
    AuthModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/lussiun'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
