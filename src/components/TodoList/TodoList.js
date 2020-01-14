import React from "react";
import './TodoList.scss';
import TodoItem from "./TodoItem/TodoItem";

const TodoList = props => {
    return (
        <div className={'todos'}>
            <TodoItem
                value={props.todos}
            />
        </div>
    )
};

export default TodoList;