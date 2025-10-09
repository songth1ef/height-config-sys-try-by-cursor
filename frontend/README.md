# 高可配置动态系统 - 前端

基于 Next.js 15 + TypeScript + TailwindCSS 的前端应用。

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

## 🏗️ 项目结构

```
src/
├── app/              # Next.js App Router
├── modules/          # 功能模块（动态加载）
│   ├── home/        # 首页模块
│   └── profile/     # 用户资料模块
├── configs/         # 默认配置
├── hooks/           # 自定义 Hooks
├── services/        # API 服务
├── providers/       # 上下文提供者
├── stores/          # Zustand 状态管理
├── types/           # TypeScript 类型定义
└── components/      # 通用组件
```

## 🔧 主要功能

- **配置驱动渲染**: 基于 JSON 配置控制前端渲染
- **动态模块加载**: 按需加载功能模块
- **状态管理**: Zustand + Immer
- **类型安全**: TypeScript + Zod
- **样式系统**: TailwindCSS + CSS Variables

## 📝 开发命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 🎯 核心概念

### 配置驱动架构

前端渲染完全由配置文件控制，支持：
- 模块启用/禁用
- 权限控制
- 属性配置
- 布局自定义

### 动态模块加载

使用 `next/dynamic` 实现模块懒加载：
```typescript
const Module = dynamic(() => import(`@/modules/${moduleId}`))
```

### 状态管理

使用 Zustand 管理全局状态：
- 用户认证状态
- 配置状态
- 模块状态