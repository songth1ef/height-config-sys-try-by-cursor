// 用户配置相关类型定义
export interface UserConfig {
  id: string
  name: string
  userConfig: {
    lang: string
    themeUrl: string
    styleUrl?: string
    layout: string
    modules: ModuleConfig[]
    permissions: Permission[]
  }
}

export interface ModuleConfig {
  id: string
  path: string
  enabled: boolean
  permissions: string[]
  properties: ModuleProperty[]
  children?: ModuleConfig[]
}

export interface ModuleProperty {
  id: string
  globalLabel: string
  show: boolean
  value?: any
}

export interface Permission {
  type: 'role' | 'permission' | 'condition'
  value: string
  operator?: 'and' | 'or'
}

// 默认配置
export interface DefaultConfig {
  lang: string
  themeUrl: string
  layout: string
  modules: ModuleConfig[]
  permissions: Permission[]
}

// 配置状态
export interface ConfigState {
  userConfig: UserConfig | null
  defaultConfig: DefaultConfig | null
  mergedConfig: UserConfig | null
  isLoading: boolean
  error: string | null
}

// 配置操作
export interface ConfigActions {
  setUserConfig: (config: UserConfig) => void
  setDefaultConfig: (config: DefaultConfig) => void
  mergeConfigs: () => void
  updateModuleConfig: (moduleId: string, updates: Partial<ModuleConfig>) => void
  updateModuleProperty: (moduleId: string, propertyId: string, updates: Partial<ModuleProperty>) => void
  resetConfig: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}
