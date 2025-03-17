import { todolistsApi } from "@/features/todolists/api/todolistsApi";
import type { Todolist } from "@/features/todolists/api/todolistsApi.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "@/common/utils";
import { setStatus } from "@/app/app-slice.ts";

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all" });
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todolist) => todolist.id === action.payload.id,
        );
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todolist) => todolist.id === action.payload.id,
        );
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      });
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
  }),
});

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title);
      return { todolist: res.data.data.item };
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (id: string, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(id);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload);
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const { selectTodolists } = todolistsSlice.selectors;
export const { changeTodolistFilterAC, fetchTodolists } =
  todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = "all" | "active" | "completed";
