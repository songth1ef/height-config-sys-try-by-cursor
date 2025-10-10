import { useConfigStore } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import { useCallback } from 'react'

export const useConfig = () => {
  const configStore = useConfigStore()
  const authStore = useAuthStore()

  // 获取用户配置
  const fetchUserConfig = useCallback(async () => {
    if (!authStore.isAuthenticated || !authStore.user) {
      console.log('未认证或用户不存在，跳过配置获取')
      return
    }

    try {
      console.log('开始获取用户配置...')
      configStore.setLoading(true)
      configStore.setError(null)

      const response = await fetch('http://localhost:3001/config/user', {
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('配置API响应状态:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('配置API错误:', errorText)
        throw new Error(`获取配置失败: ${response.status}`)
      }

      const userConfig = await response.json()
      console.log('获取到用户配置:', userConfig)
      configStore.setUserConfig(userConfig)
    } catch (error) {
      console.error('获取配置失败:', error)
      configStore.setError(error instanceof Error ? error.message : '获取配置失败')
    } finally {
      configStore.setLoading(false)
    }
  }, [authStore.isAuthenticated, authStore.user, authStore.accessToken, configStore])

  // 更新用户配置
  const updateUserConfig = useCallback(async (updates: Record<string, any>) => {
    if (!authStore.isAuthenticated) return

    try {
      configStore.setLoading(true)
      configStore.setError(null)

      const response = await fetch('http://localhost:3001/config/user', {
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
  }, [authStore.isAuthenticated, authStore.accessToken, configStore])

  // 检查模块权限
  const checkModulePermission = (moduleId: string): boolean => {
    const { mergedConfig } = configStore
    const { user } = authStore

    if (!mergedConfig || !user) return false

    const module = mergedConfig.userConfig?.modules?.find((m: any) => m.id === moduleId)
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

    const module = mergedConfig.userConfig?.modules?.find((m: any) => m.id === moduleId)
    if (!module) return false

    // properties 是一个对象，不是数组
    const property = module.properties?.[propertyId]
    if (!property) return false

    return property.show === true
  }

  // 获取模块配置
  const getModuleConfig = (moduleId: string) => {
    const { mergedConfig } = configStore
    console.log('获取模块配置:', moduleId, 'mergedConfig:', mergedConfig)
    return mergedConfig?.userConfig?.modules?.find((m: any) => m.id === moduleId)
  }

  // 获取模块属性
  const getModuleProperty = (moduleId: string, propertyId: string) => {
    const moduleConfig = getModuleConfig(moduleId)
    return moduleConfig?.properties?.[propertyId]
  }

  // 用户登录后自动获取配置 - 暂时禁用自动获取，避免死循环
  // useEffect(() => {
  //   if (authStore.isAuthenticated && !configStore.userConfig && !configStore.isLoading) {
  //     fetchUserConfig()
  //   }
  // }, [authStore.isAuthenticated])

  return {
    // 状态
    ...configStore,
    config: configStore.mergedConfig, // 明确返回 config 字段
    
    // 方法
    fetchUserConfig,
    updateUserConfig,
    checkModulePermission,
    checkPropertyPermission,
    getModuleConfig,
    getModuleProperty,
  }
}
