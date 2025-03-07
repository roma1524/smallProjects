import {asyncThunkCreator, createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit"
import {DomainTodolist} from "@/features/todolists/api/tasksApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        setTodolists: create.reducer<{todolists: Todolist[]}>((state, action) => {
            action.payload.todolists.forEach(t => state.push({...t, filter: 'all'}))
        }),
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        }),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        createTodolistAC: create.preparedReducer((title: string) => {
            return {payload: {id: nanoid(), title: title}}
        }, (state, action) => {
            state.push({ ...action.payload, filter: 'all', addedDate: '', order: 0 })
        })
    })
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, (_args, thunkAPI) => {
    todolistsApi.getTodolists().then(res => {
        thunkAPI.dispatch(setTodolists({todolists: res.data}))
    })
})

export const todolistsReducer = todolistsSlice.reducer
export const {deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, setTodolists} = todolistsSlice.actions

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
