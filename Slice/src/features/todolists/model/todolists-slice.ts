import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit"
import {DomainTodolist} from "@/features/todolists/api/tasksApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        // setTodolists: create.reducer<{todolists: Todolist[]}>((state, action) => {
        //     action.payload.todolists.forEach(t => state.push({...t, filter: 'all'}))
        // }),
        // deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
        //     const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        //     if (index !== -1) {
        //         state.splice(index, 1)
        //     }
        // }),
        // changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
        //     const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        //     if (index !== -1) {
        //         state[index].title = action.payload.title
        //     }
        // }),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        // createTodolistAC: create.preparedReducer((title: string) => {
        //     return {payload: {id: nanoid(), title: title}}
        // }, (state, action) => {
        //     state.push({...action.payload, filter: 'all', addedDate: '', order: 0})
        // })
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload?.todolists.forEach(tl => {
                    state.push({...tl, filter: 'all'})
                })
            })
            .addCase(fetchTodolistsTC.rejected, (state, action) => {
                //
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.find((todolist) => todolist.id === action.payload.id)
                if (index) {
                    index.title = action.payload.title
                }
            })
            .addCase(changeTodolistTitleTC.rejected, (state, action) => {
                //
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                console.log(action)
                state.push({...action.payload, filter: 'all', addedDate: '', order: 0})
            })
            .addCase(createTodolistTC.rejected, (state, action) => {
                //
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(deleteTodolistTC.rejected, (state, action) => {
                //
            })
    }
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_args, thunkAPI) => {
    try {
        const res = await todolistsApi.getTodolists()
        return {todolists: res.data}
    } catch (error) {
        thunkAPI.rejectWithValue(null);
    }
})

export const changeTodolistTitleTC = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitleTC`, async (payload: {
    id: string;
    title: string
}, thunkAPI) => {
    try {
        await todolistsApi.changeTodolistTitle(payload)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const createTodolistTC = createAsyncThunk(`${todolistsSlice.name}/createTodolistTC`, async (payload: {
    title: string
}, thunkAPI) => {
    try {
        await todolistsApi.createTodolist(payload.title)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const deleteTodolistTC = createAsyncThunk(`${todolistsSlice.name}/deleteTodolistTC`, async (payload: {id: string}, thunkAPI ) => {
    try {
        await todolistsApi.deleteTodolist(payload.id)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {deleteTodolistAC, changeTodolistFilterAC} = todolistsSlice.actions

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
