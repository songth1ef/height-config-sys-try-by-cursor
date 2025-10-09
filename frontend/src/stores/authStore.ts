import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, AuthActions, LoginRequest, RegisterRequest, User } from '@/types/auth'

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 登录
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })

          if (!response.ok) {
            throw new Error('登录失败')
          }

          const data = await response.json()
          
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : '登录失败'
          })
          throw error
        }
      },

      // 注册
      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            throw new Error('注册失败')
          }

          const result = await response.json()
          
          set({
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : '注册失败'
          })
          throw error
        }
      },

      // 登出
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null
        })
      },

      // 刷新 Token
      refreshToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) return

        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          })

          if (!response.ok) {
            throw new Error('Token 刷新失败')
          }

          const data = await response.json()
          
          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
          })
        } catch (error) {
          // Token 刷新失败，清除认证状态
          get().logout()
          throw error
        }
      },

      // 设置用户
      setUser: (user: User) => {
        set({ user })
      },

      // 设置 Token
      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken, isAuthenticated: true })
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // 设置错误
      setError: (error: string | null) => {
        set({ error })
      },

      // 清除错误
      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
