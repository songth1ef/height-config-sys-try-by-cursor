'use client'

import React from 'react'
import { useConfig } from '@/hooks/useConfig'
import { ModuleRenderer } from '@/hooks/useModule'

const HomeModule: React.FC = () => {
  const { getModuleConfig, checkPropertyPermission } = useConfig()
  const moduleConfig = getModuleConfig('home')

  if (!moduleConfig) {
    return <div>模块配置未找到</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">首页</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 欢迎横幅 */}
        {checkPropertyPermission('home', 'welcome-banner') && (
          <div className="col-span-full">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">欢迎回来！</h2>
              <p>这是您的个性化首页，您可以根据需要自定义显示内容。</p>
            </div>
          </div>
        )}

        {/* 快捷操作 */}
        {checkPropertyPermission('home', 'quick-actions') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">快捷操作</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                查看个人资料
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                系统设置
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                帮助文档
              </button>
            </div>
          </div>
        )}

        {/* 最近活动 */}
        {checkPropertyPermission('home', 'recent-activities') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">最近活动</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">登录系统</span>
                <span className="text-xs text-gray-500 ml-auto">刚刚</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">更新个人资料</span>
                <span className="text-xs text-gray-500 ml-auto">1小时前</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">修改密码</span>
                <span className="text-xs text-gray-500 ml-auto">2天前</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 子模块 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">子模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleConfig.children?.map((child) => (
            <ModuleRenderer
              key={child.id}
              moduleId={child.id}
              fallback={() => (
                <div className="p-4 border rounded-lg">
                  <p>模块 {child.id} 未启用或无权限访问</p>
                </div>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeModule
