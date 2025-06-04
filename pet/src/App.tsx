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

export const App = () => {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (id: string) => {
        setTasks(tasks => tasks.filter(t => t.id !== id))
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeAllTask = () => {
        setTasks([])
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }


    let filteredTask = [];


    const getFilteredTasks = () => {
        let tasksForTodolist = tasks;

        if (filter === "all") {
            tasksForTodolist = tasks
        }
        if (filter === "active") {
            tasksForTodolist = tasks.filter(t => !!t.isDone)
        }
        if (filter === "completed") {
            tasksForTodolist = tasks.filter(t => !t.isDone)
        }
        return tasksForTodolist;
    }

    filteredTask = getFilteredTasks()

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTask}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      removeAllTask={removeAllTask}/>
        </div>
    );
}
