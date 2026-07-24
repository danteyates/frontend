export interface ResponseDTO<TData = unknown> {
  success: boolean
  data: TData
  message: string
  errors: Record<string, string[]>
  statusCode: number
  meta: Record<string, unknown>
}