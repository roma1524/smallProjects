import { todolistsApi } from "@/features/todolists/api/todolistsApi";
import type { Todolist } from "@/features/todolists/api/todolistsApi.types";
import { createAppSlice } from "@/common/utils";
import { setStatus } from "@/app/app-slice.ts";

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterValues;
    }>((state, action) => {
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      );
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    fetchTodolists: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatus({ status: "loading" }));
          await new Promise((res) => {
            setTimeout(res, 1000);
          });

          const res = await todolistsApi.getTodolists();
          return { todolists: res.data };
        } catch (error) {
          return rejectWithValue(null);
        } finally {
          dispatch(setStatus({ status: "idle" }));
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all" });
          });
        },
      },
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { rejectWithValue }) => {
        try {
          const res = await todolistsApi.createTodolist(title);

          return { todolist: res.data.data.item };
        } catch (error) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all" });
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        try {
          await todolistsApi.deleteTodolis(id);

          return { id };
        } catch (error) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex(
            (todolist) => todolist.id === action.payload.id,
          );
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
      },
    ),
    changeTodolistTitle: create.asyncThunk(
      async (args: { id: string; title: string }, { rejectWithValue }) => {
        try {
          await todolistsApi.changeTodolistTitle(args);
          return args;
        } catch (error) {
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex(
            (todolist) => todolist.id === action.payload.id,
          );
          if (index !== -1) {
            state[index].title = action.payload.title;
          }
        },
      },
    ),
  }),
});

export const { selectTodolists } = todolistsSlice.selectors;
export const {
  changeTodolistFilterAC,
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  changeTodolistTitle,
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = "all" | "active" | "completed";
