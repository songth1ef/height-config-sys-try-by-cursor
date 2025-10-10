import { ModuleConfig } from '@/types/config'

// 模块注册表
class ModuleRegistry {
  private modules: Map<string, ModuleConfig> = new Map()
  private loadedModules: Set<string> = new Set()

  // 注册模块
  register(moduleId: string, config: ModuleConfig) {
    this.modules.set(moduleId, config)
    console.log(`📦 模块已注册: ${moduleId}`)
  }

  // 获取模块配置
  getModule(moduleId: string): ModuleConfig | undefined {
    return this.modules.get(moduleId)
  }

  // 获取所有已注册模块
  getAllModules(): ModuleConfig[] {
    return Array.from(this.modules.values())
  }

  // 检查模块是否已注册
  isRegistered(moduleId: string): boolean {
    return this.modules.has(moduleId)
  }

  // 标记模块为已加载
  markAsLoaded(moduleId: string) {
    this.loadedModules.add(moduleId)
  }

  // 检查模块是否已加载
  isLoaded(moduleId: string): boolean {
    return this.loadedModules.has(moduleId)
  }

  // 获取已加载的模块列表
  getLoadedModules(): string[] {
    return Array.from(this.loadedModules)
  }

  // 卸载模块
  unload(moduleId: string) {
    this.loadedModules.delete(moduleId)
    console.log(`📦 模块已卸载: ${moduleId}`)
  }

  // 清空注册表
  clear() {
    this.modules.clear()
    this.loadedModules.clear()
    console.log('📦 模块注册表已清空')
  }

  // 获取模块统计信息
  getStats() {
    return {
      registered: this.modules.size,
      loaded: this.loadedModules.size,
      modules: Array.from(this.modules.keys()),
      loadedModules: Array.from(this.loadedModules),
    }
  }
}

// 创建全局实例
export const moduleRegistry = new ModuleRegistry()

// 模块加载器
export class ModuleLoader {
  private loadingPromises: Map<string, Promise<any>> = new Map()

  // 动态加载模块
  async loadModule(moduleId: string): Promise<any> {
    // 如果已经在加载中，返回现有的 Promise
    if (this.loadingPromises.has(moduleId)) {
      return this.loadingPromises.get(moduleId)
    }

    // 如果已经加载过，直接返回
    if (moduleRegistry.isLoaded(moduleId)) {
      return Promise.resolve()
    }

    // 创建加载 Promise
    const loadPromise = this._loadModule(moduleId)
    this.loadingPromises.set(moduleId, loadPromise)

    try {
      await loadPromise
      moduleRegistry.markAsLoaded(moduleId)
      console.log(`✅ 模块加载成功: ${moduleId}`)
    } catch (error) {
      console.error(`❌ 模块加载失败: ${moduleId}`, error)
      throw error
    } finally {
      this.loadingPromises.delete(moduleId)
    }
  }

  // 预加载模块
  async preloadModule(moduleId: string): Promise<void> {
    try {
      await this.loadModule(moduleId)
    } catch (error) {
      console.warn(`⚠️ 模块预加载失败: ${moduleId}`, error)
    }
  }

  // 批量预加载模块
  async preloadModules(moduleIds: string[]): Promise<void> {
    const promises = moduleIds.map(id => this.preloadModule(id))
    await Promise.allSettled(promises)
  }

  // 卸载模块
  unloadModule(moduleId: string): void {
    moduleRegistry.unload(moduleId)
  }

  // 实际加载模块的实现
  private async _loadModule(moduleId: string): Promise<any> {
    // 检查模块是否已注册
    if (!moduleRegistry.isRegistered(moduleId)) {
      throw new Error(`模块未注册: ${moduleId}`)
    }

    // 动态导入模块
    const module = await import(`@/modules/${moduleId}`)
    return module.default
  }
}

// 创建全局实例
export const moduleLoader = new ModuleLoader()

// 模块管理器
export class ModuleManager {
  private registry = moduleRegistry
  private loader = moduleLoader

  // 初始化模块系统
  async initialize(modules: ModuleConfig[]) {
    console.log('🚀 初始化模块系统...')
    
    // 注册所有模块
    modules.forEach(module => {
      this.registry.register(module.id, module)
    })

    // 预加载关键模块
    const criticalModules = modules
      .filter(module => module.enabled && module.id === 'home')
      .map(module => module.id)

    if (criticalModules.length > 0) {
      await this.loader.preloadModules(criticalModules)
    }

    console.log('✅ 模块系统初始化完成', this.registry.getStats())
  }

  // 获取模块
  getModule(moduleId: string): ModuleConfig | undefined {
    return this.registry.getModule(moduleId)
  }

  // 获取所有模块
  getAllModules(): ModuleConfig[] {
    return this.registry.getAllModules()
  }

  // 加载模块
  async loadModule(moduleId: string): Promise<any> {
    return this.loader.loadModule(moduleId)
  }

  // 预加载模块
  async preloadModule(moduleId: string): Promise<void> {
    return this.loader.preloadModule(moduleId)
  }

  // 卸载模块
  unloadModule(moduleId: string): void {
    this.loader.unloadModule(moduleId)
  }

  // 获取统计信息
  getStats() {
    return this.registry.getStats()
  }
}

// 创建全局实例
export const moduleManager = new ModuleManager()
