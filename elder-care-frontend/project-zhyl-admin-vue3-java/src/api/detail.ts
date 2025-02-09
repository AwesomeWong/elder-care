import { request } from '@/utils/request'
import type { ListResult } from '@/api/model/listModel'

export function getProjectList() {
  return request.get<ListResult>({
    url: '/get-detail-list'
  })
}
