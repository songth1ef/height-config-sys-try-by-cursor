import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async getLanguages() {
    return this.prisma.language.findMany({
      where: { enabled: true },
      orderBy: { code: 'asc' },
    });
  }

  async getLanguageByCode(code: string) {
    return this.prisma.language.findUnique({
      where: { code },
    });
  }

  async getThemes() {
    return this.prisma.theme.findMany({
      where: { enabled: true },
      orderBy: { name: 'asc' },
    });
  }

  async getThemeById(id: string) {
    return this.prisma.theme.findUnique({
      where: { id },
    });
  }

  async getDefaultTheme() {
    return this.prisma.theme.findFirst({
      where: { isDefault: true, enabled: true },
    });
  }
}
