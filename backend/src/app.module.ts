import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule as UserConfigModule } from './modules/config/config.module';
import { ResourceModule } from './modules/resource/resource.module';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 数据库模块
    PrismaModule,
    
    // 业务模块
    AuthModule,
    UserModule,
    UserConfigModule,
    ResourceModule,
  ],
})
export class AppModule {}
