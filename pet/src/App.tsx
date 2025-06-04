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

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (id: string, taskId: string) => {
        setTasks(prevState => ({
            ...prevState,
                [id]: prevState[id].filter(t => t.id !== taskId)
        }));
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const removeAllTask = (id: string) => {
        setTodolists(todolists.filter(td => td.id !== id))
        delete tasks[id]
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }



    return (
        <div className="App">
            {todolists.map(todo => {
                return (
                    <Todolist todolist={todo}
                              tasks={tasks[todo.id]}
                              filter={filter}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              removeAllTask={removeAllTask}
                    />
                )
            })}

        </div>
    );
}
