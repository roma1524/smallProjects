import {FilterValuesType, TaskType} from './App';
import * as React from "react";
import {useRef} from "react";

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    filter: FilterValuesType
    addTask: (taskId: string) => void
    removeAllTask: () => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             removeAllTask,
                             addTask,
                         }: PropsType) => {

    let currentTitle = useRef('');

    const addTaskHandler = () => {
        addTask(currentTitle.current)
        currentTitle.current = '';
    }



    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        currentTitle.current = (e.currentTarget.value).trim()
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(currentTitle.current)
        }
    }

    const removeAllTaskHandler = () => {
        removeAllTask()
    }

    return <div>
        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <h3>{title}</h3>
            <button onClick={removeAllTaskHandler}>X</button>
        </div>
        <div>
            <input value={currentTitle.current}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                tasks.length > 0 ? tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            removeTask(t.id)
                        }}>x
                        </button>
                    </li>)
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
}