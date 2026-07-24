import { defineStore } from 'pinia'
import axios from 'axios'

import authService from '@/services/AuthService'

import type { RequestDTO } from '@/types/request'
import type { ResponseDTO } from '@/types/response'
import type {
  AuthData,
  LoginData,
  RegisterData,
} from '@/types/auth'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  errors: Record<string, string[]>
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    errors: {},
  }),

  getters: {
    isAuthenticated: (state): boolean => {
      return state.token !== null
    },
  },

  actions: {
    async login(data: LoginData): Promise<boolean> {
      this.startRequest()

      const request: RequestDTO<LoginData> = {
        data: {
          ...data,
          device_name: data.device_name ?? 'vue-frontend',
        },
      }

      try {
        const response: ResponseDTO<AuthData> =
          await authService.login(request)

        this.setAuth(response.data)

        return true
      } catch (error: unknown) {
        this.handleError(error)

        return false
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterData): Promise<boolean> {
      this.startRequest()

      const request: RequestDTO<RegisterData> = {
        data,
      }

      try {
        const response: ResponseDTO<AuthData> =
          await authService.register(request)

        this.setAuth(response.data)

        return true
      } catch (error: unknown) {
        this.handleError(error)

        return false
      } finally {
        this.loading = false
      }
    },

    async fetchUser(): Promise<boolean> {
      if (!this.token) {
        return false
      }

      this.startRequest()

      try {
        const response: ResponseDTO<User> =
          await authService.me()

        this.user = response.data

        return true
      } catch (error: unknown) {
        this.handleError(error)
        this.clearAuth()

        return false
      } finally {
        this.loading = false
      }
    },

    async logout(): Promise<void> {
      this.startRequest()

      try {
        await authService.logout()
      } catch (error: unknown) {
        this.handleError(error)
      } finally {
        this.clearAuth()
        this.loading = false
      }
    },

    setAuth(data: AuthData): void {
      this.user = data.user
      this.token = data.token

      localStorage.setItem('token', data.token)
    },

    clearAuth(): void {
      this.user = null
      this.token = null
      this.error = null
      this.errors = {}

      localStorage.removeItem('token')
    },

    startRequest(): void {
      this.loading = true
      this.error = null
      this.errors = {}
    },

    handleError(error: unknown): void {
      if (
        axios.isAxiosError<ResponseDTO<unknown>>(error)
      ) {
        this.error =
          error.response?.data.message ??
          'Bir hata oluştu.'

        this.errors =
          error.response?.data.errors ?? {}

        return
      }

      this.error = 'Beklenmeyen bir hata oluştu.'
      this.errors = {}
    },
  },
})