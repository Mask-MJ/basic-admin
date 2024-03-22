export interface CreatedFactory {
  name: string
  status: number
  remark: string
  address: string
  position: [number, number]
  valves: number[]
}

export interface FactoryInfo {
  id: number
  name: string
  status: number
  remark: string
  address: string
  position: [number, number]
  valves: number[]
  createdAt: string
  updatedAt: string
}

export interface SearchParams {
  page: number
  pageSize: number
  name: string | null
  status: number | null
}
