import { useAuthStore } from '@/stores/authStore'
import { useConfig } from './useConfig'

export const usePermission = () => {
  const { user } = useAuthStore()
  const { checkModulePermission, checkPropertyPermission } = useConfig()

  // 检查用户是否有指定角色
  const hasRole = (role: string): boolean => {
    if (!user) return false
    return user.role.includes(role)
  }

  // 检查用户是否有指定权限
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  // 检查用户是否有任一角色
  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false
    return roles.some(role => user.role.includes(role))
  }

  // 检查用户是否有任一权限
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false
    return permissions.some(permission => user.permissions.includes(permission))
  }

  // 检查用户是否有所有角色
  const hasAllRoles = (roles: string[]): boolean => {
    if (!user) return false
    return roles.every(role => user.role.includes(role))
  }

  // 检查用户是否有所有权限
  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!user) return false
    return permissions.every(permission => user.permissions.includes(permission))
  }

  // 检查模块访问权限
  const canAccessModule = (moduleId: string): boolean => {
    return checkModulePermission(moduleId)
  }

  // 检查模块属性权限
  const canAccessProperty = (moduleId: string, propertyId: string): boolean => {
    return checkPropertyPermission(moduleId, propertyId)
  }

  // 检查是否为管理员
  const isAdmin = (): boolean => {
    return hasRole('admin')
  }

  // 检查是否为普通用户
  const isUser = (): boolean => {
    return hasRole('user')
  }

  return {
    // 基础权限检查
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
    hasAllRoles,
    hasAllPermissions,
    
    // 模块权限检查
    canAccessModule,
    canAccessProperty,
    
    // 角色检查
    isAdmin,
    isUser,
    
    // 用户信息
    user,
    isAuthenticated: !!user,
  }
}
