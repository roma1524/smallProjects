import { createTodolistTC, deleteTodolistTC } from "./todolists-slice";
import { createAppSlice } from "@/common/utils";
import { tasksApi } from "@/features/todolists/api/tasksApi.ts";
import {
  DomainTask,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums";

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
  reducers: (create) => ({
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      status: TaskStatus;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId,
      );
      if (task) {
        task.status = action.payload.status;
      }
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId,
      );
      if (task) {
        task.title = action.payload.title;
      }
    }),

    // --------------  Thunk  --------------

    fetchTasks: create.asyncThunk(
      async (todolisrId: string, { rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(todolisrId);
          return { tasks: res.data.items, todolisrId };
        } catch (e) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolisrId] = action.payload.tasks;
        },
      },
    ),
    createTask: create.asyncThunk(
      async (
        args: { todolistId: string; title: string },
        { rejectWithValue },
      ) => {
        try {
          const res = await tasksApi.createTask(args);
          return { task: res.data.data.item };
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task);
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (
        args: { todolistId: string; taskId: string },
        { rejectWithValue },
      ) => {
        try {
          await tasksApi.deleteTask(args);
          return args;
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex(
            (task) => task.id === action.payload.taskId,
          );
          if (index !== -1) {
            tasks.splice(index, 1);
          }
        },
      },
    ),
    changeTaskStatus: create.asyncThunk(
      async (task: DomainTask, { rejectWithValue }) => {
        try {
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          };
          await tasksApi.updateTask({
            todolistId: task.todoListId,
            taskId: task.id,
            model,
          });
          return task;
        } catch (error) {
          return rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.todoListId].find(
            (el) => el.id === action.payload.id,
          );
          if (task) {
            task.status = action.payload.status;
          }
        },
      },
    ),
  }),
});

export const { selectTasks } = tasksSlice.selectors;
export const {
  changeTaskTitleAC,
  fetchTasks,
  createTask,
  deleteTask,
  changeTaskStatus,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export type TasksState = Record<string, DomainTask[]>;
