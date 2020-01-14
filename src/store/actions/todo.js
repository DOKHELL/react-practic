import axios from 'axios'
import {ADD_TODO_TO_LIST, CHANGE_VALUE, INVALID_VALUE, RESET_ALL_TODOS, RESET_VALUE_TODO} from "./actionTypes";


export function addTodoItem(value, id) {
    return (dispatch, getState) => {
        const todos = getState().todo.todos;
        todos.push({text: value, id: id});
        dispatch(updateTodoState(todos))
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}

export function checkLocalStorage() {
    return dispatch => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            dispatch(updateTodoState(todos))
        }
    }
}

export function updateTodoState(todos) {
    return {
        type: ADD_TODO_TO_LIST,
        todos
    }
}
export  function resetValue() {
    return {
        type: RESET_VALUE_TODO
    }
}

export function resetTodos() {
    localStorage.removeItem('todos');
    return {
        type: RESET_ALL_TODOS
    }
}

export function changeValue(e) {
    const value = e.target.value;
        return {
            type: CHANGE_VALUE,
            value
        }
}
export function KeyHandler(e) {
    return dispatch => {
        const value = e.target.value;
        if (value.length >= 5) {
            if (e.keyCode === 13) {
                let id = Math.floor(Math.random() * 1000000000);
                dispatch(addTodoItem(value, id));
                dispatch(resetValue())
            }
        } else {
            dispatch(validateTodoInput())
        }
    }
}
export function validateTodoInput() {
    return {
        type: INVALID_VALUE
    }
}
export function sendEmail() {
    return async dispatch => {
        const data = {
            service_id: 'gmail',
            template_id: 'template_uRs3Jnhp',
            user_id: 'user_nMCfC0X4yGYWg3ylzlEzk',
            template_params: {
                'username': 'Sergey',
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
                'to_name': 'Юзер',
                'from_name': 'Серега',
                'message_html': 'worked',
                'to_email': 'cerge.gladkovv@gmail.com',
            },
        };
        try {
            const response = await axios.post(`https://api.emailjs.com/api/v1.0/email/send`, data);
            fetchTodoError(response)
        } catch (error) {
            dispatch(fetchTodoError(error)) //error
        }
    }
}
export function fetchTodoError(error) {
        console.log(error)
}