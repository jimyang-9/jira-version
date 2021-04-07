export type Version = {
  /**
   * Some url?
   */
  self: string
  id: string
  name: string
  archived: boolean
  released: boolean
  startDate?: string
  releaseDate: string
  userStartDate?: string
  userReleaseDate: string
  projectId: number
  description?: string
  overdue?: boolean
}
