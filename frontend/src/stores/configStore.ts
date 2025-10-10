import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ConfigState, ConfigActions, UserConfig, DefaultConfig, ModuleConfig, ModuleProperty } from '@/types/config'

type ConfigStore = ConfigState & ConfigActions

export const useConfigStore = create<ConfigStore>()(
  immer((set, get) => ({
    // 初始状态
    userConfig: null,
    defaultConfig: null,
    mergedConfig: null,
    isLoading: false,
    error: null,

    // 设置用户配置
    setUserConfig: (config: UserConfig) => {
      set((state) => {
        state.userConfig = config
        state.mergedConfig = config
        console.log('设置用户配置到store:', config)
      })
    },

    // 设置默认配置
    setDefaultConfig: (config: DefaultConfig) => {
      set((state) => {
        state.defaultConfig = config
      })
    },

    // 合并配置
    mergeConfigs: () => {
      set((state) => {
        const { userConfig, defaultConfig } = state
        if (!userConfig || !defaultConfig) return

        // 深度合并配置
        const mergedConfig: UserConfig = {
          ...userConfig,
          userConfig: {
            ...defaultConfig,
            ...userConfig.userConfig,
            modules: mergeModules(defaultConfig.modules, userConfig.userConfig.modules)
          }
        }

        state.mergedConfig = mergedConfig
      })
    },

    // 更新模块配置
    updateModuleConfig: (moduleId: string, updates: Partial<ModuleConfig>) => {
      set((state) => {
        if (!state.mergedConfig) return

        const moduleIndex = state.mergedConfig.userConfig.modules.findIndex(
          (module) => module.id === moduleId
        )

        if (moduleIndex !== -1) {
          state.mergedConfig.userConfig.modules[moduleIndex] = {
            ...state.mergedConfig.userConfig.modules[moduleIndex],
            ...updates
          }
        }
      })
    },

    // 更新模块属性
    updateModuleProperty: (moduleId: string, propertyId: string, updates: Partial<ModuleProperty>) => {
      set((state) => {
        if (!state.mergedConfig) return

        const module = state.mergedConfig.userConfig.modules.find(
          (module) => module.id === moduleId
        )

        if (module) {
          const propertyIndex = module.properties.findIndex(
            (property) => property.id === propertyId
          )

          if (propertyIndex !== -1) {
            module.properties[propertyIndex] = {
              ...module.properties[propertyIndex],
              ...updates
            }
          }
        }
      })
    },

    // 重置配置
    resetConfig: () => {
      set((state) => {
        state.userConfig = null
        state.mergedConfig = null
        state.error = null
      })
    },

    // 设置加载状态
    setLoading: (loading: boolean) => {
      set((state) => {
        state.isLoading = loading
      })
    },

    // 设置错误
    setError: (error: string | null) => {
      set((state) => {
        state.error = error
      })
    }
  }))
)

// 深度合并模块配置
function mergeModules(defaultModules: ModuleConfig[], userModules: ModuleConfig[]): ModuleConfig[] {
  const merged: ModuleConfig[] = []
  const userModuleMap = new Map(userModules.map(module => [module.id, module]))

  // 遍历默认模块，合并用户配置
  for (const defaultModule of defaultModules) {
    const userModule = userModuleMap.get(defaultModule.id)
    
    if (userModule) {
      // 合并模块配置
      merged.push({
        ...defaultModule,
        ...userModule,
        properties: mergeProperties(defaultModule.properties, userModule.properties)
      })
      userModuleMap.delete(defaultModule.id)
    } else {
      // 使用默认配置
      merged.push(defaultModule)
    }
  }

  // 添加用户新增的模块
  for (const userModule of userModuleMap.values()) {
    merged.push(userModule)
  }

  return merged
}

// 合并模块属性
function mergeProperties(defaultProperties: ModuleProperty[], userProperties: ModuleProperty[]): ModuleProperty[] {
  const merged: ModuleProperty[] = []
  const userPropertyMap = new Map(userProperties.map(property => [property.id, property]))

  // 遍历默认属性，合并用户配置
  for (const defaultProperty of defaultProperties) {
    const userProperty = userPropertyMap.get(defaultProperty.id)
    
    if (userProperty) {
      merged.push({
        ...defaultProperty,
        ...userProperty
      })
      userPropertyMap.delete(defaultProperty.id)
    } else {
      merged.push(defaultProperty)
    }
  }

  // 添加用户新增的属性
  for (const userProperty of userPropertyMap.values()) {
    merged.push(userProperty)
  }

  return merged
}
