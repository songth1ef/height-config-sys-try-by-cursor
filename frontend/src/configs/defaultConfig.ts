import { DefaultConfig } from '@/types/config'

export const defaultConfig: DefaultConfig = {
  lang: 'zh-CN',
  themeUrl: '/themes/default.css',
  layout: 'dashboard',
  modules: [
    {
      id: 'home',
      path: '/home',
      enabled: true,
      permissions: ['user', 'admin'],
      properties: [
        {
          id: 'welcome-banner',
          globalLabel: 'global.pages.home.property.welcome-banner',
          show: true
        },
        {
          id: 'quick-actions',
          globalLabel: 'global.pages.home.property.quick-actions',
          show: true
        },
        {
          id: 'recent-activities',
          globalLabel: 'global.pages.home.property.recent-activities',
          show: true
        }
      ],
      children: [
        {
          id: 'profile',
          path: '/home/profile',
          enabled: true,
          permissions: ['user'],
          properties: []
        },
        {
          id: 'settings',
          path: '/home/settings',
          enabled: true,
          permissions: ['user'],
          properties: []
        }
      ]
    },
    {
      id: 'dashboard',
      path: '/dashboard',
      enabled: true,
      permissions: ['user', 'admin'],
      properties: [
        {
          id: 'stats-cards',
          globalLabel: 'global.pages.dashboard.property.stats-cards',
          show: true
        },
        {
          id: 'charts',
          globalLabel: 'global.pages.dashboard.property.charts',
          show: true
        },
        {
          id: 'recent-orders',
          globalLabel: 'global.pages.dashboard.property.recent-orders',
          show: true
        }
      ],
      children: []
    },
    {
      id: 'admin',
      path: '/admin',
      enabled: false,
      permissions: ['admin'],
      properties: [
        {
          id: 'user-management',
          globalLabel: 'global.pages.admin.property.user-management',
          show: true
        },
        {
          id: 'system-settings',
          globalLabel: 'global.pages.admin.property.system-settings',
          show: true
        },
        {
          id: 'logs',
          globalLabel: 'global.pages.admin.property.logs',
          show: false
        }
      ],
      children: [
        {
          id: 'users',
          path: '/admin/users',
          enabled: true,
          permissions: ['admin'],
          properties: []
        },
        {
          id: 'settings',
          path: '/admin/settings',
          enabled: true,
          permissions: ['admin'],
          properties: []
        }
      ]
    }
  ],
  permissions: [
    {
      type: 'role',
      value: 'user'
    },
    {
      type: 'role',
      value: 'admin'
    }
  ]
}
