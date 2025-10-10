import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始数据库种子数据初始化...');

  // 创建测试用户
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: '测试用户',
      password: hashedPassword,
      role: ['user'],
    },
  });

  // 创建测试用户配置
  await prisma.userConfig.upsert({
    where: { userId: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      lang: 'zh-CN',
      themeUrl: '/themes/default.css',
      layout: 'dashboard',
      config: {
        modules: [
          {
            id: 'home',
            enabled: true,
            properties: {
              'welcome-banner': { show: true },
              'quick-actions': { show: true },
              'recent-activities': { show: true },
            },
          },
          {
            id: 'dashboard',
            enabled: true,
            properties: {
              'stats-cards': { show: true },
              'charts': { show: true },
              'recent-orders': { show: true },
            },
          },
          {
            id: 'profile',
            enabled: true,
            properties: {},
          },
        ],
      },
      version: 1,
    },
  });

  // 创建默认模块
  const modules = [
    {
      name: 'home',
      path: '/home',
      enabled: true,
      permissions: ['user', 'admin'],
      properties: {
        'welcome-banner': { show: true },
        'quick-actions': { show: true },
        'recent-activities': { show: true },
      },
      order: 1,
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      enabled: true,
      permissions: ['user', 'admin'],
      properties: {
        'stats-cards': { show: true },
        'charts': { show: true },
        'recent-orders': { show: true },
      },
      order: 2,
    },
    {
      name: 'profile',
      path: '/home/profile',
      enabled: true,
      permissions: ['user'],
      properties: {},
      order: 3,
    },
    {
      name: 'admin',
      path: '/admin',
      enabled: false,
      permissions: ['admin'],
      properties: {
        'user-management': { show: true },
        'system-settings': { show: true },
        'logs': { show: false },
      },
      order: 4,
    },
  ];

  for (const module of modules) {
    await prisma.module.upsert({
      where: { name: module.name },
      update: module,
      create: module,
    });
  }

  // 创建默认语言包
  const languages = [
    {
      code: 'zh-CN',
      name: '简体中文',
      content: {
        'global.pages.home.property.welcome-banner': '欢迎横幅',
        'global.pages.home.property.quick-actions': '快捷操作',
        'global.pages.home.property.recent-activities': '最近活动',
        'global.pages.dashboard.property.stats-cards': '统计卡片',
        'global.pages.dashboard.property.charts': '图表',
        'global.pages.dashboard.property.recent-orders': '最近订单',
        'global.pages.admin.property.user-management': '用户管理',
        'global.pages.admin.property.system-settings': '系统设置',
        'global.pages.admin.property.logs': '日志',
      },
      version: '1.0.0',
      enabled: true,
    },
    {
      code: 'en-US',
      name: 'English',
      content: {
        'global.pages.home.property.welcome-banner': 'Welcome Banner',
        'global.pages.home.property.quick-actions': 'Quick Actions',
        'global.pages.home.property.recent-activities': 'Recent Activities',
        'global.pages.dashboard.property.stats-cards': 'Stats Cards',
        'global.pages.dashboard.property.charts': 'Charts',
        'global.pages.dashboard.property.recent-orders': 'Recent Orders',
        'global.pages.admin.property.user-management': 'User Management',
        'global.pages.admin.property.system-settings': 'System Settings',
        'global.pages.admin.property.logs': 'Logs',
      },
      version: '1.0.0',
      enabled: true,
    },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { code: language.code },
      update: language,
      create: language,
    });
  }

  // 创建默认主题
  const themes = [
    {
      name: 'default',
      url: '/themes/default.css',
      css: ':root{--primary-color:#3b82f6;--secondary-color:#64748b;--background-color:#ffffff;--text-color:#1e293b;--border-color:#e2e8f0;}',
      version: '1.0.0',
      enabled: true,
      isDefault: true,
    },
    {
      name: 'dark',
      url: '/themes/dark.css',
      css: ':root{--primary-color:#60a5fa;--secondary-color:#94a3b8;--background-color:#1e293b;--text-color:#f1f5f9;--border-color:#334155;}',
      version: '1.0.0',
      enabled: true,
      isDefault: false,
    },
  ];

  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { name: theme.name },
      update: theme,
      create: theme,
    });
  }

  // 创建系统配置
  const systemConfigs = [
    {
      key: 'app_name',
      value: '高可配置动态系统',
      type: 'string',
      category: 'general',
    },
    {
      key: 'app_version',
      value: '1.0.0',
      type: 'string',
      category: 'general',
    },
    {
      key: 'default_language',
      value: 'zh-CN',
      type: 'string',
      category: 'i18n',
    },
    {
      key: 'default_theme',
      value: 'default',
      type: 'string',
      category: 'theme',
    },
  ];

  for (const config of systemConfigs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: config,
      create: config,
    });
  }

  console.log('✅ 数据库种子数据初始化完成！');
}

main()
  .catch((e) => {
    console.error('❌ 数据库种子数据初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
