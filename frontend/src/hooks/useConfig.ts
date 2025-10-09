import { useConfigStore } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export const useConfig = () => {
  const configStore = useConfigStore()
  const authStore = useAuthStore()

  // 获取用户配置
  const fetchUserConfig = async () => {
    if (!authStore.isAuthenticated || !authStore.user) return

    try {
      configStore.setLoading(true)
      configStore.setError(null)

      const response = await fetch('/api/user/config', {
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('获取配置失败')
      }

      const userConfig = await response.json()
      configStore.setUserConfig(userConfig)
    } catch (error) {
      configStore.setError(error instanceof Error ? error.message : '获取配置失败')
    } finally {
      configStore.setLoading(false)
    }
  }

  // 更新用户配置
  const updateUserConfig = async (updates: any) => {
    if (!authStore.isAuthenticated) return

    try {
      configStore.setLoading(true)
      configStore.setError(null)

      const response = await fetch('/api/user/config', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('更新配置失败')
      }

      const updatedConfig = await response.json()
      configStore.setUserConfig(updatedConfig)
    } catch (error) {
      configStore.setError(error instanceof Error ? error.message : '更新配置失败')
    } finally {
      configStore.setLoading(false)
    }
  }

  // 检查模块权限
  const checkModulePermission = (moduleId: string): boolean => {
    const { mergedConfig } = configStore
    const { user } = authStore

    if (!mergedConfig || !user) return false

    const module = mergedConfig.userConfig.modules.find(m => m.id === moduleId)
    if (!module) return false

    // 检查模块是否启用
    if (!module.enabled) return false

    // 检查用户权限
    return module.permissions.some(permission => 
      user.role.includes(permission) || user.permissions.includes(permission)
    )
  }

  // 检查模块属性权限
  const checkPropertyPermission = (moduleId: string, propertyId: string): boolean => {
    const { mergedConfig } = configStore
    const { user } = authStore

    if (!mergedConfig || !user) return false

    const module = mergedConfig.userConfig.modules.find(m => m.id === moduleId)
    if (!module) return false

    const property = module.properties.find(p => p.id === propertyId)
    if (!property) return false

    return property.show
  }

  // 获取模块配置
  const getModuleConfig = (moduleId: string) => {
    const { mergedConfig } = configStore
    return mergedConfig?.userConfig.modules.find(m => m.id === moduleId)
  }

  // 获取模块属性
  const getModuleProperty = (moduleId: string, propertyId: string) => {
    const module = getModuleConfig(moduleId)
    return module?.properties.find(p => p.id === propertyId)
  }

  // 用户登录后自动获取配置
  useEffect(() => {
    if (authStore.isAuthenticated && !configStore.userConfig) {
      fetchUserConfig()
    }
  }, [authStore.isAuthenticated])

  return {
    // 状态
    ...configStore,
    
    // 方法
    fetchUserConfig,
    updateUserConfig,
    checkModulePermission,
    checkPropertyPermission,
    getModuleConfig,
    getModuleProperty,
  }
}
