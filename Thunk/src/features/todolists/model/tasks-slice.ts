import { createTodolist, deleteTodolist } from "./todolists-slice";
import { createAppSlice } from "@/common/utils";
import { tasksApi } from "@/features/todolists/api/tasksApi.ts";
import {
  DomainTask,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts";
import { setStatus } from "@/app/app-slice.ts";

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolisrId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }));

          const res = await tasksApi.getTasks(todolisrId);
          return { tasks: res.data.items, todolisrId };
        } catch (e) {
          return rejectWithValue(null);
        } finally {
          dispatch(setStatus({ status: "idle" }));
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
        { dispatch, rejectWithValue },
      ) => {
        try {
          dispatch(setStatus({ status: "loading" }));
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });

          const res = await tasksApi.createTask(args);
          dispatch(setStatus({ status: "succeeded" }));
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
    changeTaskTitle: create.asyncThunk(
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
            (task) => task.id === action.payload.id,
          );
          if (task) {
            task.title = action.payload.title;
          }
        },
      },
    ),
  }),
});

export const { selectTasks } = tasksSlice.selectors;
export const {
  changeTaskTitle,
  fetchTasks,
  createTask,
  deleteTask,
  changeTaskStatus,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export type TasksState = Record<string, DomainTask[]>;
