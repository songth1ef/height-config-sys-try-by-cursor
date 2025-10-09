import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '邮箱地址', example: 'user@example.com' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString()
  @MinLength(6, { message: '密码至少6位' })
  password: string;

  @ApiProperty({ description: '记住登录状态', required: false, default: false })
  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: '张三' })
  @IsString()
  @MinLength(2, { message: '用户名至少2位' })
  name: string;

  @ApiProperty({ description: '邮箱地址', example: 'user@example.com' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString()
  @MinLength(6, { message: '密码至少6位' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: '刷新令牌' })
  @IsString()
  refreshToken: string;
}
