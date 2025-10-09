import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useConfig } from './useConfig'

interface ModuleLoaderProps {
  moduleId: string
  fallback?: React.ComponentType
  loading?: React.ComponentType
}

export const useModule = ({ moduleId, fallback, loading }: ModuleLoaderProps) => {
  const { checkModulePermission, getModuleConfig } = useConfig()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 检查模块权限
  const hasPermission = useMemo(() => {
    return checkModulePermission(moduleId)
  }, [moduleId, checkModulePermission])

  // 获取模块配置
  const moduleConfig = useMemo(() => {
    return getModuleConfig(moduleId)
  }, [moduleId, getModuleConfig])

  // 动态加载模块
  const Module = useMemo(() => {
    if (!hasPermission || !moduleConfig?.enabled) {
      return fallback || null
    }

    return dynamic(
      () => import(`@/modules/${moduleId}`),
      {
        loading: () => {
          setIsLoading(true)
          return loading ? <loading /> : <div>Loading...</div>
        },
        ssr: false
      }
    )
  }, [moduleId, hasPermission, moduleConfig?.enabled, fallback, loading])

  // 预加载模块
  const preloadModule = async () => {
    if (!hasPermission || !moduleConfig?.enabled) return

    try {
      setIsLoading(true)
      setError(null)
      
      // 预加载模块
      await import(`@/modules/${moduleId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '模块加载失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 卸载模块
  const unloadModule = () => {
    // 这里可以实现模块卸载逻辑
    // 例如清理模块相关的状态、事件监听器等
  }

  return {
    Module,
    hasPermission,
    moduleConfig,
    isLoading,
    error,
    preloadModule,
    unloadModule,
    isEnabled: moduleConfig?.enabled || false
  }
}

// 模块渲染器组件
export const ModuleRenderer: React.FC<ModuleLoaderProps> = ({ 
  moduleId, 
  fallback, 
  loading 
}) => {
  const { Module, hasPermission, isEnabled, error } = useModule({ 
    moduleId, 
    fallback, 
    loading 
  })

  if (error) {
    return <div className="text-red-500">模块加载错误: {error}</div>
  }

  if (!hasPermission || !isEnabled) {
    return fallback ? <fallback /> : null
  }

  return Module ? <Module /> : null
}
