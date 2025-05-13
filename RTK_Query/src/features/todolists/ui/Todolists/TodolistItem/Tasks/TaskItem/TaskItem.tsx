import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { createTaskModel } from "@/features/todolists/lib/utils"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTaskHandler = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"
  console.log(isTaskCompleted)

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
