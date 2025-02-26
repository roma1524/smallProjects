import { instance } from "@/common/instance"
import { GetTasksResponse, Task } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  сreateTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
