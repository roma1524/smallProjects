import {FilterValuesType, TaskType, TodolistType} from './App';
import * as React from "react";
import {useState} from "react";

type PropsType = {
    todolist: TodolistType
    tasks: Array<TaskType>
    removeTask: (id: string, taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    filter: FilterValuesType
    addTask: (taskId: string) => void
    removeAllTask: (id: string) => void
}

export const Todolist = ({
                             todolist,
                             tasks,
                             removeTask,
                             changeFilter,
                             removeAllTask,
                             addTask,
                         }: PropsType) => {

    let [title, setTitle] = useState('');

    const addTaskHandler = () => {
        addTask(title)
        setTitle('')
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle((e.currentTarget.value).trim())
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(title)
        }
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
        <div style={{display: 'flex', gap: '50px'}}>

            {tasks[todolist.id].map((td, i) => {
                return (
                    <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                            <h3>{td.title}</h3>
                            <button onClick={() => removeAllTask(td.id)}>X</button>
                        </div>
                        <div>
                            <input value={title}
                                   onChange={onChangeHandler}
                                   onKeyUp={onKeyPressHandler}
                            />
                            <button onClick={addTaskHandler}>+</button>
                        </div>
                        <ul key={i}>
                            {
                                tasks[td.id].length > 0 ?



                                    tasks[td.id].map(t => (
                                        <li key={t.id}>
                                            <input type="checkbox" checked={t.isDone}/>
                                            <span>{t.title}</span>
                                            <button onClick={() => {
                                                removeTask(td.id, t.id)
                                            }}>x
                                            </button>
                                        </li>
                                    ))
                                    :
                                    <span>Нет тасок</span>
                            }
                        </ul>
                        <div>
                            <button onClick={onAllClickHandler}>All</button>
                            <button onClick={onActiveClickHandler}>Active</button>
                            <button onClick={onCompletedClickHandler}>Completed</button>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}