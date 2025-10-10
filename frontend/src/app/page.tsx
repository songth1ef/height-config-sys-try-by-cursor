'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useConfig } from '@/hooks/useConfig'
import { useI18n } from '@/hooks/useI18n'
import HomeModule from '@/modules/home'
import DashboardModule from '@/modules/dashboard'
import ProfileModule from '@/modules/profile'
import SettingsModule from '@/modules/settings'

export default function Home() {
  const { isAuthenticated, user, login, logout, isLoading: authLoading } = useAuthStore()
  const { config, isLoading, fetchUserConfig } = useConfig()
  const { t } = useI18n()
  const [currentPage, setCurrentPage] = useState('home')

  // 调试日志
  console.log('主页面状态:', { isAuthenticated, isLoading, config, user })

  // 处理登录
  const handleLogin = async () => {
    try {
      // 临时使用测试账号
      await login({
        email: 'test@example.com',
        password: 'password123'
      })
      // 登录成功后获取用户配置
      if (fetchUserConfig) {
        await fetchUserConfig()
      }
    } catch (error) {
      console.error('登录失败:', error)
      alert('登录失败，请检查邮箱和密码')
    }
  }

  // 处理注册
  const handleRegister = async () => {
    try {
      // 临时使用测试数据
      await login({
        email: 'newuser@example.com',
        password: 'password123'
      })
      // 注册成功后获取用户配置
      if (fetchUserConfig) {
        await fetchUserConfig()
      }
    } catch (error) {
      console.error('注册失败:', error)
      alert('注册失败，请稍后重试')
    }
  }

  // 处理退出
  const handleLogout = () => {
    logout()
  }

  if (isLoading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
          <p className="text-sm text-gray-500 mt-2">
            配置加载中... {isLoading ? 'loading' : 'no config'}
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">高可配置动态系统</h1>
          <p className="text-gray-600 text-center mb-8">
            基于配置驱动的动态系统，支持多语言、多主题、模块化加载
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleLogin}
              disabled={authLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? '登录中...' : t('auth.login')}
            </button>
            <button 
              onClick={handleRegister}
              disabled={authLoading}
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? '注册中...' : t('auth.register')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">高可配置动态系统</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎，{user?.name}</span>
              <button 
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 侧边栏 */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">导航菜单</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setCurrentPage('home')}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  currentPage === 'home' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                首页
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  currentPage === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                仪表板
              </button>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  currentPage === 'profile' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                个人资料
              </button>
              <button
                onClick={() => setCurrentPage('settings')}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  currentPage === 'settings' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                设置
              </button>
            </nav>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1">
          {currentPage === 'home' && <HomeModule />}
          {currentPage === 'dashboard' && <DashboardModule />}
          {currentPage === 'profile' && <ProfileModule />}
          {currentPage === 'settings' && <SettingsModule />}
        </main>
      </div>
    </div>
  )
}