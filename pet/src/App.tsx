import './App.css';
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (id: number) => {
        setTasks(tasks => tasks.filter(t => t.id !== id))
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeAllTask = () => {
        setTasks([])
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      removeAllTask={removeAllTask}/>
        </div>
    );
}
