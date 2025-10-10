import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

interface ModuleLoaderProps {
  moduleId: string
  fallback?: React.ComponentType
  loading?: React.ComponentType
}

export const useModule = ({ moduleId, fallback, loading }: ModuleLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 动态加载模块
  const Module = useMemo(() => {
    return dynamic(
      () => import(`@/modules/${moduleId}`),
      {
        loading: () => {
          setIsLoading(true)
          return React.createElement('div', null, 'Loading...')
        },
        ssr: false
      }
    )
  }, [moduleId])

  // 预加载模块
  const preloadModule = async () => {
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
  }

  return {
    Module,
    isLoading,
    error,
    preloadModule,
    unloadModule,
    isEnabled: true
  }
}

// 模块渲染器组件
export const ModuleRenderer: React.FC<ModuleLoaderProps> = ({ 
  moduleId, 
  fallback, 
  loading 
}) => {
  const { Module, isEnabled, error } = useModule({ 
    moduleId, 
    fallback, 
    loading 
  })

  if (error) {
    return React.createElement('div', { className: 'text-red-500' }, `模块加载错误: ${error}`)
  }

  if (!isEnabled) {
    return null
  }

  return Module ? React.createElement(Module) : null
}