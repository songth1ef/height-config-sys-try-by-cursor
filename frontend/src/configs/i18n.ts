import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 默认语言包
const resources = {
  'zh-CN': {
    translation: {
      // 通用
      'common.loading': '加载中...',
      'common.error': '错误',
      'common.success': '成功',
      'common.cancel': '取消',
      'common.confirm': '确认',
      'common.save': '保存',
      'common.edit': '编辑',
      'common.delete': '删除',
      'common.add': '添加',
      'common.search': '搜索',
      'common.reset': '重置',
      'common.submit': '提交',
      'common.back': '返回',
      'common.next': '下一步',
      'common.previous': '上一步',
      'common.close': '关闭',
      'common.open': '打开',
      'common.refresh': '刷新',
      'common.retry': '重试',
      
      // 认证
      'auth.login': '登录',
      'auth.logout': '退出',
      'auth.register': '注册',
      'auth.email': '邮箱',
      'auth.password': '密码',
      'auth.confirmPassword': '确认密码',
      'auth.rememberMe': '记住我',
      'auth.forgotPassword': '忘记密码？',
      'auth.loginSuccess': '登录成功',
      'auth.logoutSuccess': '退出成功',
      'auth.registerSuccess': '注册成功',
      'auth.loginFailed': '登录失败',
      'auth.registerFailed': '注册失败',
      'auth.invalidCredentials': '邮箱或密码错误',
      'auth.emailExists': '邮箱已被注册',
      'auth.passwordTooShort': '密码至少6位',
      'auth.invalidEmail': '请输入有效的邮箱地址',
      
      // 用户
      'user.profile': '个人资料',
      'user.settings': '设置',
      'user.name': '姓名',
      'user.avatar': '头像',
      'user.role': '角色',
      'user.permissions': '权限',
      'user.createdAt': '注册时间',
      'user.updatedAt': '更新时间',
      'user.editProfile': '编辑资料',
      'user.changePassword': '修改密码',
      'user.currentPassword': '当前密码',
      'user.newPassword': '新密码',
      'user.confirmNewPassword': '确认新密码',
      
      // 导航
      'nav.home': '首页',
      'nav.dashboard': '仪表板',
      'nav.profile': '个人资料',
      'nav.settings': '设置',
      'nav.admin': '管理',
      'nav.users': '用户管理',
      'nav.system': '系统设置',
      'nav.logs': '日志',
      
      // 首页模块
      'home.welcome': '欢迎回来！',
      'home.welcomeMessage': '这是您的个性化首页，您可以根据需要自定义显示内容。',
      'home.quickActions': '快捷操作',
      'home.recentActivities': '最近活动',
      'home.viewProfile': '查看个人资料',
      'home.systemSettings': '系统设置',
      'home.helpDocs': '帮助文档',
      'home.loginSystem': '登录系统',
      'home.updateProfile': '更新个人资料',
      'home.changePassword': '修改密码',
      'home.justNow': '刚刚',
      'home.hoursAgo': '小时前',
      'home.daysAgo': '天前',
      
      // 配置
      'config.language': '语言',
      'config.theme': '主题',
      'config.layout': '布局',
      'config.modules': '模块',
      'config.permissions': '权限',
      'config.saveSuccess': '配置保存成功',
      'config.saveFailed': '配置保存失败',
      'config.loadFailed': '配置加载失败',
      
      // 模块
      'module.loading': '模块加载中...',
      'module.loadFailed': '模块加载失败',
      'module.notFound': '模块未找到',
      'module.noPermission': '无权限访问此模块',
      'module.disabled': '模块已禁用',
      
      // 错误
      'error.network': '网络错误',
      'error.server': '服务器错误',
      'error.unauthorized': '未授权访问',
      'error.forbidden': '禁止访问',
      'error.notFound': '页面未找到',
      'error.internal': '内部错误',
      'error.timeout': '请求超时',
      'error.unknown': '未知错误',
      
      // 页面属性
      'global.pages.home.property.welcome-banner': '欢迎横幅',
      'global.pages.home.property.quick-actions': '快捷操作',
      'global.pages.home.property.recent-activities': '最近活动',
      'global.pages.dashboard.property.stats-cards': '统计卡片',
      'global.pages.dashboard.property.charts': '图表',
      'global.pages.dashboard.property.recent-orders': '最近订单',
      'global.pages.admin.property.user-management': '用户管理',
      'global.pages.admin.property.system-settings': '系统设置',
      'global.pages.admin.property.logs': '日志',
    }
  },
  'en-US': {
    translation: {
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',
      'common.save': 'Save',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.add': 'Add',
      'common.search': 'Search',
      'common.reset': 'Reset',
      'common.submit': 'Submit',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.close': 'Close',
      'common.open': 'Open',
      'common.refresh': 'Refresh',
      'common.retry': 'Retry',
      
      // Auth
      'auth.login': 'Login',
      'auth.logout': 'Logout',
      'auth.register': 'Register',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.rememberMe': 'Remember Me',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.loginSuccess': 'Login successful',
      'auth.logoutSuccess': 'Logout successful',
      'auth.registerSuccess': 'Registration successful',
      'auth.loginFailed': 'Login failed',
      'auth.registerFailed': 'Registration failed',
      'auth.invalidCredentials': 'Invalid email or password',
      'auth.emailExists': 'Email already exists',
      'auth.passwordTooShort': 'Password must be at least 6 characters',
      'auth.invalidEmail': 'Please enter a valid email address',
      
      // User
      'user.profile': 'Profile',
      'user.settings': 'Settings',
      'user.name': 'Name',
      'user.avatar': 'Avatar',
      'user.role': 'Role',
      'user.permissions': 'Permissions',
      'user.createdAt': 'Created At',
      'user.updatedAt': 'Updated At',
      'user.editProfile': 'Edit Profile',
      'user.changePassword': 'Change Password',
      'user.currentPassword': 'Current Password',
      'user.newPassword': 'New Password',
      'user.confirmNewPassword': 'Confirm New Password',
      
      // Navigation
      'nav.home': 'Home',
      'nav.dashboard': 'Dashboard',
      'nav.profile': 'Profile',
      'nav.settings': 'Settings',
      'nav.admin': 'Admin',
      'nav.users': 'User Management',
      'nav.system': 'System Settings',
      'nav.logs': 'Logs',
      
      // Home module
      'home.welcome': 'Welcome back!',
      'home.welcomeMessage': 'This is your personalized homepage. You can customize the display content as needed.',
      'home.quickActions': 'Quick Actions',
      'home.recentActivities': 'Recent Activities',
      'home.viewProfile': 'View Profile',
      'home.systemSettings': 'System Settings',
      'home.helpDocs': 'Help Documentation',
      'home.loginSystem': 'Login System',
      'home.updateProfile': 'Update Profile',
      'home.changePassword': 'Change Password',
      'home.justNow': 'Just now',
      'home.hoursAgo': 'hours ago',
      'home.daysAgo': 'days ago',
      
      // Config
      'config.language': 'Language',
      'config.theme': 'Theme',
      'config.layout': 'Layout',
      'config.modules': 'Modules',
      'config.permissions': 'Permissions',
      'config.saveSuccess': 'Configuration saved successfully',
      'config.saveFailed': 'Failed to save configuration',
      'config.loadFailed': 'Failed to load configuration',
      
      // Module
      'module.loading': 'Loading module...',
      'module.loadFailed': 'Failed to load module',
      'module.notFound': 'Module not found',
      'module.noPermission': 'No permission to access this module',
      'module.disabled': 'Module is disabled',
      
      // Error
      'error.network': 'Network error',
      'error.server': 'Server error',
      'error.unauthorized': 'Unauthorized access',
      'error.forbidden': 'Access forbidden',
      'error.notFound': 'Page not found',
      'error.internal': 'Internal error',
      'error.timeout': 'Request timeout',
      'error.unknown': 'Unknown error',
      
      // Page properties
      'global.pages.home.property.welcome-banner': 'Welcome Banner',
      'global.pages.home.property.quick-actions': 'Quick Actions',
      'global.pages.home.property.recent-activities': 'Recent Activities',
      'global.pages.dashboard.property.stats-cards': 'Stats Cards',
      'global.pages.dashboard.property.charts': 'Charts',
      'global.pages.dashboard.property.recent-orders': 'Recent Orders',
      'global.pages.admin.property.user-management': 'User Management',
      'global.pages.admin.property.system-settings': 'System Settings',
      'global.pages.admin.property.logs': 'Logs',
    }
  }
}

// 初始化 i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
