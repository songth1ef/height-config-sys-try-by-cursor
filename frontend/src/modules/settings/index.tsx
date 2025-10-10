'use client'

import React, { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useConfig } from '@/hooks/useConfig'
import { useI18n } from '@/hooks/useI18n'

const SettingsModule: React.FC = () => {
  const { user } = useAuthStore()
  const { config, updateUserConfig } = useConfig()
  const { t, currentLanguage, changeLanguage, supportedLanguages } = useI18n()
  const [isSaving, setIsSaving] = useState(false)

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await changeLanguage(languageCode)
    } catch (error) {
      console.error('语言切换失败:', error)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // 这里可以保存其他设置
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟保存
      alert('设置保存成功！')
    } catch (error) {
      console.error('设置保存失败:', error)
      alert('设置保存失败！')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>
      
      <div className="max-w-2xl space-y-6">
        {/* 个人信息设置 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">个人信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 界面设置 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">界面设置</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">主题</label>
              <select
                defaultValue="default"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">默认主题</option>
                <option value="dark">深色主题</option>
                <option value="light">浅色主题</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">布局</label>
              <select
                defaultValue="dashboard"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dashboard">仪表板布局</option>
                <option value="sidebar">侧边栏布局</option>
                <option value="topbar">顶部栏布局</option>
              </select>
            </div>
          </div>
        </div>

        {/* 模块设置 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">模块设置</h2>
          <div className="space-y-3">
            {config?.userConfig?.modules?.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h3 className="font-medium">{module.id}</h3>
                  <p className="text-sm text-gray-600">{module.path}</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={module.enabled}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">启用</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 安全设置 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">安全设置</h2>
          <div className="space-y-4">
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
              <div className="font-medium">修改密码</div>
              <div className="text-sm text-gray-600">定期更新密码以保护账户安全</div>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
              <div className="font-medium">两步验证</div>
              <div className="text-sm text-gray-600">为账户添加额外的安全保护</div>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
              <div className="font-medium">登录历史</div>
              <div className="text-sm text-gray-600">查看最近的登录活动</div>
            </button>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModule
