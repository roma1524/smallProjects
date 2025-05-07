import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()

  // const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    // dispatch(createTaskTC({ todolistId: todolist.id, title }))
    createTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
