import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigService } from './config.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('配置')
@Controller('config')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('user')
  @ApiOperation({ summary: '获取用户配置' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getUserConfig(@Request() req) {
    return this.configService.getUserConfig(req.user.id);
  }

  @Put('user')
  @ApiOperation({ summary: '更新用户配置' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateUserConfig(@Request() req, @Body() config: any) {
    return this.configService.updateUserConfig(req.user.id, config);
  }
}
