import React from "react";

const TodoItem = props => {
        return props.value.map((item, index) => {
                return (
                    <li
                        key={index}
                        id={item.id}
                    >{item.text}</li>
                )
        })
};

export default TodoItem;