import type { Result } from '@/utils/request/types'
import { defHttp } from '@/utils'
import type {
  AnalysisTaskInfo,
  CreatedAnalysisTask,
  ExecuteAnalysisTask,
  SearchParams
} from './analysisTask.type'

enum Api {
  AnalysisTask = 'project/analysis-task'
}

// 获取分析任务列表
export const getAnalysisTaskList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<AnalysisTaskInfo[]>>({ url: Api.AnalysisTask, params })
// 创建分析任务
export const createAnalysisTask = (params: CreatedAnalysisTask) =>
  defHttp.post({ url: Api.AnalysisTask, params })
// 获取单个分析任务信息
export const getAnalysisTaskDetail = (id: number) =>
  defHttp.get<AnalysisTaskInfo>({ url: `${Api.AnalysisTask}/${id}` })
// 更新分析任务
export const updateAnalysisTask = (params: Partial<AnalysisTaskInfo>) =>
  defHttp.patch({ url: `${Api.AnalysisTask}/${params.id}`, params })
// 删除分析任务
export const deleteAnalysisTask = (ids: number | string) =>
  defHttp.delete({ url: `${Api.AnalysisTask}/${ids}` })
// 执行分析任务
export const executeAnalysisTask = (params: ExecuteAnalysisTask) =>
  defHttp.post({ url: `${Api.AnalysisTask}/execute`, params })
