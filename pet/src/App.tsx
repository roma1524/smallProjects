import './App.css';
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks(prevState => ({
            ...prevState,
            [todolistId]: prevState[todolistId].filter(t => t.id !== taskId)
        }));
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const currentTd = todolists.map(t => t.id === todolistId ? {...t, filter: value} : t)
        setTodolists(currentTd)
    }
    const removeAllTask = (todolistId: string) => {
        setTodolists(todolists.filter(td => td.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeStatus = (todolistId: string, taskId: string, ischeked: boolean) => {
        setTasks(prevState => ({
            ...prevState,
            [todolistId]: prevState[todolistId].map(t => t.id === taskId ? {...t, isDone: ischeked}: t)})
        )
    }

    return (
        <div className="App">
            {todolists.map(todo => {

                let tasksForTodolist = tasks[todo.id];

                if (todo.filter === "all") {
                    tasksForTodolist = tasks[todo.id]
                }
                if (todo.filter === "active") {
                    tasksForTodolist = tasks[todo.id].filter(t => !!t.isDone)
                }
                if (todo.filter === "completed") {
                    tasksForTodolist = tasks[todo.id].filter(t => !t.isDone)
                }

                return (
                    <Todolist todolist={todo}
                              tdId={todo.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              removeAllTask={removeAllTask}
                              changeStatus={changeStatus}
                    />
                )
            })}

        </div>
    );
}
