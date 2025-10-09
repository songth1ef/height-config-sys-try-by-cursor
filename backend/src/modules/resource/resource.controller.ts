import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResourceService } from './resource.service';

@ApiTags('资源')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('languages')
  @ApiOperation({ summary: '获取所有语言包' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getLanguages() {
    return this.resourceService.getLanguages();
  }

  @Get('languages/:code')
  @ApiOperation({ summary: '根据代码获取语言包' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getLanguageByCode(@Param('code') code: string) {
    return this.resourceService.getLanguageByCode(code);
  }

  @Get('themes')
  @ApiOperation({ summary: '获取所有主题' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getThemes() {
    return this.resourceService.getThemes();
  }

  @Get('themes/:id')
  @ApiOperation({ summary: '根据ID获取主题' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getThemeById(@Param('id') id: string) {
    return this.resourceService.getThemeById(id);
  }

  @Get('themes/default')
  @ApiOperation({ summary: '获取默认主题' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getDefaultTheme() {
    return this.resourceService.getDefaultTheme();
  }
}
