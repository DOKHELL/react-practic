import {ADD_TODO_TO_LIST, CHANGE_VALUE, RESET_ALL_TODOS, RESET_VALUE_TODO, UPDATE_TODO} from "../actions/actionTypes";

const initialState = {
    todos: [],
    value: '',
    helperIsVisible: false,
};


export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_TO_LIST:
            return {
                ...state, todos: action.todos
            };
        case CHANGE_VALUE:
            return {
                ...state, value: action.value
            };
        case RESET_VALUE_TODO:
            return {
                ...state, value: ''
            };
        case UPDATE_TODO:
            return {
                ...state, todos: action.todos
            };
        case RESET_ALL_TODOS:
            return {
                ...state, todos: []
            };
        default:
            return state
    }
}
