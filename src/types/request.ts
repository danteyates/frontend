export interface RequestDTO<TData = unknown> {
  data?: TData
  filters?: Record<string, unknown>
  sort?: string[]
  includes?: string[]
  page?: number
  pageSize?: number
  meta?: Record<string, unknown>
}