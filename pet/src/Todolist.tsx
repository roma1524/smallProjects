import {FilterValuesType, TaskType, TodolistType} from './App';
import * as React from "react";
import {useState} from "react";

type PropsType = {
    todolist: TodolistType
    tdId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    removeAllTask: (todolistId: string) => void
}

export const Todolist = ({
                             todolist,
                             tdId,
                             tasks,
                             removeTask,
                             changeFilter,
                             removeAllTask,
                             addTask,
                         }: PropsType) => {

    let [title, setTitle] = useState('');

    const addTaskHandler = () => {
        addTask(tdId, title)
        setTitle('')
    }

    const onAllClickHandler = () => changeFilter(tdId, "all");
    const onActiveClickHandler = () => changeFilter(tdId, "active");
    const onCompletedClickHandler = () => changeFilter(tdId, "completed");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle((e.currentTarget.value).trim())
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(tdId, title)
        }
    }

    return (
        <div style={{display: 'flex', gap: '50px'}}>
            <div>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <h3>{todolist.title}</h3>
                    <button onClick={() => removeAllTask(tdId)}>X</button>
                </div>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyUp={onKeyPressHandler}
                    />
                    <button onClick={addTaskHandler}>+</button>
                </div>
                <ul>
                    {
                       tasks.length > 0 ? tasks.map((t, idx) => {
                            return (
                                <li key={idx}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={() => {
                                        removeTask(tdId, t.id)
                                    }}>x
                                    </button>
                                </li>
                            )
                        }) : <span>Нет Тасок</span>
                    }
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}