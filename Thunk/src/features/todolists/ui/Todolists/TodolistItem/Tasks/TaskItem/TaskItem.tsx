import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "@/common/hooks";
import {
  changeTaskStatus,
  changeTaskTitleAC,
  deleteTask,
} from "@/features/todolists/model/tasks-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import type { ChangeEvent } from "react";
import { getListItemSx } from "./TaskItem.styles";
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums";

type Props = {
  task: DomainTask;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId, taskId: task.id }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;
    dispatch(changeTaskStatus({ ...task, status: newStatusValue }));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
  };

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
