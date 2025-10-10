import { useState, useEffect } from 'react'
import { useConfig } from './useConfig'

export interface Theme {
  id: string
  name: string
  url: string
  css?: string
  isDefault?: boolean
}

export const useTheme = () => {
  const { config, updateUserConfig } = useConfig()
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 默认主题
  const defaultTheme: Theme = {
    id: 'default',
    name: '默认主题',
    url: '/themes/default.css',
    css: `
      :root {
        --primary-color: #3b82f6;
        --secondary-color: #64748b;
        --background-color: #ffffff;
        --text-color: #1e293b;
        --border-color: #e2e8f0;
        --success-color: #10b981;
        --warning-color: #f59e0b;
        --error-color: #ef4444;
        --info-color: #06b6d4;
      }
    `,
    isDefault: true,
  }

  // 暗色主题
  const darkTheme: Theme = {
    id: 'dark',
    name: '暗色主题',
    url: '/themes/dark.css',
    css: `
      :root {
        --primary-color: #60a5fa;
        --secondary-color: #94a3b8;
        --background-color: #1e293b;
        --text-color: #f1f5f9;
        --border-color: #334155;
        --success-color: #34d399;
        --warning-color: #fbbf24;
        --error-color: #f87171;
        --info-color: #22d3ee;
      }
    `,
    isDefault: false,
  }

  // 可用主题列表
  const availableThemes: Theme[] = [defaultTheme, darkTheme]

  // 应用主题
  const applyTheme = async (theme: Theme) => {
    setIsLoading(true)
    
    try {
      // 移除现有的主题样式
      const existingLink = document.getElementById('theme-stylesheet')
      if (existingLink) {
        existingLink.remove()
      }

      // 创建新的样式表
      const link = document.createElement('link')
      link.id = 'theme-stylesheet'
      link.rel = 'stylesheet'
      link.href = theme.url
      
      // 如果主题有自定义 CSS，添加到页面
      if (theme.css) {
        const style = document.createElement('style')
        style.id = 'theme-custom-styles'
        style.textContent = theme.css
        document.head.appendChild(style)
      }

      // 添加到页面
      document.head.appendChild(link)

      // 等待样式表加载完成
      await new Promise((resolve, reject) => {
        link.onload = resolve
        link.onerror = reject
      })

      setCurrentTheme(theme)
      
      // 更新用户配置
      if (config) {
        await updateUserConfig({
          ...config,
          userConfig: {
            ...config.userConfig,
            themeUrl: theme.url,
          },
        })
      }

      console.log(`🎨 主题已切换为: ${theme.name}`)
    } catch (error) {
      console.error('主题切换失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 切换主题
  const switchTheme = async (themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId)
    if (theme) {
      await applyTheme(theme)
    } else {
      console.error(`主题未找到: ${themeId}`)
    }
  }

  // 获取当前主题
  const getCurrentTheme = (): Theme | null => {
    return currentTheme
  }

  // 检查是否为暗色主题
  const isDarkTheme = (): boolean => {
    return currentTheme?.id === 'dark'
  }

  // 切换暗色/亮色模式
  const toggleDarkMode = async () => {
    if (isDarkTheme()) {
      await switchTheme('default')
    } else {
      await switchTheme('dark')
    }
  }

  // 获取主题颜色
  const getThemeColor = (colorName: string): string => {
    const root = document.documentElement
    const color = getComputedStyle(root).getPropertyValue(`--${colorName}`).trim()
    return color || '#000000'
  }

  // 设置主题颜色
  const setThemeColor = (colorName: string, color: string) => {
    const root = document.documentElement
    root.style.setProperty(`--${colorName}`, color)
  }

  // 初始化主题
  useEffect(() => {
    const initializeTheme = async () => {
      // 从用户配置中获取主题
      const themeUrl = config?.userConfig?.themeUrl
      if (themeUrl) {
        const theme = availableThemes.find(t => t.url === themeUrl)
        if (theme) {
          await applyTheme(theme)
          return
        }
      }

      // 使用默认主题
      await applyTheme(defaultTheme)
    }

    if (config) {
      initializeTheme()
    }
  }, [config])

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 如果用户没有手动设置主题，跟随系统主题
      if (!config?.userConfig?.themeUrl) {
        if (e.matches) {
          switchTheme('dark')
        } else {
          switchTheme('default')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [config])

  return {
    // 主题管理
    currentTheme,
    availableThemes,
    switchTheme,
    applyTheme,
    getCurrentTheme,
    
    // 主题状态
    isDarkTheme,
    toggleDarkMode,
    isLoading,
    
    // 主题工具
    getThemeColor,
    setThemeColor,
  }
}
