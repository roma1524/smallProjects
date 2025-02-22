import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initialState: Array<TodolistType> =  []

export const addTodolistAC = createAction('todolists/addTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const removeTodolistAC = createAction<{todolistId: string}>('todolists/removeTodolist')
export const changeTodolistTitleAC = createAction<{todolistId: string, title: string}>('todolists/changeTodolistTitle')

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })
        .addCase(removeTodolistAC, (state, action) => {
            const findEl = state.findIndex(el => el.id === action.payload.todolistId)
            if (findEl !== -1) {
                state.splice(findEl, 1);
            }
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const findEl = state.find(el => el.id === action.payload.todolistId)
            if (findEl) {
                findEl.title = action.payload.title
            }
        })
})

