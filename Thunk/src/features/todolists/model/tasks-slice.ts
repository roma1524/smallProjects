import {createTodolistTC, deleteTodolistTC} from "./todolists-slice"
import {createAppSlice} from "@/common/utils";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskPriority, TaskStatus} from "@/common/enums";
import {nanoid} from "@reduxjs/toolkit";

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    selectors: {
        selectTasks: (state) => state,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
    reducers: (create) => ({
        deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
            const newTask: DomainTask = {title: action.payload.title,
                status: TaskStatus.New,
                id: nanoid(),
                todoListId: action.payload.todolistId,
                deadline: '',
                order: 1,
                priority: TaskPriority.Hi,
                description: '',
                startDate: '',
                addedDate: ''
            }
            state[action.payload.todolistId].unshift(newTask)
        }),
        changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
            const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New
            }
        }),
        changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),

        // --------------  Thunk  --------------

        fetchTasks: create.asyncThunk(async (todolisrId: string, {rejectWithValue}) => {
            try {
                const res = await tasksApi.getTasks(todolisrId)
                return {tasks: res.data.items, todolisrId};
            } catch (e) {
                return rejectWithValue(null)
            }
        }, {
            fulfilled: (state, action) => {
                state[action.payload.todolisrId] = action.payload.tasks
            }
        })
    }),
})

export const {selectTasks} = tasksSlice.selectors
export const {deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC, fetchTasks} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = Record<string, DomainTask[]>
