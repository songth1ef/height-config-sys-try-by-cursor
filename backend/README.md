# 高可配置动态系统 - 后端

基于 NestJS + Prisma + MySQL 的后端服务。

## 🚀 快速开始

### 环境要求

- Node.js 18+
- MySQL 8.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境配置

1. 复制环境配置文件：
```bash
cp env.example .env
```

2. 修改 `.env` 文件中的配置：
```env
DATABASE_URL="mysql://username:password@localhost:3306/height_config_sys"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
```

### 数据库设置

1. 生成 Prisma 客户端：
```bash
npm run prisma:generate
```

2. 运行数据库迁移：
```bash
npm run prisma:migrate
```

3. 初始化种子数据：
```bash
npx prisma db seed
```

### 启动服务

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## 📚 API 文档

启动服务后，访问 `http://localhost:3001/api/docs` 查看 Swagger API 文档。

## 🏗️ 项目结构

```
src/
├── modules/           # 业务模块
│   ├── auth/         # 认证模块
│   ├── user/         # 用户模块
│   ├── config/       # 配置模块
│   └── resource/     # 资源模块
├── common/           # 通用模块
├── database/         # 数据库模块
└── main.ts          # 应用入口
```

## 🔧 主要功能

- **认证系统**: JWT + Refresh Token
- **用户管理**: 用户信息 CRUD
- **配置管理**: 用户个性化配置
- **资源管理**: 语言包、主题包管理
- **API 文档**: Swagger 自动生成

## 📝 开发命令

```bash
# 开发
npm run start:dev

# 构建
npm run build

# 测试
npm run test

# 代码格式化
npm run format

# 数据库管理
npm run prisma:studio
```
