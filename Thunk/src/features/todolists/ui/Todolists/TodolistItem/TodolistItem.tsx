import { useAppDispatch } from "@/common/hooks"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import {createTask} from "@/features/todolists/model/tasks-slice.ts";

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTask({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
