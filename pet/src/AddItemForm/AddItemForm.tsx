import {useState} from "react";
import * as React from "react";

type PropsType = {
    addItem: (title: string) => void;
}

export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState('');

    const addTaskHandler = () => {
        props.addItem(title)
        setTitle('')
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle((e.currentTarget.value).trim())
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
    );
};