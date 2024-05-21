export interface SearchParams {
  page: number
  pageSize: number
  name: string | null
  status: number | null
  factoryId: number | null
}

export interface AnalysisTaskInfo {
  id: number
  name: string
  dictId: number
  factoryId: number
  createdAt: string
  updatedAt: string
  status: number
  pdfPath: string[]
  remark: string
  createBy: string
  updateBy: string
}

export interface CreatedAnalysisTask {
  name: string
  dictId: number
  factoryId: number
  remark?: string
  status: number | null
  pdfPath: string[]
}

export interface ExecuteAnalysisTask {
  id: number
  dictId: number
  factoryId: number
  pdfPath: string[]
}
