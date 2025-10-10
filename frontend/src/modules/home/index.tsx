'use client'

import React from 'react'
import { useConfig } from '@/hooks/useConfig'
import { ModuleRenderer } from '@/hooks/useModule'
import { useI18n } from '@/hooks/useI18n'

const HomeModule: React.FC = () => {
  const { getModuleConfig, checkPropertyPermission } = useConfig()
  const { t } = useI18n()
  const moduleConfig = getModuleConfig('home')

  if (!moduleConfig) {
    return <div>{t('module.notFound')}</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('nav.home')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 欢迎横幅 */}
        {checkPropertyPermission('home', 'welcome-banner') && (
          <div className="col-span-full">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{t('home.welcome')}</h2>
              <p>{t('home.welcomeMessage')}</p>
            </div>
          </div>
        )}

        {/* 快捷操作 */}
        {checkPropertyPermission('home', 'quick-actions') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{t('home.quickActions')}</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                {t('home.viewProfile')}
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                {t('home.systemSettings')}
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded">
                {t('home.helpDocs')}
              </button>
            </div>
          </div>
        )}

        {/* 最近活动 */}
        {checkPropertyPermission('home', 'recent-activities') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{t('home.recentActivities')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{t('home.loginSystem')}</span>
                <span className="text-xs text-gray-500 ml-auto">{t('home.justNow')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{t('home.updateProfile')}</span>
                <span className="text-xs text-gray-500 ml-auto">{t('home.hoursAgo')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">{t('home.changePassword')}</span>
                <span className="text-xs text-gray-500 ml-auto">{t('home.daysAgo')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 子模块 - 暂时隐藏，因为配置中没有 children 字段 */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('config.modules')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleConfig.children?.map((child) => (
            <ModuleRenderer
              key={child.id}
              moduleId={child.id}
              fallback={() => (
                <div className="p-4 border rounded-lg">
                  <p>{t('module.noPermission')}</p>
                </div>
              )}
            />
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default HomeModule
