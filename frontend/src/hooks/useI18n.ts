import { useTranslation } from 'react-i18next'
import { useConfig } from './useConfig'
import { useEffect } from 'react'

export const useI18n = () => {
  const { i18n, t } = useTranslation()
  const { config, updateUserConfig } = useConfig()

  // 获取当前语言
  const currentLanguage = i18n.language

  // 获取支持的语言列表
  const supportedLanguages = [
    { code: 'zh-CN', name: '简体中文', nativeName: '简体中文' },
    { code: 'en-US', name: 'English', nativeName: 'English' },
  ]

  // 切换语言
  const changeLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode)
      
      // 更新用户配置
      if (config) {
        await updateUserConfig({
          ...config,
          userConfig: {
            ...config.userConfig,
            lang: languageCode,
          },
        })
      }
      
      console.log(`🌐 语言已切换为: ${languageCode}`)
    } catch (error) {
      console.error('语言切换失败:', error)
    }
  }

  // 获取翻译文本
  const translate = (key: string, options?: any): string => {
    return t(key, options)
  }

  // 获取翻译文本（带默认值）
  const translateWithDefault = (key: string, defaultValue: string, options?: any): string => {
    const translation = t(key, options)
    return translation === key ? defaultValue : translation
  }

  // 检查是否有翻译
  const hasTranslation = (key: string): boolean => {
    return t(key) !== key
  }

  // 获取语言方向
  const getLanguageDirection = (languageCode?: string): 'ltr' | 'rtl' => {
    const lang = languageCode || currentLanguage
    const rtlLanguages = ['ar', 'he', 'fa', 'ur']
    return rtlLanguages.some(rtlLang => lang.startsWith(rtlLang)) ? 'rtl' : 'ltr'
  }

  // 格式化数字
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    try {
      return new Intl.NumberFormat(currentLanguage, options).format(number)
    } catch (error) {
      return number.toString()
    }
  }

  // 格式化日期
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat(currentLanguage, options).format(dateObj)
    } catch (error) {
      return date.toString()
    }
  }

  // 格式化相对时间
  const formatRelativeTime = (date: Date | string): string => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
      
      if (diffInSeconds < 60) {
        return translate('common.justNow', '刚刚')
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return translate('common.minutesAgo', `${minutes}分钟前`, { count: minutes })
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return translate('common.hoursAgo', `${hours}小时前`, { count: hours })
      } else {
        const days = Math.floor(diffInSeconds / 86400)
        return translate('common.daysAgo', `${days}天前`, { count: days })
      }
    } catch (error) {
      return date.toString()
    }
  }

  // 同步用户配置中的语言设置
  useEffect(() => {
    if (config?.userConfig?.lang && config.userConfig.lang !== currentLanguage) {
      i18n.changeLanguage(config.userConfig.lang)
    }
  }, [config?.userConfig?.lang, currentLanguage])

  return {
    // 基础功能
    t: translate,
    translate,
    translateWithDefault,
    hasTranslation,
    
    // 语言管理
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    getLanguageDirection,
    
    // 格式化
    formatNumber,
    formatDate,
    formatRelativeTime,
    
    // 状态
    isReady: i18n.isInitialized,
    isLoading: !i18n.isInitialized,
  }
}
