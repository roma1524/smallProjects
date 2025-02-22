import {addTodolistAC} from "./todolists-reducer";
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {TaskType} from '../Todolist';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const addTaskAC = createAction<{title: string, todolistId: string}>('tasks/addTask');

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(addTaskAC, (state, action) => {
            state[action.payload.todolistId].push({title: action.payload.title, id: nanoid(), isDone: false})
        })
})


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}




