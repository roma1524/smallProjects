import {FilterValuesType, TaskType, TodolistType} from './App';
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm.tsx";

type PropsType = {
    todolist: TodolistType
    tdId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    removeAllTask: (todolistId: string) => void
    isChecked: (todolistId: string, taskId: string, checked: boolean) => void
}

export const Todolist = ({
                             todolist,
                             tdId,
                             tasks,
                             removeTask,
                             changeFilter,
                             removeAllTask,
                             addTask,
                             isChecked
                         }: PropsType) => {

    const addTaskHandler = (title: string) => {
        addTask(tdId, title)
    }

    const onAllClickHandler = () => changeFilter(tdId, "all");
    const onActiveClickHandler = () => changeFilter(tdId, "active");
    const onCompletedClickHandler = () => changeFilter(tdId, "completed");

const isCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // isChecked(tdId, tasksId, e.currentTarget.checked)
}

    return (
        <div style={{display: 'flex', gap: '50px'}}>
            <div>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <h3>{todolist.title}</h3>
                    <button onClick={() => removeAllTask(tdId)}>X</button>
                </div>
                <AddItemForm addItem={addTaskHandler}/>
                <ul>
                    {
                       tasks.length > 0 ? tasks.map((t, idx) => {
                            return (
                                <li key={idx}>
                                    <input type="checkbox" checked={t.isDone} onChange={isCheckedHandler} />
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