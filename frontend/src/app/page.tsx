'use client'

import { useAuthStore } from '@/stores/authStore'
import { useConfig } from '@/hooks/useConfig'
import { ModuleRenderer } from '@/hooks/useModule'

export default function Home() {
  const { isAuthenticated, user } = useAuthStore()
  const { config, isLoading } = useConfig()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
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
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              登录
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50">
              注册
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
              <button className="text-sm text-blue-600 hover:text-blue-800">
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
              {config?.userConfig.modules.map((module) => (
                <a
                  key={module.id}
                  href={module.path}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  {module.id}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1">
          <ModuleRenderer
            moduleId="home"
            fallback={() => (
              <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">欢迎使用高可配置动态系统</h1>
                <p className="text-gray-600">
                  这是一个基于配置驱动的动态系统演示。您可以根据配置控制模块的显示和功能。
                </p>
              </div>
            )}
          />
        </main>
      </div>
    </div>
  )
}