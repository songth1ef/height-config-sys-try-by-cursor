import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ConfigService {
  constructor(private prisma: PrismaService) {}

  async getUserConfig(userId: string) {
    const userConfig = await this.prisma.userConfig.findUnique({
      where: { userId },
    });

    if (!userConfig) {
      // 创建默认配置
      return this.createDefaultUserConfig(userId);
    }

    // 返回完整的用户配置对象，包含 userConfig 字段
    return {
      id: userConfig.id,
      userConfig: userConfig.config,
      version: userConfig.version,
      createdAt: userConfig.createdAt,
      updatedAt: userConfig.updatedAt,
    };
  }

  async updateUserConfig(userId: string, config: any) {
    const userConfig = await this.prisma.userConfig.upsert({
      where: { userId },
      update: {
        config,
        version: { increment: 1 },
      },
      create: {
        userId,
        config,
      },
    });

    // 返回完整的用户配置对象，包含 userConfig 字段
    return {
      id: userConfig.id,
      userConfig: userConfig.config,
      version: userConfig.version,
      createdAt: userConfig.createdAt,
      updatedAt: userConfig.updatedAt,
    };
  }

  async getDefaultModules() {
    return this.prisma.module.findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
    });
  }

  async createDefaultUserConfig(userId: string) {
    const defaultModules = await this.getDefaultModules();
    
    const defaultConfig = {
      lang: 'zh-CN',
      themeUrl: '/themes/default.css',
      layout: 'dashboard',
      modules: defaultModules.map(module => ({
        id: module.name,
        path: module.path,
        enabled: module.enabled,
        permissions: module.permissions,
        properties: module.properties,
      })),
    };

    const userConfig = await this.prisma.userConfig.create({
      data: {
        userId,
        config: defaultConfig,
      },
    });

    // 返回完整的用户配置对象，包含 userConfig 字段
    return {
      id: userConfig.id,
      userConfig: userConfig.config,
      version: userConfig.version,
      createdAt: userConfig.createdAt,
      updatedAt: userConfig.updatedAt,
    };
  }
}
