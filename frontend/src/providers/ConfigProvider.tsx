'use client'

import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { useConfig } from '@/hooks/useConfig'
import { useAuthStore } from '@/stores/authStore'
import '@/configs/i18n'

interface ConfigContextType {
  config: any
  isLoading: boolean
  error: string | null
  updateConfig: (updates: any) => Promise<void>
  checkPermission: (moduleId: string) => boolean
  checkPropertyPermission: (moduleId: string, propertyId: string) => boolean
}

const ConfigContext = createContext<ConfigContextType | null>(null)

interface ConfigProviderProps {
  children: ReactNode
  initialConfig?: any
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ 
  children, 
  initialConfig 
}) => {
  const configHook = useConfig()
  const { isAuthenticated } = useAuthStore()

  // 设置初始配置
  useEffect(() => {
    if (initialConfig && !configHook.userConfig) {
      configHook.setUserConfig(initialConfig)
    }
  }, [initialConfig, configHook.userConfig])

  // 用户登录后自动获取配置
  useEffect(() => {
    if (isAuthenticated && !configHook.userConfig) {
      configHook.fetchUserConfig()
    }
  }, [isAuthenticated, configHook.userConfig])

  const contextValue: ConfigContextType = {
    config: configHook.mergedConfig,
    isLoading: configHook.isLoading,
    error: configHook.error,
    updateConfig: configHook.updateUserConfig,
    checkPermission: configHook.checkModulePermission,
    checkPropertyPermission: configHook.checkPropertyPermission,
  }

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfigContext = () => {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider')
  }
  return context
}
