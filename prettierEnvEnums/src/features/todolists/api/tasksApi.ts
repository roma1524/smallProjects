import { instance } from "@/common/instance"

export const taskstsApi = {
  getTasks(todolistId: string) {
    return instance.get(`/todo-lists/${todolistId}/tasks`)
  },
}
