import type { User } from './user'

export interface LoginData {
  email: string
  password: string
  device_name?: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthData {
  user: User
  token: string
  token_type: string
}