import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {
    changeTodolistFilteerAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC
} from './state/todolists-reducer';
import {useAppDispatch} from './common/hooks/useAppDispatch';
import {addTaskAC} from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const dispatch = useAppDispatch();

    const addTask = (title: string) => {
        dispatch(addTaskAC({title, todolistId: props.id}))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC({todolistId: props.id}))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({todolistId: props.id, title}))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilteerAC({todolistId: props.id, filer: 'all'}))
    const onActiveClickHandler = () => dispatch(changeTodolistFilteerAC({todolistId: props.id, filer: 'active'}))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilteerAC({todolistId: props.id, filer: 'completed'}))

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => console.log('removeTask')
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        console.log('changeTaskStatus')
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        console.log('changeTaskTitle')
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


