import {addTodolistAC} from "./todolists-reducer";
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {TaskType} from '../Todolist';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const addTaskAC = createAction<{title: string, todolistId: string}>('tasks/addTask');
export const removeTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/removeTask');
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, newIsDone: boolean}>('tasks/changeTaskStatus');
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle');

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(addTaskAC, (state, action) => {
            state[action.payload.todolistId].push({title: action.payload.title, id: nanoid(), isDone: false})
        })
        .addCase(removeTaskAC, (state, action) => {
            const fEl = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            if( fEl !== -1) {
                state[action.payload.todolistId].splice(fEl, 1)
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const fEl = state[action.payload.todolistId].find(el => el.id === action.payload.taskId);
            if( fEl ) {
                fEl.isDone = action.payload.newIsDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const fEl = state[action.payload.todolistId].find(el => el.id === action.payload.taskId);
            if( fEl ) {
                fEl.title = action.payload.title
            }
        })
})
